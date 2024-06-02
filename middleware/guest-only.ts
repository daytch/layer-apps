export default defineNuxtRouteMiddleware(async () => {
  const { accessToken } = useAuthCookie();

  if (accessToken.value) {
    if (process.server) return navigateTo({ name: "index" });

    return abortNavigation();
  }
});
