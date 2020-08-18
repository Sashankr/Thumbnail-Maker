const bgInput = document.getElementById("bgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const epNumSelector = document.getElementById("epNumSelector");
const hcLogoToggler = document.getElementById("hcLogoToggler");
const previewText = document.getElementById("preview-text");
const downloader = document.getElementById("downloader");
const downloadShow = document.getElementById("downloadShow");
const hc7Logo = new Image();
hc7Logo.src =
  "https://hermit-tools.github.io/Thumbnail-Maker/Resources/Hermitcraft Logos/HC7 Logo.png";
hc7Logo.crossOrigin = "Anonymous";

// Cookies Stuff
let epNumValueFromCookie;

downloader.addEventListener("click", () => {
  document.cookie = `epNumCookie=${epNumSelector.value}`;
});

if (document.cookie.length === 0) {
  epNumValueFromCookie = "";
} else {
  epNumValueFromCookie = document.cookie.split("=")[1];
  epNumSelector.value = Number(epNumValueFromCookie) + 1;
}

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}

function addBgImage() {
  let bgImage = new Image();
  bgImage.src = URL.createObjectURL(bgInput.files[0]);
  bgImage.onload = () => {
    ctx.drawImage(bgImage, 0, 0, 1920, 1080);
    hcLogoToggler.checked ? hcLogo() : null
    epNumSelector.value.length === 0 ? null : episodeNum()
  }
}

function episodeNum() {
  let epNum = epNumSelector.value;

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 12;
  ctx.font = "1000 401px Tahoma";
  ctx.textBaseline = "bottom";

  ctx.save();
  ctx.scale(1.05, 0.98);
  ctx.fillText(epNum, 15, 1120);
  ctx.strokeText(epNum, 15, 1120);
  ctx.restore();
  
  ctx.fill();
  ctx.stroke();
}

function hcLogo() {    
    ctx.drawImage(hc7Logo, 15.7, 40, 1887.5, 244);
}

function process() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  bgInput.files.length === 0 ? (
    hcLogoToggler.checked ? hcLogo() : null,
    epNumSelector.value.length === 0 ? null : episodeNum()
  ) : addBgImage()
}

function finishEditing() {
  downloadShow.style.opacity = "1";
  setTimeout(() => {
    downloadShow.style.opacity = "0";
  }, 5000);

  downloader.download = `Ep${epNumSelector.value} HC7 Cub's Contraption.jpg`;
  downloader.href = canvas
    .toDataURL("image/png")
}
