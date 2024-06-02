export default defineNuxtPlugin({
  setup() {
    const { accessToken } = useAuthCookie();
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiUrl as string,
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ options }) {
        if (accessToken.value?.length) {
          options.headers = {
            Authorization: "Bearer " + accessToken.value,
          };
        }
      },
      onResponse: () => {},
      onRequestError: () => {},
      onResponseError: () => {},
    });

    return {
      provide: { api },
    };
  },
});
