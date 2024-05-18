import { useFetch } from '@vueuse/core';
import store from './store';

function useAuthenticatedFetch(url) {
  const { isFetching, error, data, get, post, put, delete: del } = useFetch(url, {
    beforeFetch({ options }) {
      const accessToken = store.getters.accessToken;
      if (accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`
        };
      }
      console.log('Request options:', options);
      
      return { options };
    }
  });

  return { isFetching, error, data, get, post, put, del };
}

export default useAuthenticatedFetch;