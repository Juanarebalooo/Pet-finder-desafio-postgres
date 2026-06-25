import { goTo, handleRoute } from "../../router";
import { state } from "../../state";
export function initHeader() {
  customElements.define(
    "header-el",
    class HeaderComponent extends HTMLElement {
      logo = new URL("../../img/pet-finder-logo.png", import.meta.url).href;
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        this.shadow.innerHTML = `
        <header class="header">
        <img class="logo" src="${this.logo}" alt="logo"">
        <label class="button" for="burger_menu">
        <div class="button__div_1"></div>
        <div class="button__div_2"></div>
        <div class="button__div_3"></div>
        </label>
        <input class="checkbox" type="checkbox" id="burger_menu">       
        <ul class="ul__links__header">
        <li class="link__header__my__data">Mis datos</li>
        <li class="link__header__my__pet__report">Mis mascotas reportadas</li>
        <li class="link__header__report">Reportar mascotas</li>
        </ul>       
        </header>
        <ul class="ul__links">
        <li class="link__my__data">Mis datos</li>
        <li class="link__my__pet__report">Mis mascotas reportadas</li>
        <li class="link__report">Reportar mascotas</li>
        <div class="account__cont">
        <text-el class="email-text" text="" bold="false" color="white"></text-el>
        <a class="cerrar-sesion"></a>
        </div>
        </ul>
        `;
        const style = document.createElement("style");
        style.textContent = `
        .header{
        width:100%;
        height:60px;
        background-color: #26302E;
        box-sizing:border-box;
        padding-left: 19px;
        padding-top: 10px;
        padding-right: 14px;
        display:flex;
        justify-content: space-between;
        }
        .logo{
        width:40px;
        height:40px;
        cursor:pointer;
        }
        .button{
        display:flex;
        flex-direction:column;
        width:3rem;
        height:3rem;
        border:0;
        background:transparent;
        gap: .65rem;
        margin-top:3px;
        cursor:pointer;
        }
        @media(min-width:768px){
        .button{
        display:none;
        }
        }
        .button__div_1, .button__div_2, .button__div_3{
        background:white;
        height:2px;
        width:100%;
        border-radius:5px;
        transition: all .5s;
        transform-origin:left;
        }
        .checkbox{
        display:none;
        }
        .ul__links{
        text-decoration:none;
        list-style:none;
        background-color:#26302E;
        position:absolute;
        width:100%;
        height: calc(100vh - 60px);
        top: 60px;
        margin:0;
        flex-direction:column;
        box-sizing: border-box;
        align-items: center;
        padding: 0;
        padding-top: 110px;
        gap: 80px;
        display:flex;
        opacity:0;
        transform: translateY(-20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
        pointer-events: none;
        }
        @media(min-width:768px){
        .ul__links{
        display:none;
        }
        }
        .link__my__data, .link__my__pet__report, .link__report{
        font-family:"Poppins";
        font-size:24px;
        font-weight: 700;
        color:white;
        text-align: center;
        cursor:pointer;
        }
        .ul__links__header{
        display:none;
        text-decoration:none;
        list-style:none;
        gap:20px;
        margin-top: 10px;
        }
        @media(min-width:768px){
        .ul__links__header{
        display:flex;
        }
        }
        .link__header__my__data, .link__header__my__pet__report, .link__header__report{
        font-family:"Poppins";
        font-size:16px;
        font-weight: 700;
        color:white;
        cursor:pointer;
        }
        .cerrar-sesion{
        display:block;
        text-align:center;
        font-family:"Roboto";
        color:#3B97D3;
        }
        `;
        const checkboxEl = this.shadow.querySelector(
          ".checkbox",
        ) as HTMLInputElement;
        const firstStick = this.shadow.querySelector(
          ".button__div_1",
        ) as HTMLElement;
        const secondStick = this.shadow.querySelector(
          ".button__div_2",
        ) as HTMLElement;
        const thirdStick = this.shadow.querySelector(
          ".button__div_3",
        ) as HTMLElement;
        const linkDatosHeader = this.shadow.querySelector(
          ".link__header__my__data",
        ) as HTMLElement;
        const linkDatosMenu = this.shadow.querySelector(
          ".link__my__data",
        ) as HTMLElement;
        const linkPetReportHeader = this.shadow.querySelector(
          ".link__header__my__pet__report",
        ) as HTMLElement;
        const linkPetReportMenu = this.shadow.querySelector(
          ".link__my__pet__report",
        ) as HTMLElement;
        const linkReportHeader = this.shadow.querySelector(
          ".link__header__report",
        ) as HTMLElement;
        const linkReportMenu = this.shadow.querySelector(
          ".link__report",
        ) as HTMLElement;
        const logoEl = this.shadow.querySelector(".logo") as HTMLElement;
        logoEl.addEventListener("click", () => {
          document.body.style.overflow = "";
          goTo("/home");
          handleRoute(location.pathname);
        });
        linkDatosHeader.addEventListener("click", () => {
          state.checkLogin(() => {
            goTo("/profile");
            handleRoute(location.pathname);
          });
        });
        linkDatosMenu.addEventListener("click", () => {
          state.checkLogin(() => {
            document.body.style.overflow = "";
            goTo("/profile");
            handleRoute(location.pathname);
          });
        });
        linkPetReportHeader.addEventListener("click", () => {
          state.checkLogin(() => {
            goTo("/my-reports");
            handleRoute(location.pathname);
          });
        });
        linkPetReportMenu.addEventListener("click", () => {
          state.checkLogin(() => {
            document.body.style.overflow = "";
            goTo("/my-reports");
            handleRoute(location.pathname);
          });
        });
        linkReportHeader.addEventListener("click", () => {
          state.checkLogin(() => {
            goTo("/reports");
            handleRoute(location.pathname);
          });
        });
        linkReportMenu.addEventListener("click", () => {
          state.checkLogin(() => {
            document.body.style.overflow = "";
            goTo("/reports");
            handleRoute(location.pathname);
          });
        });
        const listEl = this.shadow.querySelector(".ul__links") as HTMLElement;
        checkboxEl.addEventListener("change", (e) => {
          const target = e.target as HTMLInputElement;
          const mapEl = document.querySelector(".map") as HTMLElement;
          if (target && target.checked) {
            firstStick.style.transform = "rotate(33.5deg)";
            secondStick.style.opacity = "0";
            thirdStick.style.transform = "rotate(-33.5deg)";
            listEl.style.opacity = "1";
            listEl.style.transform = "translateY(0)";
            listEl.style.pointerEvents = "auto";
            document.body.style.overflow = "hidden";
            if (mapEl) mapEl.style.zIndex = "-1";
          } else {
            firstStick.style.transform = "rotate(0deg)";
            secondStick.style.opacity = "1";
            thirdStick.style.transform = "rotate(0deg)";
            listEl.style.opacity = "0";
            listEl.style.transform = "translateY(-20px)";
            listEl.style.pointerEvents = "none";
            document.body.style.overflow = "";
            if (mapEl) mapEl.style.zIndex = "0";
          }
        });
        window.addEventListener("resize", () => {
          if (window.innerWidth > 768) {
            checkboxEl.checked = false;
            firstStick.style.transform = "rotate(0deg)";
            secondStick.style.opacity = "1";
            thirdStick.style.transform = "rotate(0deg)";
            listEl.style.opacity = "0";
            listEl.style.transform = "translateY(-20px)";
            listEl.style.pointerEvents = "none";
            document.body.style.overflow = "";
          }
        });
        const emailTextEl = this.shadow.querySelector(
          ".email-text",
        ) as HTMLElement;
        const cerrarSesionEl = this.shadow.querySelector(
          ".cerrar-sesion",
        ) as HTMLElement;
        this.shadow.appendChild(style);

        function renderUserInfo() {
          const currenState = state.getState();
          const email = currenState.user.email;
          if (email) {
            emailTextEl.setAttribute("text", email.toUpperCase());
            cerrarSesionEl.textContent = "CERRAR SESIÓN";
          }
        }
        renderUserInfo();
        state.subscribe(renderUserInfo);
        cerrarSesionEl.addEventListener("click", () => {
          state.disconnect(() => {
            alert("Te desconectaste.");
            goTo("/home");
            handleRoute(location.pathname);
            cerrarSesionEl.textContent = "";
          });
        });
      }
    },
  );
}
