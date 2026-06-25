import { goTo, handleRoute } from "../../router";
import { openModal } from "../modal/modal";
export function initCard() {
  customElements.define(
    "card-el",
    class CardComponent extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const typeCard = this.getAttribute("type-card");
        const imagenUrl = this.getAttribute("img-url");
        const petName = this.getAttribute("pet-name");
        const locacion = this.getAttribute("location");
        const petId = this.getAttribute("pet-id");
        this.shadow.innerHTML = `
        <div class="container">
        <img class="imagen" src="${imagenUrl}" alt="imagen de la mascota perdida">
        <div class="subcontainer">
        <div class="subcontainer__data">
        <h1 class="subcontainer__data__name">${petName}</h1>
        <h3 class="subcontainer__data__location">${locacion}</h3>
        </div>
        <div class="subcontainer__button">
        <button class="button"></button>
        </div>
        </div>
        </div>
        `;
        const style = document.createElement("style");
        style.textContent = `
        .container{
        display:flex;
        flex-direction:column;
        width:335px;
        height:234px;
        background-color:#26302E;
        border-radius:10px;
        margin:0 auto;
        }
        .imagen{
        width:320px;
        height:136px;
        border-radius:3px;
        align-self:center;
        margin: 8px 8px 0px 8px;
        }
        .subcontainer{
        display:flex;
        padding:8px;
        justify-content: space-between;
        }
        .subcontainer__data__name, .subcontainer__data__location{
        margin:0;
        font-family:"Poppins";
        color:white;
        }
        .subcontainer__data__name{
        font-size:36px;
        }
        .subcontainer__data__location{
        font-size:16px;
        }
        .subcontainer__button{
        display:flex;
        flex-direction:column;
        justify-content:center;
        }
        .button{
        width:100px;
        height:40px;
        font-family:"Roboto";
        font-size:16px;
        color:white;
        border:none;
        border-radius:4px;
        }
        `;
        const buttonEl = this.shadow.querySelector(".button") as HTMLElement;
        if (typeCard === "edit") {
          buttonEl.style.backgroundColor = "#5A8FEC";
          buttonEl.textContent = "Editar";
          buttonEl.addEventListener("click", () => {
            goTo(`/edit-my-report/${petId}`);
            handleRoute(location.pathname);
          });
        } else if (typeCard === "report") {
          buttonEl.style.backgroundColor = "#EB6372";
          buttonEl.textContent = "Reportar";
          buttonEl.addEventListener("click", () => {
            openModal(Number(petId), petName);
          });
        }
        this.shadow.appendChild(style);
      }
    },
  );
}
