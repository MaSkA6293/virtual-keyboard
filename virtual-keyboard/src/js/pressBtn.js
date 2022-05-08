import state from "./state";
import { printSymbol, getChar } from "./helpers";
const textAria = document.querySelector(".text-aria");

document.addEventListener("keydown", handlerKeyDown);
document.addEventListener("keyup", handlerKeyUp);
document.addEventListener("mousedown", handlerMouseDown);
document.addEventListener("mouseup", handlerMousesUp);

function handlerKeyDown(e) {
  e.preventDefault();
  textAria.focus();
  if (e.code) {
    if (e.code === "ControlLeft") {
      state.isPressedControlLeft = true;
    }
    if (e.code === "AltLeft") {
      state.isPressedAltLeft = true;
    }
    if (e.code === "ControlRight") {
      state.isPressedControlLeft = true;
    }
    if (e.code === "AltRight") {
      state.isPressedAltLeft = true;
    }
    changeActionDown(e.code);
    const char = getChar(e.code);
    if (char !== undefined) {
      printSymbol(char);
    }
  }
}
function handlerKeyUp(e) {
  e.preventDefault();
  if (e.code === "ControlLeft") {
    state.isPressedControlLeft = false;
  }
  if (e.code === "AltLeft") {
    state.isPressedAltLeft = false;
  }

  const btn = document.querySelector(`.${e.code}`);
  if (btn) {
    changeActionUp(btn, e.code);
  }
}

function handlerMouseDown(e) {
  if (e.target.closest(".keyboard")) {
    e.preventDefault();
    textAria.focus();
    const key = e.target.closest(".key");
    if (key) {
      state.selectedElement = key;
      changeActionDown(key.classList[2]);
      const char = getChar(key.classList[2]);
      if (char !== undefined) {
        printSymbol(char);
      }
    }
  }
}

function handlerMousesUp(e) {
  e.preventDefault();
  if (state.selectedElement !== undefined) {
    const code = state.selectedElement.classList[2];
    changeActionUp(state.selectedElement, code);
  }
}

export function changeCase(modifyClass) {
  const modifyKeys = document.querySelectorAll(`.${state.activeLanguage}`);
  modifyKeys.forEach((el) => {
    el.childNodes.forEach((span) => {
      if (span.classList.contains(modifyClass)) {
        span.classList.remove("hidden");
      } else {
        span.classList.add("hidden");
      }
    });
  });
}

export function changeLanguage(firstLoad) {
  if (!firstLoad) {
    state.activeLanguage = state.activeLanguage === "ru" ? "en" : "ru";
  }
  const keys = document.querySelectorAll(`.key`);
  keys.forEach((el) => {
    el.childNodes.forEach((node) => {
      if (node.classList.contains(`${state.activeLanguage}`)) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
    });
  });
  if (state.isPressedCaps) {
    changeCase("caps");
  }
}

function changeActionDown(code) {
  if (document.querySelector(`.${code}`)) {
    const btn = document.querySelector(`.${code}`);
    btn.classList.add("active");
    if (code === "CapsLock") {
      state.isPressedCaps = !state.isPressedCaps;
      if (!state.isPressedCaps) {
        changeCase("caseDown");
      } else {
        changeCase("caps");
      }
    }
    if (code === "ShiftLeft" || code === "ShiftRight") {
      changeCase("caseUp");
      if (state.isPressedCaps) {
        changeCase("shiftCaps");
      }
    }
    if (state.isPressedControlLeft && state.isPressedAltLeft) {
      changeLanguage();
    }
  }
}

function changeActionUp(el, code) {
  if (code !== "CapsLock") {
    el.classList.remove("active");
  } else if (code === "CapsLock" && !state.isPressedCaps) {
    el.classList.remove("active");
  }
  if (code === "ShiftLeft" || code === "ShiftRight") {
    changeCase("caseDown");
    if (state.isPressedCaps) {
      changeCase("caps");
    }
  }
}
