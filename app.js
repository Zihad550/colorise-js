/**
 * Date: 04-03-2023
 * Author: Zihad550
 * Description: Color picker application with huge DOM functionalities.
 */

/**********
 * globals
 ************/
let toast = null;

/**
 * @description onload handler
 */
window.onload = () => {
  main();
};

/**
 * @description main or boot function, this function will take care of getting all the DOM references
 */
function main() {
  // dom references
  const generateRandomColorBtn = document.getElementById(
    'generate-random-color'
  );
  const hexInp = document.getElementById('input-hex');
  const colorSliderRed = document.getElementById('color-slider-red');
  const colorSliderGreen = document.getElementById('color-slider-green');
  const colorSliderBlue = document.getElementById('color-slider-blue');
  const copyToClipBoardBtn = document.getElementById('copy-to-clipboard');
  const colorModeRadios = document.getElementsByName('color-mode');

  // event listeners
  generateRandomColorBtn.addEventListener(
    'click',
    handleGenerateRandomColorBtn
  );

  hexInp.addEventListener('keyup', handleHexInp);

  colorSliderRed.addEventListener(
    'change',
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderGreen.addEventListener(
    'change',
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderBlue.addEventListener(
    'change',
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );

  copyToClipBoardBtn.addEventListener('click', function () {
    const mode = getCheckedValueFromRadios(colorModeRadios);
    if (mode === null) throw new Error('Invalid Radio Input');

    if (mode === 'hex') {
      const hexColor = hexInp.value;
      navigator.clipboard.writeText(`#${hexColor}`);
    } else {
      const rgbColor = document.getElementById('input-rgb').value;
      navigator.clipboard.writeText(rgbColor);
    }
  });

  // copyBtn.addEventListener('click', function () {
  //   navigator.clipboard.writeText(`#${output.value}`);

  //   if (toast !== null) clearToast();

  //   if (isValidHex(output.value)) generateToastMsg(`#${output.value} copied.`);
  //   else alert('Invalid color code');
  // });
}

/*************
 *  Event handlers
 ************/
function handleGenerateRandomColorBtn() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
}

function handleHexInp(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const colorDecimal = hexToDecimalColors(hexColor);
      updateColorCodeToDom(colorDecimal);
    }
  }
}

function handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorCodeToDom(color);
  };
}
/***********
 * DOM functions
 **************/

/**
 * @description Generate a dynamic DOM element to show a toast message
 * @param {string} msg
 */
function generateToastMsg(msg) {
  toast = document.createElement('div');
  toast.innerText = msg;
  toast.className = 'toast-message toast-message-slide-in';

  toast.addEventListener('click', function () {
    toast.classList.remove('toast-message-slide-in');
    toast.classList.add('toast-message-slide-out');
    toast.addEventListener('animationend', function () {
      clearToast();
    });
  });

  document.body.appendChild(toast);
}

/**
 * @description Find the checked elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {string | null}
 */
function getCheckedValueFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
}

/**
 * @description Update dom element with calculated color values
 * @param {{red: number, green: number, blue: number}} color
 */
function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  document.getElementById('color-display').style.backgroundColor = hexColor;
  document.getElementById('input-hex').value = hexColor.substring(1);
  document.getElementById('input-rgb').value = rgbColor;
  document.getElementById('color-slider-red').value = color.red;
  document.getElementById('color-slider-red-label').innerText = color.red;

  document.getElementById('color-slider-green').value = color.green;
  document.getElementById('color-slider-green-label').innerText = color.green;

  document.getElementById('color-slider-blue').value = color.blue;
  document.getElementById('color-slider-blue-label').innerText = color.blue;
}

/************
 * Utils
 *************/

/**
 * @description Generate and return an object of three color decimal values
 * @returns {{red: number, green: number, blue: number}}
 */
function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return { red, green, blue };
}

/**
 * @description Take a color object of three decimal alues and return a hexadecimal color code
 * @param {Object} color
 * @param {number} color.red - Red color rgb code 0-255
 * @param {number} color.green - Green color rgb code 0-255
 * @param {number} color.blue - Blue color rgb code 0-255
 * @returns {string} (hex color)
 */
function generateHexColor({ red, green, blue }) {
  /**
   * @param {number} value
   * @returns string
   */
  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

/**
 * @description Take a color object of three decimal alues and return a RGB color code
 * @param {Object} color
 * @param {number} color.red - Red color rgb code 0-255
 * @param {number} color.green - Green color rgb code 0-255
 * @param {number} color.blue - Blue color rgb code 0-255
 * @returns string (rgb format)
 */
function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * @description Convert hex color to decimal colors object
 * @param {object}
 */
function hexToDecimalColors(hex) {
  const red = parseHexToDecimal(hex.slice(0, 2));
  const green = parseHexToDecimal(hex.slice(2, 4));
  const blue = parseHexToDecimal(hex.slice(4));

  return { red, green, blue };
}

function clearToast() {
  toast.remove();
  toast = null;
}

/**
 * @description Validate hex color code
 * @param {string} color
 * @return {boolean}
 */
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

/**
 * @params {string} hexCode
 */
const parseHexToDecimal = (hexCode) => parseInt(hexCode, 16);
