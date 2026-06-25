import Dropzone from "dropzone";
import mapboxgl from "mapbox-gl";
import { goTo, handleRoute } from "../../router";
import { state } from "../../state";
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
export function editMyReportsPage() {
  const rootEl = document.querySelector(".root");

  if (rootEl) {
    state.getUser(() => {
      rootEl.innerHTML = `
            <header-el></header-el>
            <title-el text-title="Editar reporte de mascota"></title-el>
            <div class="input__cont">
            <div class="input__cont__subcont">
            <div class="input__cont__subcont__subcont"> 
            <label class="label">NOMBRE</label>
            <input class="input" name="name" type="text" />
            </div>
            </div>
            </div>
            <div class="dropzone-cont">
            <button class="foto-input">Toca aquí si quieres cambiar la anterior imagen de tu mascota</button>
            <button-el class="img-button"text-button="Agregar foto" color-button="blue"></button-el>
            </div>
            <div class="map-cont">
            <div class="map" id="mapId"></div>
            <text-el text="Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez."></text-el>
            <div class="input__cont">
            <div class="input__cont__subcont">
            <div class="input__cont__subcont__subcont"> 
            <label class="label">UBICACIÓN</label>
            <input class="input" name="location" type="text" />
            </div>
            </div>
            </div>
            <button-el class="location-save-button"text-button="Guardar ubicación" color-button="blue"></button-el>
            </div>
            <div class="last-cont">
            <button-el class="report-pet-button"text-button="Guardar" color-button="green"></button-el>
            <button-el class="delete-button" text-button="Eliminar reporte" color-button="red"></button-el>
            <button-el class="cancel-button"text-button="Cancelar" color-button="black"></button-el>
            </div>
            `;
      const style = document.createElement("style");
      style.textContent = `
             .input__cont{
            display:flex;   
            justify-content:center;
            }
            .input__cont__subcont{
            display:flex;
            flex-direction:column;
            gap:25px;
            }
            .input__cont__subcont__subcont{
            display:flex;
            flex-direction:column;
            }
               .input{
             width:335px;
            height:50px;
            font-family:"Poppins";
            font-size:25px;
            }
            .label{
            font-size:16px;
            font-family:"Poppins";
            }
            .dropzone-cont{
            display:flex;
            flex-direction:column;
            gap:25px;
            margin-top:25px;
            }
            .foto-input{
            display:block;
            margin:0 auto;
            width:335px;
            height:180px;
            border-radius:3px;
            border:1px solid;
            }
            .map-cont{
            display:flex;
            flex-direction:column;
            gap:15px;
            justify-content:center;
            }
            .map{
            width:335px;
            height:253px;
            margin:0 auto;
            margin-top: 35px;
            position: relative;
            border-radius:12px;
            
            }
            .last-cont{
            display:flex;
            flex-direction:column;
            margin-top:25px;
            margin-bottom:10px;
            gap:25px;
            }
            
            `;
      rootEl.appendChild(style);
      const petData = {
        name: "",
        img: "",
        lat: 0,
        lng: 0,
        location: "",
      };
      const petId = location.pathname.split("/")[2];
      const currenState = state.getState();
      const pet = currenState.user.pets.find((p) => p.id == petId);
      petData.name = pet.name;
      petData.img = pet.img;
      petData.lat = pet.lat;
      petData.lng = pet.lng;
      petData.location = pet.location;

      const nameInputEl = rootEl.querySelector(
        'input[name="name"]',
      ) as HTMLInputElement;
      nameInputEl.addEventListener("input", () => {
        petData.name = nameInputEl.value;
        console.log(petData);
      });
      let archivoFoto: File | null = null;
      const myDropzone = new Dropzone(".foto-input", {
        url: "/",
        autoProcessQueue: false,
      });
      myDropzone.on("addedfile", (file) => {
        archivoFoto = file;
      });
      const saveImgButton = rootEl.querySelector(".img-button") as HTMLElement;
      saveImgButton.addEventListener("click", () => {
        if (!archivoFoto) return;
        const formData = new FormData();
        formData.append("file", archivoFoto);
        formData.append("upload_preset", "mipreset");
        fetch("https://api.cloudinary.com/v1_1/deik7nqzr/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            petData.img = data.secure_url;
            //   console.log(petData);
          });
      });
      const locationInputEl = rootEl.querySelector(
        'input[name="location"]',
      ) as HTMLInputElement;
      const locationSaveButtonEl = rootEl.querySelector(
        ".location-save-button",
      ) as HTMLElement;
      mapboxgl.accessToken = MAPBOX_TOKEN;
      const map = new mapboxgl.Map({
        container: "mapId",
        style: "mapbox://styles/mapbox/streets-v11",
      });
      map.on("load", () => {
        map.resize();
      });
      locationSaveButtonEl.addEventListener("click", () => {
        const locationVal = locationInputEl.value;
        petData.location = locationVal;
        fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationVal)}&format=json&addressdetails=1&countrycodes=AR`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) {
              const firstResult = data[0];
              const lng = firstResult.lon;
              const lat = firstResult.lat;
              petData.lng = lng;
              petData.lat = lat;
              // console.log(petData);

              new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
              map.flyTo({
                center: [lng, lat],
                zoom: 14,
              });
            }
          });
      });
      const reportPetButton = rootEl.querySelector(
        ".report-pet-button",
      ) as HTMLElement;
      const deleteButton = rootEl.querySelector(
        ".delete-button",
      ) as HTMLElement;
      const petIdToNumber = Number(petId);
      deleteButton.addEventListener("click", () => {
        state.deletePet(petIdToNumber, (data) => {
          alert(data.message);
          state.getUser();
          goTo("/my-reports");
          handleRoute(location.pathname);
        });
      });
      const cancelButton = rootEl.querySelector(
        ".cancel-button",
      ) as HTMLElement;

      reportPetButton.addEventListener("click", () => {
        if (
          petData.img.length === 0 ||
          petData.name.length === 0 ||
          petData.lat === 0 ||
          petData.lng === 0
        ) {
          alert(
            "Tienes que completar todos los datos de tu mascota para poder reportar.",
          );
        } else {
          state.updatePetData(petData, petIdToNumber, (data) => {
            alert(data.message);
            state.getUser();
            goTo("/home");
            handleRoute(location.pathname);
          });
        }
      });
      cancelButton.addEventListener("click", () => {
        goTo("/my-reports");
        handleRoute(location.pathname);
      });
      nameInputEl.value = pet.name;
      locationInputEl.value = pet.location;
    });
  }
}
