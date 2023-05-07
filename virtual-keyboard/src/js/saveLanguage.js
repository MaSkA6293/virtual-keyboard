import { changeCase, changeLanguage } from "./pressBtn";
import state from "./state";

window.addEventListener("beforeunload", () => {
  localStorage.setItem("language", state.activeLanguage);
  localStorage.setItem("caps", state.isPressedCaps);
});

window.addEventListener("load", () => {
  if (localStorage.getItem("language")) {
    state.activeLanguage = localStorage.getItem("language");
    changeLanguage(true);
  } else {
    state.activeLanguage = "en";
  }

  if (localStorage.getItem("caps")) {
    if (localStorage.getItem("caps") === "true") {
      document.querySelector(".CapsLock").classList.add("active");
      changeCase("caps");
      state.isPressedCaps = true;
    } else {
      state.isPressedCaps = false;
    }
  } else {
    state.isPressedCaps = false;
  }
});
