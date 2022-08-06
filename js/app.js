//캔버스 구현
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 800;
canvas.width = 800;

let isPainting = false;

function onMouseMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function endPainting() {
  isPainting = false;
  if (isFilling) {
    ctx.fill();
  }
  ctx.beginPath();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);

//색 구현
const color = document.querySelector("#color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

function colorChange(event) {
  ctx.fillStyle = event.target.value;
  ctx.strokeStyle = event.target.value;
}
function clickColorOption(event) {
  const clickedColor = event.target.dataset.color;
  ctx.fillStyle = clickedColor;
  ctx.strokeStyle = clickedColor;
  color.value = clickedColor;
}

color.addEventListener("change", colorChange);
colorOptions.forEach((color) =>
  color.addEventListener("click", clickColorOption)
);

//선 굵기 구현
const lineWidth = document.querySelector("#line-width");
ctx.lineWidth = lineWidth.value;

function changeLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

lineWidth.addEventListener("change", changeLineWidth);

//fill, stroke,
const mode = document.querySelector("#mode");
let isFilling = false;

function changeMode() {
  if (isFilling === false) {
    isFilling = true;
    mode.innerText = "🎨면으로 그리기";
  } else {
    isFilling = false;
    mode.innerText = "🎨선으로 그리기";
  }
}

mode.addEventListener("click", changeMode);

//채우기
const fillAll = document.querySelector("#fill-all");

function onFillAll() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

fillAll.addEventListener("click", onFillAll);

//지우개
const eraser = document.querySelector("#eraser");

function onEraser() {
  ctx.strokeStyle = "white";
  isFilling = false;
  mode.innerText = "🎨면으로 그리기";
}

eraser.addEventListener("click", onEraser);

//초기화
const destroy = document.querySelector("#destroy");

function onDestroy() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

destroy.addEventListener("click", onDestroy);
