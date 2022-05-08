import keyboard from "./keyboard";

export function addClass(element, classes) {
  classes.forEach((item) => {
    element.classList.add(`${item}`);
  });
}

export function getRow(sliceOfKeyboard) {
  const row = document.createElement("div");

  addClass(row, ["keyboard__row"]);

  sliceOfKeyboard.forEach((item) => {
    const button = document.createElement("div");
    addClass(button, ["keyboard__key", "key", item.name]);

    const spanRus = document.createElement("span");
    addClass(spanRus, ["ru"]);

    Object.keys(item.ru).forEach((el) => {
      const span = document.createElement("span");
      addClass(span, [`${el}`]);
      span.textContent = item.ru[el];
      spanRus.appendChild(span);
    });

    const spanEn = document.createElement("span");
    addClass(spanEn, ["en"]);

    Object.keys(item.en).forEach((el) => {
      const span = document.createElement("span");
      addClass(span, [`${el}`]);
      span.textContent = item.en[el];
      spanEn.appendChild(span);
    });

    button.appendChild(spanRus);
    button.appendChild(spanEn);
    row.appendChild(button);
  });
  return row;
}

export function getTextAria() {
  const textAria = document.createElement("textarea");
  textAria.placeholder = "Happy cross check my friend!";
  addClass(textAria, ["text-aria"]);
  return textAria;
}

export function hide(arr) {
  arr.forEach((el) => el.classList.add("hidden"));
}

export function drawCaption() {
  const wrapperCaption = document.createElement("div");
  addClass(wrapperCaption, ["caption"]);

  const p = document.createElement("p");
  addClass(p, ["caption__title"]);
  p.textContent = "The keyboard was created in";

  const ubuntuIcon = document.createElement("div");
  addClass(ubuntuIcon, ["caption__image", "caption__image-ubuntu"]);
  p.appendChild(ubuntuIcon);

  const spanFor = document.createElement("span");
  spanFor.textContent = "for";
  p.appendChild(spanFor);

  const windowIcon = document.createElement("div");
  addClass(windowIcon, ["caption__image"]);

  p.appendChild(windowIcon);

  const spanWithLove = document.createElement("span");
  addClass(spanWithLove, ["caption__for"]);
  spanWithLove.textContent = "With Love";
  p.appendChild(spanWithLove);

  wrapperCaption.appendChild(p);

  const changeLanguage = document.createElement("div");
  addClass(changeLanguage, ["caption__change-language", "change-language"]);

  const changeLanguageTitle = document.createElement("p");
  changeLanguageTitle.textContent = "To change the language just press:";
  addClass(changeLanguageTitle, ["change-language__title"]);
  changeLanguage.appendChild(changeLanguageTitle);

  const ctrlButton = document.createElement("div");
  addClass(ctrlButton, ["keyboard__key", "key"]);
  const spanCtrl = document.createElement("span");
  spanCtrl.textContent = "Ctrl";
  ctrlButton.appendChild(spanCtrl);

  changeLanguage.appendChild(ctrlButton);

  const spanPlus = document.createElement("span");
  addClass(spanPlus, ["change-language__plus"]);
  spanPlus.textContent = "+";

  changeLanguage.appendChild(spanPlus);

  const altButton = document.createElement("div");
  addClass(altButton, ["keyboard__key", "key"]);
  const spanAlt = document.createElement("span");
  spanAlt.textContent = "Alt";
  altButton.appendChild(spanAlt);

  changeLanguage.appendChild(altButton);

  return [wrapperCaption, changeLanguage];
}

export function getKeyboardBody() {
  const keyboardBody = document.createElement("div");
  addClass(keyboardBody, ["keyboard"]);

  const rowsOfKeys = [
    [0, 14],
    [14, 29],
    [29, 42],
    [42, 55],
    [55, keyboard.length + 1],
  ];

  rowsOfKeys.forEach((el) => {
    const [a, b] = [el[0], el[1]];
    keyboardBody.appendChild(getRow(keyboard.slice(a, b)));
  });
  return keyboardBody;
}

export function hideInactiveSymbols() {
  const up = document.querySelectorAll(".caseUp");
  const caps = document.querySelectorAll(".caps");
  const shiftCaps = document.querySelectorAll(".shiftCaps");
  const ru = document.querySelectorAll(".ru");
  hide(up);
  hide(caps);
  hide(shiftCaps);
  hide(ru);
}
