export default defineNuxtPlugin({
  setup() {
    const { accessToken } = useAuthCookie();
    const { logout } = useAuth();
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
      onRequestError: (error) => {},
      onResponseError: (error) => {
        if (
          error?.response?.status === 401 &&
          !error?.response?.url?.includes("/login")
        ) {
          logout();
        }
      },
    });

    return {
      provide: { api },
    };
  },
});
