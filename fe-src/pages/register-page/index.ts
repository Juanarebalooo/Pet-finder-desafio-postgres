import { error } from "node:console";
import { state } from "../../state";
import { goTo, handleRoute } from "../../router";
export function registerPage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <div class="titles">
    <title-el text-title="Registrarse"></title-el>
    <text-el text="Ingresá los siguientes datos para realizar el registro"></text-el>
    </div>
    <div class="input__cont">
    <div class="input__cont__subcont">
    <div class="input__cont__subcont__subcont"> 
    <label class="label">EMAIL</label>
    <input class="input" name="email" type="email" />
    </div>
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
    <div class="last__cont">
    <div class="text__cont">
    <p class="text">Ya tenes una cuenta?</p>
    <a class="link"href="/login">Iniciar sesión.</a>
    </div>
    <button-el class="button" text-button="Siguiente" color-button="blue"></button-el>
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
    .text, .link{
    font-family:"Poppins";
    display:inline;
    text-align: center;
    }
    .text__cont{
    display:flex;
    justify-content:center;
    margin-top: 18px;
    }
    .last__cont{
    display:flex;
    flex-direction:column;
    gap:25px;
    }
    
    `;
    rootEl.appendChild(style);
    const emailInputEl = rootEl.querySelector(
      'input[name="email"]',
    ) as HTMLInputElement;
    const passwordInputEl = rootEl.querySelector(
      'input[name="password"]',
    ) as HTMLInputElement;
    const confirmPasswordInputEl = rootEl.querySelector(
      'input[name="confirm-password"]',
    ) as HTMLInputElement;
    const buttonEl = rootEl.querySelector(".button") as HTMLElement;
    buttonEl.addEventListener("click", () => {
      if (!emailInputEl.value.includes("@")) {
        alert("Ingresá un email válido");
        return;
      }
      if (
        !passwordInputEl.value ||
        !confirmPasswordInputEl.value ||
        !emailInputEl.value
      ) {
        alert("Llena todas las casillas para poder registrate.");
      } else {
        if (passwordInputEl.value === confirmPasswordInputEl.value) {
          state.register(
            {
              email: emailInputEl.value,
              password: passwordInputEl.value,
            },
            (data) => {
              if (data.error) {
                alert(data.error);
              } else {
                alert("Registrado correctamente");
                goTo("/full-login");
                handleRoute(location.pathname);
              }
            },
          );
        } else {
          alert("LA CONTRASEÑA NO COINCIDE PADRE");
        }
      }
    });
  }
}
