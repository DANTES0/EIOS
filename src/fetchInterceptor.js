import { useFetch } from '@vueuse/core';
import store from './store';
import config from './config';

async function refreshAccessToken() {
    const refreshToken = store.getters.refreshToken;

    if (!refreshToken) {
        // store.dispatch('logout');
        // throw new Error('No refresh token available');
    }

    //console.log('А сюда', refreshToken);

    const response = await fetch(`${config.ServerURL}/api/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    // console.log("Перед диспатчем", data )

    store.dispatch('login', {
        accessToken: data.accessToken,
        refreshToken: refreshToken,
    });

    return data.accessToken;
}

function useAuthenticatedFetch(url) {
    const {
        isFetching,
        error,
        data,
        statusCode,
        get,
        post,
        put,
        delete: del,
    } = useFetch(url, {
        async beforeFetch({ options }) {
            let accessToken = store.getters.accessToken;

            if (!accessToken) {
                // console.log("1323124124124")
                accessToken = await refreshAccessToken();
            }

            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            };

            return { options };
        },
        async onFetchError(ctx) {
            // console.log('On fetch error')
            const { response } = ctx;

            if (response && response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                // console.log('NEWACCCESTOKEN', newAccessToken, ctx)

                ctx.options.headers.Authorization = `Bearer ${newAccessToken}`;
                // console.log('CTX', ctx)

                return await useFetch(ctx.url, ctx.options).then((newCtx) => {
                    // console.log('CTX', ctx)
                    ctx.response = newCtx.response;
                    ctx.data = newCtx.data;
                    ctx.error = newCtx.error;
                    ctx.statusCode = newCtx.statusCode;

                    return ctx;
                });
            }

            return ctx;
        },
    });

    return { isFetching, error, data, statusCode, get, post, put, del };
}

export default useAuthenticatedFetch;
