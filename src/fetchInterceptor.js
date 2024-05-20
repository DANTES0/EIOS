// import { useFetch } from '@vueuse/core';
// import store from './store';

// function useAuthenticatedFetch(url) {
//   const { isFetching, error, data, statusCode, get, post, put, delete: del } = useFetch(url, {
//     beforeFetch({ options }) {
//       const accessToken = store.getters.accessToken;
//       if (accessToken) {
//         options.headers = {
//           ...options.headers,
//           Authorization: `Bearer ${accessToken}`
//         };
//       }
//       console.log('Request options:', options);
//       console.log('Request options:', statusCode);
      
//       return { options };
//     },
//     onFetchError(ctx) {
//       const { response } = ctx;
//       if (response && response.status === 403) {
//         console.error('Access Forbidden:', response);
//         // Можно добавить логику обработки ошибки 403
//       }
//       return ctx;
//     }
//   });

//   return { isFetching, error, data, get, post, put, del };
// }

// export default useAuthenticatedFetch;

import { useFetch } from '@vueuse/core';
import store from './store';

async function refreshAccessToken() {
  const refreshToken = store.getters.refreshToken;
  if (!refreshToken) {
    // store.dispatch('logout');
    // throw new Error('No refresh token available');
  }

  try {
    console.log("А сюда", refreshToken)
    const response = await fetch('http://25.61.98.183:8080/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    const data = await response.json();
    // console.log("Перед диспатчем", data )
    store.dispatch('login', {
      accessToken: data.accessToken,
      refreshToken: refreshToken
    });
    // console.log("После диспатча", store.getters.accessToken,"РЕфреш" ,store.getters.refreshToken )
    return data.accessToken;
  } catch (error) {
    // console.log("YE TYESUYTOUSWERGTUKWESGFKWJEG")
    // store.dispatch('logout');
    throw error;
  }
}

function useAuthenticatedFetch(url) {
  const { isFetching, error, data, statusCode, get, post, put, delete: del } = useFetch(url, {
    async beforeFetch({ options }) {
      let accessToken = store.getters.accessToken;
      if (!accessToken) {
        try {
          // console.log("1323124124124")
          accessToken = await refreshAccessToken();
        } catch (error) {
          // Обработка ошибок обновления токена
          throw error;
        }
      }
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      };
      return { options };
    },
    async onFetchError(ctx) {
      // console.log('On fetch error')
      const { response } = ctx;
      if (response && response.status === 401) {
        try {
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
        } catch (error) {
          // console.log('WSETRWETWET')
          // store.dispatch('logout');
        }
      }
      return ctx;
    }
  });

  return { isFetching, error, data, statusCode, get, post, put, del };
}

export default useAuthenticatedFetch;