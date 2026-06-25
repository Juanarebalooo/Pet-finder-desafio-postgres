export function initText() {
  customElements.define(
    "text-el",
    class TextComponent extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      static get observedAttributes() {
        return ["text", "bold", "color"];
      }
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
          this.render(); // 👈 se vuelve a renderizar cuando cambia el atributo
        }
      }
      render() {
        const text = this.getAttribute("text");
        const bold = this.getAttribute("bold");
        const color = this.getAttribute("color");
        this.shadow.innerHTML = `
        <p class="text">${text}</p>
        `;
        const textEl = this.shadow.querySelector(".text") as HTMLElement;
        const style = document.createElement("style");
        style.textContent = `
        .text{
        font-family:"Poppins";
        font-size:16px;
        text-align:center;
        }
        `;
        if (bold === "true") {
          textEl.style.fontWeight = "700";
        } else if (bold === "false") {
          textEl.style.fontWeight = "400";
        }
        if (color === "white") {
          textEl.style.color = "white";
        }
        this.shadow.appendChild(style);
      }
    },
  );
}
