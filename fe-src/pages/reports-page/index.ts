import { state } from "../../state";
export function reportsPage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <subtitle-el text-sub="Mascotas perdidas cerca" bold-sub="true"></subtitle-el>
    <div class="cards-cont"></div>
    `;
    const style = document.createElement("style");
    style.textContent = `
    .cards-cont{
    display:flex;
    flex-direction:column;
    justify-content: center;
    gap:25px;
    }
    `;
    console.log(state.getState());

    rootEl.appendChild(style);
    function renderCards() {
      const currentState = state.getState();
      const cardsContEl = rootEl.querySelector(".cards-cont") as HTMLElement;

      if (!currentState.user.email) return;
      if (!currentState.user.lat && !currentState.user.lng) {
        const noUserCoords = localStorage.getItem("noUserCoords");
        if (!noUserCoords) {
          console.log("No tenes ninguna ubicación guardada");
        } else {
          const coords = JSON.parse(noUserCoords);
          console.log("lat:", coords.lat);
          console.log("lng:", coords.lng);
          state.getPetsAround({ lat: coords.lat, lng: coords.lng }, (data) => {
            console.log(data);
            cardsContEl.innerHTML = "";
            for (const card of data) {
              const cardEl = document.createElement("card-el");
              cardEl.setAttribute("type-card", "report");
              cardEl.setAttribute("img-url", card.img);
              cardEl.setAttribute("pet-name", card.name);
              cardEl.setAttribute("location", card.location);
              cardEl.setAttribute("pet-id", card.objectID);
              cardsContEl.appendChild(cardEl);
            }
          });
        }
      } else {
        console.log("lat:", currentState.user.lat);
        console.log("lng:", currentState.user.lng);
        state.getPetsAround(
          { lat: currentState.user.lat, lng: currentState.user.lng },
          (data) => {
            console.log(data);
            cardsContEl.innerHTML = "";
            for (const card of data) {
              const cardEl = document.createElement("card-el");
              cardEl.setAttribute("type-card", "report");
              cardEl.setAttribute("img-url", card.img);
              cardEl.setAttribute("pet-name", card.name);
              cardEl.setAttribute("location", card.location);
              cardEl.setAttribute("pet-id", card.objectID);
              cardsContEl.appendChild(cardEl);
            }
          },
        );
      }
      // state.getUser(() => {
      //   const currentState = state.getState();
      //   if (!currentState.user) {
      //   }
      // });
    }
    renderCards();
    state.subscribe(renderCards);
  }
}
