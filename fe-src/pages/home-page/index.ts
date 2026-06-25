import { goTo, handleRoute } from "../../router";

export function homePage() {
  const homeImg = new URL("../../img/home-img.png", import.meta.url).href;
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <img class="img" src="${homeImg}" alt="img">
    <title-el text-title="Pet Finder App"></title-el>
    <subtitle-el text-sub="Encontrá y reportá mascotas perdidas cerca de tu ubicación." bold-sub="false"></subtitle-el>
    <div class="buttons__cont">
    <button-el class="ubicacion"text-button="Dar mi ubicación actual" color-button="blue"></button-el>
    <button-el class="info"text-button="¿Cómo funciona Pet Finder?" color-button="green"></button-el>
    </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
    .img{
    display:block;
    margin: 0 auto;
    margin-top: 20px;
    }

    .buttons__cont{
    display:flex;
    flex-direction:column;
    gap:20px;
    justify-content:center;
    }

    @media(min-width:768px){
    
    .buttons__cont{
    flex-direction:row;
    }
    }
    `;
    const infoButtonEl = rootEl.querySelector(".info") as HTMLHtmlElement;
    const ubicacionButtonEl = rootEl.querySelector(".ubicacion") as HTMLElement;
    infoButtonEl.addEventListener("click", () => {
      goTo("/info");
      handleRoute(location.pathname);
    });
    ubicacionButtonEl.addEventListener("click", () => {
      goTo("/location");
      handleRoute(location.pathname);
    });
    rootEl.appendChild(style);
  }
}
