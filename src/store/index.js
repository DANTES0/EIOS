import { createStore } from 'vuex';

const store = createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
  },
  mutations: {
    setTokens(state, { accessToken, refreshToken }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      // Сохраняем токены в локальном хранилище
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
      // Очищаем токены из локального хранилища
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  actions: {
    login({ commit }, { accessToken, refreshToken }) {
      commit('setTokens', { accessToken, refreshToken });
    },
    logout({ commit }) {
      commit('clearTokens');
    }
  },
  getters: {
    isLoggedIn: state => !!state.accessToken,
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken
  }
});

export default store;