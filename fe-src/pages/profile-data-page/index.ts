import { state } from "../../state";
export function profileDataPage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <title-el text-title="Datos personales"></title-el>
    <div class="input__cont">
    <div class="input__cont__subcont">
    <div class="input__cont__subcont__subcont"> 
    <label class="label">NOMBRE</label>
    <input class="input" name="name" type="text" />
    </div>
    <div class="input__cont__subcont__subcont">
    <label class="label">LOCALIDAD</label>
    <input class="input" name="location" type="text" />
    </div>
    </div>
    </div>
    <div class="button-cont">
    <button-el class="button" text-button="Guardar" color-button="blue"></button-el>
    </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
     .input__cont{
     margin-top:50px;
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
    .button-cont{
    margin-top: 180px;
    }
    `;
    rootEl.appendChild(style);
    const nameInputEl = rootEl.querySelector(
      'input[name="name"]',
    ) as HTMLInputElement;
    const locationInputEl = rootEl.querySelector(
      'input[name="location"]',
    ) as HTMLInputElement;
    const buttonEl = rootEl.querySelector(".button") as HTMLElement;
    buttonEl.addEventListener("click", () => {
      if (!nameInputEl.value && !locationInputEl.value) {
        alert("No hay datos que guardar.");
      } else if (nameInputEl.value && locationInputEl.value) {
        alert("Solo puedes llenar una casilla a la vez.");
      } else if (nameInputEl.value) {
        state.setName(nameInputEl.value);
        alert("Nombre guardado correctamente.");
      } else if (locationInputEl.value) {
        const search = locationInputEl.value;
        // console.log(locationInputEl.value);
        fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&addressdetails=1&countrycodes=AR`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) {
              const firstResult = data[0];
              const lng = firstResult.lon;
              const lat = firstResult.lat;
              console.log("lng:", lng, " ", "lat:", lat);
              state.setUserCoords({ lng, lat });
              alert("Localidad guardada correctamente");
            }
          });
      }
    });
  }
}
