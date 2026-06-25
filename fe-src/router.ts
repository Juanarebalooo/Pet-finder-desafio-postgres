import { homePage } from "./pages/home-page";
import { infoPage } from "./pages/info-page";
import { locationPage } from "./pages/location-page";
import { reportsPage } from "./pages/reports-page";
import { loginPage } from "./pages/login-page";
import { registerPage } from "./pages/register-page";
import { fullLoginPage } from "./pages/full-login-page";
import { profilePage } from "./pages/profile-page";
import { profileDataPage } from "./pages/profile-data-page";
import { profilePasswordPage } from "./pages/profile-password-page";
import { makeReportsPage } from "./pages/make-reports-page";
import { myReportsPage } from "./pages/my-reports-page";
import { editMyReportsPage } from "./pages/edit-my-reports-page";
import { forgotPasswordPage } from "./pages/forgot-password-page";
import { resetPasswordPage } from "./pages/reset-password-page";
export function goTo(path: string) {
  history.pushState({}, "", path);
}
const routes = [
  {
    path: new RegExp(`^/home`),
    content: homePage,
  },
  {
    path: new RegExp(`^/info`),
    content: infoPage,
  },
  {
    path: new RegExp(`^/location`),
    content: locationPage,
  },
  {
    path: new RegExp(`^/reports`),
    content: reportsPage,
  },
  {
    path: new RegExp(`^/login`),
    content: loginPage,
  },
  {
    path: new RegExp(`^/register`),
    content: registerPage,
  },
  {
    path: new RegExp(`^/full-login`),
    content: fullLoginPage,
  },
  {
    path: new RegExp(`^/profile`),
    content: profilePage,
  },
  {
    path: new RegExp(`^/data`),
    content: profileDataPage,
  },
  {
    path: new RegExp(`^/password`),
    content: profilePasswordPage,
  },
  {
    path: new RegExp(`^/make-reports`),
    content: makeReportsPage,
  },
  {
    path: new RegExp(`^/my-reports`),
    content: myReportsPage,
  },
  {
    path: new RegExp(`^/edit-my-report`),
    content: editMyReportsPage,
  },
  {
    path: new RegExp(`^/forgot-my-password`),
    content: forgotPasswordPage,
  },
  {
    path: new RegExp(`^/reset-password`),
    content: resetPasswordPage,
  },
];

export function handleRoute(route: string) {
  const rootEl = document.querySelector(".root");
  if (rootEl) rootEl.innerHTML = "";
  for (const r of routes) {
    if (r.path.test(route)) {
      r.content();
      break;
    }
  }
}
