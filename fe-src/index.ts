import { initButton } from "./components/button-component";
import { initTitle } from "./components/title-component";
import { initSubtitle } from "./components/subtitle-component";
import { initText } from "./components/text-component";
import { initCard } from "./components/card-component";
import { initHeader } from "./components/header-component";
import { handleRoute } from "./router";
import { state } from "./state";

function main() {
  initButton();
  initTitle();
  initSubtitle();
  initText();
  initCard();
  initHeader();
  if (location.pathname === "/") {
    history.replaceState({}, "", "/home");
  }
  handleRoute(location.pathname);
  window.addEventListener("popstate", () => {
    handleRoute(location.pathname);
  });

  // state.register({ email: "francisco@gmail.com", password: "contraseña" });
  // state.login({ email: "francisco@gmail.com", password: "contraseña" });
  state.getUser();
  // state.setName("Messi");
}

main();
