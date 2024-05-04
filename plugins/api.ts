export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiUrl as string,
      headers: {},
      onRequest: () => {},
      onResponse: () => {},
      onRequestError: () => {},
      onResponseError: () => {},
    });

    return {
      provide: { api },
    };
  },
});
