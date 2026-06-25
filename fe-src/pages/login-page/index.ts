import { goTo, handleRoute } from "../../router";

export function loginPage() {
  const rootEl = document.querySelector(".root");
  const loginImg = new URL("../../img/login-img.svg", import.meta.url).href;
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <img class="img" src="${loginImg}" alt="img">
    <div class="container">
    <title-el text-title="Ingresar"></title-el>
    <text-el text="Ingresá tu email para continuar."></text-el>
    <div class="subcontainer">
    <div class="subcontainer__email">
    <text-el  text="EMAIL" ></text-el>
    <input class="input" name="email" type="email" />
    </div>
    <button-el class="button"text-button="Siguiente" color-button="blue"></button-el>
    </div>
    <div class="text__cont">
    <p class="text">Aún no tenes cuenta?</p>
    <a class="link"href="/register">Registrate</a>
    </div>
    </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
    .img{
    display:block;
    margin:0 auto;
    margin-top:20px;
    }
    
    .input{
    width:335px;
    height:50px;
    font-family:"Poppins";
    font-size:25px;
    margin:0 auto;
    }
    .subcontainer{
    display:flex;
    flex-direction:column;
    gap:25px;
    }
    .subcontainer__email{
    display:flex;
    flex-direction:column;
    }
    .text, .link{
    font-family:"Poppins";
    display:inline;
    text-align: center;
    }
    .text__cont{
    display:flex;
    justify-content:center;
    margin-top: 18px;
    }
    
    `;
    rootEl.appendChild(style);
    const emailInputEl = rootEl.querySelector(
      'input[name="email"]',
    ) as HTMLInputElement;
    const buttonEl = rootEl.querySelector(".button") as HTMLElement;
    buttonEl.addEventListener("click", () => {
      if (!emailInputEl.value.includes("@")) {
        alert("Ingresá un email válido.");
        return;
      } else {
        goTo("/full-login");
        handleRoute(location.pathname);
      }
    });
  }
}
