// Globals
let toast = null;

window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById('root');
  const changeBtn = document.getElementById('change-btn');
  const output = document.getElementById('output');
  const copyBtn = document.getElementById('copy-btn');

  changeBtn.addEventListener('click', function () {
    const bgColor = generateHexColor();
    root.style.backgroundColor = bgColor;
    output.value = bgColor;
  });

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(output.value);

    if (toast !== null) clearToast();

    if (isValidHex(output.value)) generateToastMsg(`${output.value} copied.`);
    else alert('Invalid color code');
  });

  output.addEventListener('keyup', function (e) {
    const color = e.target.value;
    if (color && isValidHex(color)) {
      root.style.backgroundColor = color;
    }
  });
}

function generateHexColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

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
 *
 * @param {string} color
 */
function isValidHex(color) {
  if (color.length !== 7) return false;
  if (color[0] !== '#') return false;
  color = color.substring(1);
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
