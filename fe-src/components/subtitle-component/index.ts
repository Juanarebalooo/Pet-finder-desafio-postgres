export function initSubtitle() {
  customElements.define(
    "subtitle-el",
    class SubtitleComponent extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      render() {
        const textoSubtitle = this.getAttribute("text-sub");
        const boldSubtitle = this.getAttribute("bold-sub");
        this.shadow.innerHTML = `
        <h2 class="subtitle">${textoSubtitle}</h2>
        `;
        const subtitleEl = this.shadow.querySelector(
          ".subtitle",
        ) as HTMLElement;
        const style = document.createElement("style");
        style.textContent = `
        .subtitle{
        font-family:"Poppins";
        font-size:24px;
        text-align:center;
        }
        `;
        if (boldSubtitle === "true") {
          subtitleEl.style.fontWeight = "700";
        } else if (boldSubtitle === "false") {
          subtitleEl.style.fontWeight = "400";
        }
        this.shadow.appendChild(style);
      }
    },
  );
}
