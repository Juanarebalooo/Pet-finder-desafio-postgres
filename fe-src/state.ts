import { goTo, handleRoute } from "./router";

const API_BASE_URL = "https://pet-finder-desafio-postgres.onrender.com";
type coords = {
  lng: number;
  lat: number;
};
export const state = {
  data: {
    // email: "",
    // nombre: "",
    // localidad: "",
    // userCoords: {
    //   lng: 0,
    //   lat: 0,
    // } as coords,
    // miReporte: {
    //   nombreDeLaMascota: "",
    //   img: "",
    //   ubicacion: "",
    //   locationCoords: {
    //     lng: 0,
    //     lat: 0,
    //   } as coords,
    // },
    user: {},
    reporte: {
      petName: "",
      reporterName: "",
      telefono: "",
      info: "",
    },
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setState(newState: any) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("Soy el state y he cambiado", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  register(params: { email: string; password: string }, callback?) {
    fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (callback) callback(data);
      });
  },
  login(params: { email: string; password: string }, callback?) {
    fetch(API_BASE_URL + "/auth/token", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          if (callback) callback(data);
          return;
        }
        localStorage.setItem("token", data);
        this.getUser();
        if (callback) callback(data);
      });
  },
  getUser(callback?) {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(API_BASE_URL + "/me", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const currenState = this.getState();
          currenState.user = data;
          this.setState(currenState);
          console.log(data);
          if (callback) callback();
        });
    }
  },
  setName(name: string) {
    const token = localStorage.getItem("token");
    fetch(API_BASE_URL + "/me", {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("hecho pues, nombre puesto");
      });
  },
  setUserCoords(params: coords) {
    const token = localStorage.getItem("token");
    fetch(API_BASE_URL + "/me/coords", {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        lat: params.lat,
        lng: params.lng,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("hecho pues, coords puestas");
        const noUserCoords = localStorage.getItem("noUserCoords");
        if (noUserCoords) {
          localStorage.removeItem("noUserCoords");
        }
      });
  },
  changePassword(password: string, callback?) {
    const token = localStorage.getItem("token");
    fetch(API_BASE_URL + "/auth/password", {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("hecho badre");
        if (callback) callback(data);
      });
  },
  setNoUserCoords(params: coords) {
    const currenState = this.getState();
    if (!currenState.user.lat && !currenState.user.lng) {
      localStorage.setItem("noUserCoords", JSON.stringify(params));
    } else if (currenState.user.lat && currenState.user.lng) {
      alert("Ya tenes una ubicación guardada!");
    }
  },
  checkLogin(callback) {
    const token = localStorage.getItem("token");
    if (token) {
      callback();
    } else {
      alert("Necesitas acceder ingresar para continuar.");
      goTo("/login");
      handleRoute(location.pathname);
    }
  },
  disconnect(callback) {
    const token = localStorage.getItem("token");
    const currenState = this.getState();
    if (token) {
      localStorage.removeItem("token");
      currenState.user = {};
      callback();
    }
  },
  setPet(
    params: {
      name: string;
      img: string;
      lat: number;
      lng: number;
      location: string;
    },
    callback?,
  ) {
    const token = localStorage.getItem("token");
    fetch(API_BASE_URL + "/pet", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        if (callback) callback(data);
      });
  },
  updatePetData(
    params: { name: string; img: string; lat: number; location: string },
    id: number,
    callback,
  ) {
    const token = localStorage.getItem("token");
    fetch(API_BASE_URL + "/pet/" + id, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      });
  },
  deletePet(id: number, callback) {
    const token = localStorage.getItem("token");
    fetch(API_BASE_URL + "/pet/" + id, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (callback) callback(data);
      });
  },
  getPetsAround(params: { lat: number; lng: number }, callback) {
    const token = localStorage.getItem("token");
    fetch(API_BASE_URL + `/pets-around?lat=${params.lat}&lng=${params.lng}`)
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      });
  },
  reportFound(
    params: {
      petId: number;
      finderName: string;
      finderPhone: string;
      info: string;
    },
    callback,
  ) {
    fetch(API_BASE_URL + "/report-found", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      });
  },
  sendEmailToChangePassword(params: { email: string }, callback) {
    fetch(API_BASE_URL + "/forgot-password", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      });
  },
  changeForgottenPassword(password: string, callback) {
    const token = sessionStorage.getItem("token");
    fetch(API_BASE_URL + "/auth/password", {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      });
  },
};
