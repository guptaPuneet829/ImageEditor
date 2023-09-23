let selectImgBtn = document.querySelector(".selectImg button");
let selectInput = document.querySelector(".selectImg input");
let imgSrc = document.querySelector(".demoImg img");
let filterButtons = document.querySelectorAll(".filterIcons button");
let slider = document.querySelector(".slider input");
let filterName = document.querySelector(".filterInfo .name");
let sliderValue = document.querySelector(".filterInfo .value");
let rotateBtns = document.querySelectorAll(".rotateIcons button");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save");

let brightness = 75,
  contrast = 65,
  saturate = 85,
  invert = 0,
  blur = 0,
  rotate = 0,
  flipX = 1,
  flipY = 1;

selectImgBtn.addEventListener("click", () => selectInput.click());
selectInput.addEventListener("change", () => {
  let file = selectInput.files[0];
  if (!file) return;
  imgSrc.src = URL.createObjectURL(file);
  imgSrc.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disabled");
  });
});

filterButtons.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
    filterName.innerText = element.id;
    if (element.id === "brightness") {
      slider.max = "200";
      slider.value = brightness;
      sliderValue.innerText = `${brightness}`;
    } else if (element.id === "contrast") {
      slider.max = "200";
      slider.value = contrast;
      sliderValue.innerText = `${contrast}`;
    } else if (element.id === "saturate") {
      slider.max = "200";
      slider.value = saturate;
      sliderValue.innerText = `${saturate}`;
    } else if (element.id === "invert") {
      slider.max = "100";
      slider.value = invert;
      sliderValue.innerText = `${invert}`;
    } else if (element.id === "blur") {
      slider.max = "100";
      slider.value = blur;
      sliderValue.innerText = `${blur}`;
    }
  });
});

slider.addEventListener("input", () => {
  sliderValue.innerText = `${slider.value}%`;
  let sliderState = document.querySelector(".filterIcons .active");
  if (sliderState.id === "brightness") {
    brightness = slider.value;
  } else if (sliderState.id === "contrast") {
    contrast = slider.value;
  } else if (sliderState.id === "saturate") {
    saturate = slider.value;
  } else if (sliderState.id === "invert") {
    invert = slider.value;
  } else if (sliderState.id === "blur") {
    blur = slider.value;
  }
  imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
});

rotateBtns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id === "rotateLeft") {
      rotate -= 90;
    } else if (element.id === "rotateRight") {
      rotate += 90;
    } else if (element.id === "flipX") {
      flipX = flipX === 1 ? -1 : 1;
    } else if (element.id === "flipY") {
      flipY = flipY === 1 ? -1 : 1;
    }

    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flipX}, ${flipY})`;
  });
});

reset.addEventListener("click", () => {
  brightness = "75";
  saturate = "85";
  contrast = "65";
  invert = "0";
  blur = "0";
  rotate = 0;
  flipX = 1;
  flipY = 1;
  imgSrc.style.transform = `rotate(${rotate}deg) scale(${flipX}, ${flipY})`;
  imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
});

save.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = imgSrc.naturalWidth;
    canvas.height = imgSrc.naturalHeight;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flipX, flipY);
    ctx.drawImage(
      imgSrc,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "download.jpg";
    link.href = canvas.toDataURL();
    link.click();
});