import {
  addClass,
  getTextAria,
  hideInactiveSymbols,
  drawCaption,
  getKeyboardBody,
} from "./helpers";

const body = document.querySelector("body");

const wrapper = document.createElement("div");

addClass(wrapper, ["wrapper"]);

wrapper.appendChild(getTextAria());

wrapper.appendChild(getKeyboardBody());

body.appendChild(wrapper);

hideInactiveSymbols();

const [wrapperCaption, changeLanguage] = drawCaption();

wrapper.appendChild(wrapperCaption);
wrapper.appendChild(changeLanguage);
