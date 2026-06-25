import { goTo, handleRoute } from "../../router";
import { state } from "../../state";
export function fullLoginPage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <div class="container">
    <title-el text-title="Iniciar Sesión"></title-el>
    <div class="cont">
    <text-el text="Ingresá los siguientes datos para iniciar sesión"></text-el>
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
    </div>
    </div>
    <div class="last__cont">
    <div class="text__cont">
    <a class="link"href="/forgot-my-password">Olvidé mi contraseña.</a>
    </div>
    <button-el class="button" text-button="Siguiente" color-button="blue"></button-el>
    </div>
    </div>
    `;
    const style = document.createElement("style");
    style.textContent = `   
    .cont{
    padding: 0 20px;
    margin-top:40px;
    }
    @media (min-width:768px){
    .container{
    margin-top:120px;
    }
    }
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
      .link{
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
    const buttonEl = rootEl.querySelector(".button") as HTMLElement;
    buttonEl.addEventListener("click", () => {
      if (!emailInputEl.value.includes("@")) {
        alert("Ingresá un email válido");
        return;
      }
      if (!passwordInputEl.value) {
        alert("Llena todas las casillas para poder registrarte");
      } else {
        state.login(
          {
            email: emailInputEl.value,
            password: passwordInputEl.value,
          },
          (data) => {
            if (data.error) {
              alert(data.error);
            } else {
              alert("Ingresaste correctamente");
              goTo("/home");
              handleRoute(location.pathname);
            }
          },
        );
      }
    });
  }
}
