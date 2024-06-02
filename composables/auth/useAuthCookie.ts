export const useAuthCookie = () => {
  const config = useRuntimeConfig();

  const accessToken = useCookie<string | null>(
    config.public.cookieName as string,
    {
      default: () => null,
      maxAge: Number(config.public.cookieExpires),
    }
  );

  const setToken = (token: string | null) => {
    accessToken.value = token;
  };

  return {
    accessToken,
    setToken,
  };
};
