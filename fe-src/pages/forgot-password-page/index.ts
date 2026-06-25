import { state } from "../../state";
export function forgotPasswordPage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <div class="container">
    <title-el text-title="Olvidaste tu contraseña"></title-el>
    <text-el text="Ingresá tu email para ayudarte a recuperar el acceso a tu cuenta"></text-el>
    <div class="input__cont">
    <div class="input__cont__subcont">
    <div class="input__cont__subcont__subcont"> 
    <label class="label">EMAIL</label>
    <input class="input" name="email" type="email" />
    </div>
    </div>
    </div>
    <div class="button__cont">
    <button-el class="button"text-button="Enviar" color-button="blue"></button-el>
    </div>
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
    .button__cont{
    margin-top: 35px;
    }
    @media(min-width:768px){
    .container{
    margin-top:125px;
    }
    }
    `;
    rootEl.appendChild(style);
    const emailInputEl = rootEl.querySelector(
      'input[name="email"]',
    ) as HTMLInputElement;
    const buttonEl = rootEl.querySelector(".button") as HTMLElement;
    buttonEl.addEventListener("click", () => {
      state.sendEmailToChangePassword({ email: emailInputEl.value }, (data) => {
        alert(data.message);
      });
    });
  }
}
