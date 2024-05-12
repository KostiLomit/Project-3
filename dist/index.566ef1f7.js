const images = [
    "1.jpg",
    "2.jpg",
    "3.jpeg"
];
let activeImage = 0;
const sliderPlace = document.querySelector(".slider__img");
const newSlide = ()=>{
    const img = document.createElement("img");
    img.alt = "#";
    img.src = "../src/img/slider_img/" + images[activeImage];
    img.className = "slider__img-item";
    sliderPlace.append(img);
};
newSlide();
function f02() {
    const pathToFile = "./";
}

//# sourceMappingURL=index.566ef1f7.js.map
