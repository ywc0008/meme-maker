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
ctx.lineWidth = 6;
ctx.lineCap = "round";

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
    mode.innerText = "🎨선으로 그리기";
  } else {
    isFilling = false;
    mode.innerText = "🎨면으로 그리기";
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
  ctx.fillStyle = color.value;
}

destroy.addEventListener("click", onDestroy);

//사진 넣기, 저장
const fileInput = document.querySelector("#file");
const save = document.querySelector("#save");

function addFile(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}
function saveImg() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "저장된 사진.jpg";
  a.click();
}

fileInput.addEventListener("change", addFile);
save.addEventListener("click", saveImg);

//텍스트 넣기, 폰트사이즈 조절
const textInput = document.querySelector("#text");
const fontSize = document.querySelector("#font-size");

function addText(event) {
  if (textInput !== "") {
    ctx.save();
    const text = textInput.value;
    ctx.font = `${fontSize.value}px selif`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    function changeFontSize(event) {
      ctx.font = `${event.target.value} selif`;
    }

    fontSize.addEventListener("change", changeFontSize);
    ctx.restore();
  }
}

canvas.addEventListener("dblclick", addText);
