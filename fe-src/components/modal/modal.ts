import { state } from "../../state";

export function openModal(petId: number, petName: string) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <div class="modal__overlay"></div>
  <div class="modal__cont">
  <title-el text-title="Reportar info de ${petName}" color-title="white"></title-el>
  <div class="input__cont">
  <div class="input__cont__subcont">
  <div class="input__cont__subcont__subcont"> 
  <label class="label">NOMBRE</label>
  <input class="input" name="name" type="text" />
  </div>
  <div class="input__cont__subcont__subcont">
  <label class="label">TELÉFONO</label>
  <input class="input" name="phone" type="tel" />
  </div>
  <div class="input__cont__subcont__subcont">
  <label class="label">¿DÓNDE LO VISTE?</label>
  <textarea class="textarea" name="info" placeholder="Información de donde viste a ${petName}" ></textarea>
  </div>
  </div>
  </div>
  <div class="button__cont">
  <button-el class="send__button"text-button="Enviar información" color-button="green"></button-el>
  <button-el class="cancel__button" text-button="Cancelar" color-button="black"></button-el>
  </div>
  </div>
  `;
  document.body.appendChild(modal);
  const style = document.createElement("style");
  style.textContent = `
.modal{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
z-index:100;
display:flex;
justify-content:center;
align-items:center;
}
.modal__overlay{
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.1);
backdrop-filter: blur(1px);
pointer-events: none;
}
.modal__cont{
position:relative;  
z-index:101;        
background-color:#26302E;
padding:20px;
border-radius:10px;
display:flex;
flex-direction:column;
gap:15px;
width:335px;

}
@media(max-height:768px){
.modal__cont{
height:580px;
overflow-y: auto;
}
}
.button__cont{
display:flex;
flex-direction:column;
gap:15px;
margin-top:15px;
}
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
width:275px;
height:50px;
font-family:"Poppins";
font-size:25px;
}
.label{
font-size:16px;
font-family:"Poppins";
color:white;
}
.textarea{
width:275px;
height:100px;
font-family:"Poppins";
font-size:25px;
}
  `;
  document.head.appendChild(style);
  const reportData = {
    petId: Number(petId),
    finderName: "",
    finderPhone: "",
    info: "",
  };
  const buttonCancel = modal.querySelector(".cancel__button") as HTMLElement;
  buttonCancel.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  const nameInputEl = modal.querySelector(
    `input[name="name"]`,
  ) as HTMLInputElement;
  const telInputEl = modal.querySelector(
    `input[name="phone"]`,
  ) as HTMLInputElement;
  const textareaEl = modal.querySelector(
    `textarea[name="info"]`,
  ) as HTMLTextAreaElement;
  nameInputEl.addEventListener("input", () => {
    reportData.finderName = nameInputEl.value;
    console.log(reportData.finderName);
  });
  telInputEl.addEventListener("input", () => {
    const onlyNumbers = /^[0-9]+$/.test(telInputEl.value);
    if (!onlyNumbers && telInputEl.value !== "") {
      alert("El teléfono solo puede contener números");
      telInputEl.value = reportData.finderPhone;
    } else {
      reportData.finderPhone = telInputEl.value;
      console.log(reportData.finderPhone);
    }
  });
  textareaEl.addEventListener("input", () => {
    reportData.info = textareaEl.value;
    console.log(reportData.info);
  });
  const sendButtonEl = modal.querySelector(".send__button") as HTMLElement;
  console.log(sendButtonEl);

  sendButtonEl.addEventListener("click", () => {
    if (
      reportData.finderName === "" ||
      reportData.finderPhone === "" ||
      reportData.info === ""
    ) {
      alert("Tienes que completar todos los datos!");
    } else {
      state.reportFound(reportData, (data) => {
        alert(data.message);
        location.reload();
      });
    }
  });
}
