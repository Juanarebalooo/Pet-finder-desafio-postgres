export function initTitle() {
  customElements.define(
    "title-el",
    class TitleComponent extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const textoTitle = this.getAttribute("text-title");
        const colorTitle = this.getAttribute("color-title");
        this.shadow.innerHTML = `
        
        <h1 class="title">${textoTitle}</h1>
       
        `;
        const titleEl = this.shadow.querySelector(".title") as HTMLElement;
        const style = document.createElement("style");

        style.textContent = `
        
        .title{
        font-size:36px;
        font-family:"Poppins";
        text-align:center;
        }
        `;
        this.shadow.appendChild(style);

        if (colorTitle === "white") {
          titleEl.style.color = "white";
        }
      }
    },
  );
}
