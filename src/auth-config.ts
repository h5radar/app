import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const userManager = new UserManager({
  authority: import.meta.env.VITE_AUTHORITY || "http://localhost:8180/realms/h5radar",
  client_id: import.meta.env.VITE_CLIENT_ID || "web",

  redirect_uri: `${window.location.origin}`,
  post_logout_redirect_uri: `${window.location.origin}/welcome`,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true, // this allows cross tab login/logout detection
});

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};
