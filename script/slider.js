import image1 from '../src/img/slider_img/1.jpg';
import image2 from '../src/img/slider_img/2.jpg';
import image3 from '../src/img/slider_img/3.jpeg';

    const images = [image1, image2, image3];
    
    let activeImage = 0;
    const sliderPlace = document.querySelector('.slider__img');
    
    const updateSlide = (imageIndex) => {
        sliderPlace.innerHTML = '';
        const img = document.createElement('img'); 
            img.alt = 'slider Image';
            img.className = 'slider__img-item';
            img.src = images[imageIndex];
        sliderPlace.append(img);
    };
    updateSlide(activeImage);
    
    const nextImageGen = () => {
        activeImage = (activeImage + 1) % images.length;
        updateSlide(activeImage);
    }
    
    const prevImageGen = () => {
        activeImage = (activeImage - 1 + images.length) % images.length;
        updateSlide(activeImage);
    }

    // setInterval(() => {
    //     nextImageGen();
    // }, 3000);
    
    document.querySelector('.slider__controls-left').addEventListener('click', prevImageGen);
    document.querySelector('.slider__controls-right').addEventListener('click', nextImageGen);

