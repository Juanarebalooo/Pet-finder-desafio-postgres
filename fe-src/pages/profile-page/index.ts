import { state } from "../../state";
import { goTo, handleRoute } from "../../router";
export function profilePage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <div class="container">
    <title-el text-title="Mis datos"></title-el>
    <div class="button-cont">
    <button-el class="button-data" text-button="Modificar datos personales" color-button="blue"></button-el>
    <button-el  class="button-password"text-button="Modificar contraseña" color-button="blue"></button-el>
    </div>
    <div class="account-cont">
    <text-el class="email__text" text="" bold="false" ></text-el>
    <a class="cerrar__sesion"></a>
    </div>
    </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
    @media(min-width:768px){
    .container{
    margin-top:125px;
    }
    }
    .button-cont{
    margin-top:125px;
    display:flex;
    flex-direction:column;
    gap:25px;
    }
    @media(min-width:768px){
    .button-cont{
    flex-direction:row;
    justify-content:center;
    }
    }
    .account-cont{
    margin-top:100px;
    }
    @media(min-width:768px){
    .account-cont{
    margin-top:175px;
    }
    }
    .cerrar__sesion{
    display:block;
    text-align:center;
    font-family:"Roboto";
    color:#3B97D3;
    }
    `;
    rootEl.appendChild(style);
    const emailTextEl = rootEl.querySelector(".email__text") as HTMLElement;
    const cerrarSesionEl = rootEl.querySelector(
      ".cerrar__sesion",
    ) as HTMLElement;
    function renderUserInfoInProfile() {
      const currenState = state.getState();
      const email = currenState.user.email;
      if (email) {
        emailTextEl.setAttribute("text", email.toUpperCase());
        cerrarSesionEl.textContent = "CERRAR SESIÓN";
      }
    }
    renderUserInfoInProfile();
    state.subscribe(renderUserInfoInProfile);
    cerrarSesionEl.addEventListener("click", () => {
      state.disconnect(() => {
        alert("Te desconectaste.");
        goTo("/home");
        handleRoute(location.pathname);
      });
    });
    const buttonDataEl = rootEl.querySelector(".button-data") as HTMLElement;
    const buttonPasswordEl = rootEl.querySelector(
      ".button-password",
    ) as HTMLElement;
    buttonDataEl.addEventListener("click", () => {
      goTo("/data");
      handleRoute(location.pathname);
    });
    buttonPasswordEl.addEventListener("click", () => {
      goTo("/password");
      handleRoute(location.pathname);
    });
  }
}
