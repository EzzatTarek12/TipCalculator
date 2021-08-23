"use strict";
const billInput = document.querySelector(".form__input--bill");
const tipBtn = document.querySelectorAll(".form__btn--tip");
const customTipInput = document.querySelector(".form__input--custom");
const peopleInput = document.querySelector(".form__input--people");
const peopleLabel = document.querySelector(".people__label");
const peopleLabelInvalid = document.querySelector(".people__label--invalid");
const tipAmount = document.querySelector(".tip--amount");
const totalAmount = document.querySelector(".total--amount");
const resetBtn = document.querySelector(".results__btn--reset");
// Variables
let bill;
let tip = 0;
let customTip = 0;
let peopleNum;
const tipBtnArr = Array.from(tipBtn);
peopleInput.value = "";
// Functions
const removeActive = function (arr) {
  arr
    .find((el) => el.classList.contains("form__btn--tip--active"))
    ?.classList.remove("form__btn--tip--active");
};
const displayBill = function () {
  if (bill && peopleNum && (tip || customTip)) {
    let currentTip;
    if (
      tipBtnArr.some((tipBtn) =>
        tipBtn.classList.contains("form__btn--tip--active")
      )
    ) {
      currentTip = tip;
    } else {
      currentTip = customTip;
    }
    tipAmount.textContent = ((bill * currentTip) / peopleNum).toFixed(2) + "$";
    totalAmount.textContent =
      (bill / peopleNum + parseFloat(tipAmount.textContent)).toFixed(2) + "$";
  }
};

billInput.addEventListener("blur", function () {
  bill = +billInput.value;
  displayBill();
});
peopleInput.addEventListener("blur", function () {
  peopleNum = peopleInput.value ? +peopleInput.value : NaN;
  displayBill();
  if (peopleNum <= 0) {
    peopleLabel.classList.add("hidden");
    peopleLabelInvalid.classList.remove("hidden");
    peopleInput.style.border = "2px solid rgb(243, 115, 115)";
  } else {
    peopleInput.style.border = "2px solid transparent";
    peopleLabel.classList.remove("hidden");
    peopleLabelInvalid.classList.add("hidden");
  }
});
peopleInput.addEventListener("focus", function () {
  peopleInput.style.border = " 2px solid hsl(172, 67%, 45%)";
});
customTipInput.addEventListener("focus", function () {
  removeActive(tipBtnArr);
  customTipInput.value = "";
});

customTipInput.addEventListener("blur", function () {
  if (!customTipInput.value) {
    customTipInput.value = "Custom";
    tipAmount.textContent = "$0.00";
  } else {
    customTip = parseFloat(customTipInput.value) / 100;
    displayBill();
  }
});

// TipBtn

tipBtnArr.forEach(function (tipValue, i, arr) {
  tipValue.addEventListener("click", function (e) {
    e.preventDefault();
    removeActive(arr);
    tipValue.classList.add("form__btn--tip--active");
    tip = Number.parseFloat(tipValue.textContent) / 100;
    displayBill();
  });
});

// Live Update functionality
document.querySelector("body").addEventListener("keyup", function (e) {
  if (isFinite(+e.key) || e.key === "Backspace") {
    if (document.activeElement === billInput) bill = +billInput.value;
    else if (document.activeElement === customTipInput)
      customTip = parseFloat(customTipInput.value) / 100;
    else if (document.activeElement === peopleInput)
      peopleNum = +peopleInput.value;
    displayBill();
  }
  if (e.key === "Escape") {
    document.activeElement.blur();
  }
});

// Reset Button
resetBtn.addEventListener("click", function () {
  tip = 0;
  customTip = 0;
  peopleNum = 0;
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "Custom";
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  tipBtnArr
    .find((tipBtn) => tipBtn.classList.contains("form__btn--tip--active"))
    ?.classList.remove("form__btn--tip--active");
  peopleInput.style.border = "2px solid transparent";
  peopleLabel.classList.remove("hidden");
  peopleLabelInvalid.classList.add("hidden");
});
