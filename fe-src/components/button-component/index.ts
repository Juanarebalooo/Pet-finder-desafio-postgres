export function initButton() {
  customElements.define(
    "button-el",
    class ButtonComponent extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const textoButton = this.getAttribute("text-button");
        const colorButton = this.getAttribute("color-button");
        this.shadow.innerHTML = `
        <div class="container">
        <button class="button">${textoButton}</button>
        </div>
        `;
        const buttonEl = this.shadow.querySelector(".button") as HTMLElement;
        const style = document.createElement("style");
        style.textContent = `
        .container{
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        }
        .button{
        width:335px;
        height:50px;
        font-family:"Roboto";
        font-size:16px;
        border-radius:4px;
        border:none;
        color:white;
        font-weight:700;
        cursor:pointer;
        }
        `;
        if (colorButton === "blue") {
          buttonEl.style.backgroundColor = "#5A8FEC";
        } else if (colorButton === "green") {
          buttonEl.style.backgroundColor = "#00A884";
        } else if (colorButton === "red") {
          buttonEl.style.backgroundColor = "#EB6372";
        } else if (colorButton === "black") {
          buttonEl.style.backgroundColor = "#4A5553";
        }
        this.shadow.appendChild(style);
      }
    },
  );
}
