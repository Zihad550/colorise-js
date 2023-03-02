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

    if (toast !== null) {
      clearToast();
    }
    generateToastMsg(`${output.value} copied.`);
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
