import { state } from "../../state";
export function resetPasswordPage() {
  const token = location.pathname.split("/")[2];
  console.log(token);
  sessionStorage.setItem("token", token);

  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
          <header-el></header-el>
          <title-el text-title="Contraseña"></title-el>
          <div class="input__cont">
          <div class="input__cont__subcont">
          <div class="input__cont__subcont__subcont"> 
          <label class="label">CONTRASEÑA</label>
          <input class="input" name="password" type="password" />
          </div>
          <div class="input__cont__subcont__subcont">
          <label class="label">CONFIRMAR CONTRASEÑA</label>
          <input class="input" name="confirm-password" type="password" />
          </div>
          </div>
          </div>
          <div class="button-cont">
          <button-el class="button "text-button="Guardar" color-button="blue"></button-el>
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
          .button-cont{
          margin-top:180px;
          }
          `;
    rootEl.appendChild(style);
    const passwordInputEl = rootEl.querySelector(
      'input[name="password"]',
    ) as HTMLInputElement;
    const confirmPasswordInputEl = rootEl.querySelector(
      'input[name="confirm-password"]',
    ) as HTMLInputElement;
    const buttonEl = rootEl.querySelector(".button") as HTMLElement;
    buttonEl.addEventListener("click", () => {
      if (!passwordInputEl.value || !confirmPasswordInputEl.value) {
        alert("Complete todas las casillas para poder cambiar su contraseña.");
      } else if (passwordInputEl.value !== confirmPasswordInputEl.value) {
        alert("Las contraseñas nos coinciden.");
      } else if (passwordInputEl.value === confirmPasswordInputEl.value) {
        state.changeForgottenPassword(passwordInputEl.value, (data) => {
          alert(data.message);
        });
      }
    });
  }
}
