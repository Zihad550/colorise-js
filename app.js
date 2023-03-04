// Globals
let toast = null;

window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById('root');
  const changeBtn = document.getElementById('change-btn');
  const output = document.getElementById('output');
  const output2 = document.getElementById('output2');
  const copyBtn = document.getElementById('copy-btn');

  changeBtn.addEventListener('click', function () {
    const color = generateColorDecimal();
    const bgColorHEX = generateHexColor(color);
    const bgColorRGB = generateRGBColor(color);
    root.style.backgroundColor = bgColorHEX;
    output.value = bgColorHEX.substring(1);
    output2.value = bgColorRGB;
  });

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(`#${output.value}`);

    if (toast !== null) clearToast();

    if (isValidHex(output.value)) generateToastMsg(`#${output.value} copied.`);
    else alert('Invalid color code');
  });

  output.addEventListener('keyup', function (e) {
    const color = e.target.value;
    if (color) {
      output.value = color.toUpperCase();
      if (isValidHex(color)) {
        root.style.backgroundColor = `#${color}`;
      }
    }
  });
}

function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return { red, green, blue };
}

/**
 *
 * @param {{red: number, green: number, blue: number}} color
 * @returns string (hex color)
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
 *
 * @param {{red: string, green: string, blue: string}} color
 * @returns string (rgb format)
 */
function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
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

function clearToast() {
  toast.remove();
  toast = null;
}

/**
 * @param {string} color
 */
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
