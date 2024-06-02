export default defineNuxtPlugin(async () => {
  const { me } = useAuth();
  const { accessToken } = useAuthCookie();

  if (!accessToken.value) return;
  await me();
});
