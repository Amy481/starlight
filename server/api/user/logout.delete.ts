export default defineEventHandler((event) => {
  deleteCookie(event, "access_token", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: true,
  });

  return {
    success: true,
    code: 200,
  };
});
