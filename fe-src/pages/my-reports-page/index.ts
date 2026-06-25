import { goTo, handleRoute } from "../../router";
import { state } from "../../state";
export function myReportsPage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    function renderPage() {
      const currentState = state.getState();
      const imagen = new URL(
        "../../img/reports-pets-image.png",
        import.meta.url,
      ).href;
      if (!currentState.user.pets) return;
      if (currentState.user.pets.length === 0) {
        rootEl.innerHTML = `
        <header-el></header-el>
        <div class="title-cont">
        <title-el text-title="Mascotas reportadas"></title-el>
        </div>       
        <text-el text="Aún no reportaste mascotas perdidas"></text-el>
        <img class="img" src="${imagen}" alt="img">
        <div class="button-cont">
        <button-el class="add-report-button" text-button="Publicar reporte" color-button="blue" ></button-el>
        </div>
        `;
        const style = document.createElement("style");
        style.textContent = `
        @media(min-width:768px){
        .title-cont{
        margin-top:150px;
        }
        }
       .img{
       display:block;
       margin: 0 auto;
       }
       .button-cont{
       margin-top:104px;
       margin-bottom:15px;       
       }
        `;
        rootEl.appendChild(style);
        const addReportButtonEl = rootEl.querySelector(
          ".add-report-button",
        ) as HTMLElement;
        addReportButtonEl.addEventListener("click", () => {
          goTo("/make-reports");
          handleRoute(location.pathname);
        });
      } else {
        rootEl.innerHTML = `
        <header-el></header-el>
        <div class="title-cont">
        <title-el text-title="Mascotas reportadas"></title-el>
        </div>       
        <div class="cards-cont">
        
        </div>
        <div class="button-cont">
        <button-el class="add-report-button" text-button="Publicar reporte" color-button="blue" ></button-el>
        </div>
        `;
        const style = document.createElement("style");
        style.textContent = `
        @media(min-width:768px){
        .title-cont{
        margin-top:150px;
        }
        }
        .img{
        display:block;
        margin: 0 auto;
        }
       .button-cont{
        margin-top:104px;
        margin-bottom:15px;
       }
       .cards-cont{
       display:flex;
       flex-direction:column;
       justify-content: center;
       gap:25px;
       }
       @media (min-width:768px){
       .cards-cont{
       flex-direction:row;
       flex-wrap: wrap;
    
       }
       }
        `;
        rootEl.appendChild(style);
        const addReportButtonEl = rootEl.querySelector(
          ".add-report-button",
        ) as HTMLElement;
        addReportButtonEl.addEventListener("click", () => {
          goTo("/make-reports");
          handleRoute(location.pathname);
        });
        const cardsContEl = rootEl.querySelector(".cards-cont") as HTMLElement;
        const pets = currentState.user.pets;
        for (const pet of pets) {
          const cardEl = document.createElement("card-el");
          cardEl.setAttribute("type-card", "edit");
          cardEl.setAttribute("img-url", pet.img);
          cardEl.setAttribute("pet-name", pet.name);
          cardEl.setAttribute("location", pet.location);
          cardEl.setAttribute("pet-id", pet.id);
          cardsContEl.appendChild(cardEl);
        }
      }
    }
    renderPage();
    state.subscribe(renderPage);
  }
}
