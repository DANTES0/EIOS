/* global dispatch */
import { createStore } from 'vuex';
import config from '../config.js';

const store = createStore({
    state: {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        currentUser: null,
    },
    mutations: {
        setTokens(state, { accessToken, refreshToken }) {
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        clearTokens(state) {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        clearCurrentUser(state) {
            state.currentUser = null;
        },
    },
    actions: {
        login({ commit, dispatch }, { accessToken, refreshToken }) {
            commit('setTokens', { accessToken, refreshToken });
            dispatch('fetchCurrentUser');
        },
        logout({ commit }) {
            commit('clearTokens');
            commit('clearCurrentUser');
        },
        async fetchCurrentUser({ commit, getters }) {
            try {
                const res = await fetch(`${config.ServerURL}/api/v1/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${getters.accessToken}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch user');
                }

                const data = await res.json();

                commit('setCurrentUser', data);
            } catch (e) {
                console.error('Ошибка получения пользователя:', e);
                commit('setCurrentUser', null);
            }
        },
        restoreUserFromLocalStorage({ commit, dispatch }) {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (accessToken && refreshToken) {
                commit('setTokens', { accessToken, refreshToken });
                dispatch('fetchCurrentUser');
            } else {
                commit('clearTokens');
            }
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.accessToken,
        accessToken: (state) => state.accessToken,
        refreshToken: (state) => state.refreshToken,
        currentUser: (state) => state.currentUser,

        // Массив имён ролей
        userRoles: (state) => state.currentUser?.role?.map((r) => r.name) || [],

        // Проверка наличия конкретной роли
        hasRole: (state, getters) => (role) => getters.userRoles.includes(role),

        // Проверка хотя бы одной из списка ролей
        hasAnyRole: (state, getters) => (roles) =>
            roles.some((role) => getters.userRoles.includes(role)),
    },
});

export default store;