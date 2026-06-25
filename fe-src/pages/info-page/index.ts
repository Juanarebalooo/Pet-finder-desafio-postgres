export function infoPage() {
  const rootEl = document.querySelector(".root");
  if (rootEl) {
    rootEl.innerHTML = `
    <header-el></header-el>
    <div class="container">

    <div class="subcontainer">
    <subtitle-el class="subtitle"text-sub="¿Cómo funciona Pet Finder?" bold-sub="true"></subtitle-el>
    <text-el text="Pet Finder te permite publicar mascotas perdidas y reportar si tienes información de alguna que esté reportada."></text-el>
    </div>

    <div class="subcontainer">
    <subtitle-el class="subtitle"text-sub="¿Cómo publico una mascota perdida?" bold-sub="true"></subtitle-el>
    <text-el text="Para publicar una mascota que hayas perdido debes registrarte. Luego ve a la sección 'Mis mascotas perdidas' en el menú y allí podrás publicar."></text-el>
    </div>
    <div class="subcontainer">
    <subtitle-el class="subtitle"text-sub="¿Cómo reporto información sobre una mascota perdida?" bold-sub="true"></subtitle-el>
    <text-el text="Primero debes dar tu ubicación. Para esto puedes registrarte y ponerla en tus datos, o simplemente dar tu ubicación en la página anterior sin necesidad de registrarte. Una vez con esa información, tendrás acceso a las mascotas perdidas que se hayan visto por última vez cerca de donde estás."></text-el>
    </div>
    </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
    .container{
    display:flex;
    flex-direction:column;
    }
    @media(min-width:480px){
    .container{
    margin-top:100px;
    gap:70px;
    padding: 0px 50px 0px 50px;
    }
    }
    `;
    rootEl.appendChild(style);
  }
}
