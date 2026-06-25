import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stringify } from "node:querystring";
import { goTo, handleRoute } from "../../router";
import { state } from "../../state";
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
export function locationPage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <div class="container">
    <form class="search-form">
    <subtitle-el text-sub="Ingresá tu ubicación actual"></subtitle-el>
    <div class="search__cont">
    <input class="input" name="q" type="search" />
    <button class="button">Buscar</button>
    </div>
    </form>
    <div class="map"id="mapId"></div>
    </div>
    <div class="button__cont">
    </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
    .search-form{
    display:flex;
    flex-direction:column;
    }
    .search__cont{
    display:flex;
    flex-direction:column;
    margin: 0 auto;
    gap:20px;
    }
    .input{
    width:335px;
    height:50px;
    font-family:"Poppins";
    font-size:25px;
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
    background-color:#00A884;
    }
    .map{
    width:335px;
    height:253px;
    margin-top: 35px;
    position: relative;
    border-radius:12px;
    }
    @media(min-width:768px){
    .map{
    width:55vw;
    height:55vh;
    }
    }
    .container{
    display:flex;
    flex-direction:column;
    align-items:center;
    }
    
    .button__cont{
    margin: 0 auto;
    margin-top:50px;
    display:table;
    }
    `;
    rootEl.appendChild(style);
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: "mapId",
      style: "mapbox://styles/mapbox/streets-v11",
    });
    map.on("load", () => {
      map.resize();
    });
    const searchEl = rootEl.querySelector(".search-form") as HTMLElement;
    searchEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = (e.target as HTMLFormElement).q.value;
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&countrycodes=AR`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const firstResult = data[0];
            const lng = firstResult.lon;
            const lat = firstResult.lat;

            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
            map.flyTo({
              center: [lng, lat],
              zoom: 14,
            });
            const buttonEl = rootEl.querySelector(
              ".save-location",
            ) as HTMLElement;
            const buttonContEl = rootEl.querySelector(
              ".button__cont",
            ) as HTMLElement;
            if (!buttonEl) {
              const newButtonEl = document.createElement("button-el");
              newButtonEl.classList.add("save-location");
              newButtonEl.setAttribute("text-button", "Guardar ubicación");
              newButtonEl.setAttribute("color-button", "green");
              newButtonEl.style.marginTop = "50px";
              buttonContEl.appendChild(newButtonEl);
            }
            buttonContEl.addEventListener("click", () => {
              // console.log(lng, lat);
              const coords = {
                lng,
                lat,
              };
              state.setNoUserCoords(coords);
              // localStorage.setItem("coordenadas", JSON.stringify(coords));
              goTo("/reports");
              handleRoute(location.pathname);
            });
          }
        });
    });
  }
}
