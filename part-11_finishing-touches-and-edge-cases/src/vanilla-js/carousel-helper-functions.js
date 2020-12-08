import { clampNumber } from './helper-functions';
import anime from 'animejs/lib/anime.es.js';

// get carousel slider

const getCarouselSlider = (carouselId) => {
  const carousel = document.getElementById(carouselId);
  const carouselSlider = carousel.querySelector('.carousel-slider');
  return carouselSlider;
};

// ----------------------------

// get carousel slides

const getCarouselSlides = (carouselId) => {
  const carousel = document.getElementById(carouselId);
  const carouselSlides = carousel.querySelectorAll('.carousel-slide');
  return carouselSlides;
};

// ----------------------------

// get carousel slider dot indicators

const getCarouselDotIndicators = (carouselId) => {
  const carousel = document.getElementById(carouselId);
  const dotIndicators = carousel.querySelectorAll('.carousel-dot-indicator');
  return dotIndicators;
};

// ----------------------------

// get carousel slider left

const getCarouselSliderLeft = (carouselId) => {
  const carouselSlider = getCarouselSlider(carouselId);
  const carouselSliderStyles = window.getComputedStyle(carouselSlider);
  const carouselSliderLeft = carouselSliderStyles.getPropertyValue('left');
  const parseLeft = parseInt(carouselSliderLeft, 10);
  return parseLeft;
};

// ----------------------------

// get carousel slider min left

const getCarouselSliderMinLeft = (carouselId) => {
  const carouselSlider = getCarouselSlider(carouselId);
  const [carouselSlide] = getCarouselSlides(carouselId);
  const sliderWidth = carouselSlider.clientWidth;
  const slideWidth = carouselSlide.clientWidth;
  const minLeft = -(sliderWidth - slideWidth);
  return minLeft;
};

// ----------------------------

// set carousel slider left on drag

const setCarouselSliderLeftOnDrag = (
  carouselId,
  dragDistance,
  carouselLeft
) => {
  const carouselSlider = getCarouselSlider(carouselId);
  const minLeft = getCarouselSliderMinLeft(carouselId);
  const clampLeft = clampNumber(dragDistance + carouselLeft, minLeft, 0);
  carouselSlider.style.left = `${clampLeft}px`;
};

// ----------------------------

// handle animate carousel slider

const animateCarouselSlider = (carouselId, newLeft, instant, callback) => {
  const carouselSlider = getCarouselSlider(carouselId);
  anime({
    targets: carouselSlider,
    left: newLeft,
    duration: instant ? 0 : 800,
    easing: 'easeInOutQuad',
    complete() {
      callback();
    },
  });
};

// ----------------------------

// enlarge current slide and shrink others

const enlargeCurrentSlide = (carouselId, indexPosition, instant = false) => {
  const slides = getCarouselSlides(carouselId);
  [...slides].forEach((slide, index) => {
    anime({
      targets: slide,
      scale: index === indexPosition ? 1 : 0.9,
      duration: instant ? 0 : 800,
      easing: 'easeInOutQuad',
    });
  });
};

// ----------------------------

// highlght current dot indicator

const hightlightCurrentDotIndicator = (carouselId, indexPosition) => {
  const dotIndicators = getCarouselDotIndicators(carouselId);
  [...dotIndicators].forEach((dot, index) => {
    if (index === indexPosition) {
      dot.classList.add('current');
    } else {
      dot.classList.remove('current');
    }
  });
};

// ----------------------------

export {
  getCarouselSlider,
  getCarouselSlides,
  getCarouselDotIndicators,
  getCarouselSliderLeft,
  getCarouselSliderMinLeft,
  setCarouselSliderLeftOnDrag,
  animateCarouselSlider,
  enlargeCurrentSlide,
  hightlightCurrentDotIndicator,
};
