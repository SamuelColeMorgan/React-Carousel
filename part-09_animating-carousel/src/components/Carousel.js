import { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

import CarouselSlides from './CarouselSlides';
import CarouselControls from './CarouselControls';

function Carousel({ id, images, header, subheader }) {
  // global component variables

  let isDragging = false;
  let dragStart = 0;
  let carouselLeft = 0;
  let indexPosition = 0;
  let swipeDirection = '';

  // ----------------------------

  // useEffect for event listeners

  useEffect(() => {
    enlargeCurrentSlide(true);
    const carouselSlider = getCarouselSlider();
    carouselSlider.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      carouselSlider.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------

  // handle mouse down

  const handleMouseDown = (e) => {
    isDragging = true;
    dragStart = e.clientX;
  };

  // ----------------------------

  // handle mouse up

  const handleMouseUp = () => {
    if (isDragging) {
      isDragging = false;
      updateIndexPosition();
      snapCarouselLeftOnMouseUp();
      enlargeCurrentSlide();
    }
  };

  // ----------------------------

  // handle mouse move

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dragDistance = e.clientX - dragStart;
      setCarouselSliderLeftOnDrag(dragDistance);
      setSwipeDirection(dragDistance);
    }
  };

  // ----------------------------

  // get carousel slider

  const getCarouselSlider = () => {
    const carousel = document.getElementById(id);
    const carouselSlider = carousel.querySelector('.carousel-slider');
    return carouselSlider;
  };

  // ----------------------------

  // get carousel slides

  const getCarouselSlides = () => {
    const carousel = document.getElementById(id);
    const carouselSlides = carousel.querySelectorAll('.carousel-slide');
    return carouselSlides;
  };

  // ----------------------------

  // get carousel slider left

  const getCarouselSliderLeft = () => {
    const carouselSlider = getCarouselSlider();
    const carouselSliderStyles = window.getComputedStyle(carouselSlider);
    const carouselLeft = carouselSliderStyles.getPropertyValue('left');
    const parseLeft = parseInt(carouselLeft, 10);
    return parseLeft;
  };

  // ----------------------------

  // get carousel slider min left

  const getCarouselSliderMinLeft = () => {
    const carouselSlider = getCarouselSlider();
    const [carouselSlide] = getCarouselSlides();
    const sliderWidth = carouselSlider.clientWidth;
    const slideWidth = carouselSlide.clientWidth;
    const minLeft = -(sliderWidth - slideWidth);
    return minLeft;
  };

  // ----------------------------

  // clamp carousel slider between a min and max left value

  const clampCarouselLeft = (value, min, max) => {
    if (value >= max) return max;
    if (value <= min) return min;
    return value;
  };

  // ----------------------------

  // set carousel slider left on drag

  const setCarouselSliderLeftOnDrag = (dragDistance) => {
    const carouselSlider = getCarouselSlider();
    const minLeft = getCarouselSliderMinLeft();
    const clampLeft = clampCarouselLeft(
      dragDistance + carouselLeft,
      minLeft,
      0
    );
    carouselSlider.style.left = `${clampLeft}px`;
  };

  // ----------------------------

  // snap carousel left on mouse up

  const snapCarouselLeftOnMouseUp = (instant = false) => {
    const carouselSlider = getCarouselSlider();
    const [carouselSlide] = getCarouselSlides();
    const slideWidth = carouselSlide.clientWidth;
    const newLeft = -(slideWidth * indexPosition);
    anime({
      targets: carouselSlider,
      left: newLeft,
      duration: instant ? 0 : 800,
      easing: 'easeInOutQuad',
      complete() {
        carouselLeft = getCarouselSliderLeft();
      }
    });
  };

  // ----------------------------

  // update index position

  const updateIndexPosition = () => {
    if (swipeDirection === 'LEFT' && indexPosition < images.length - 1) {
      indexPosition++;
    }
    if (swipeDirection === 'RIGHT' && indexPosition > 0) {
      indexPosition--;
    }
  };

  // ----------------------------

  // set swipe direction

  const setSwipeDirection = (dragDistance) => {
    if (dragDistance < 0) swipeDirection = 'LEFT';
    if (dragDistance > 0) swipeDirection = 'RIGHT';
  };

  // ----------------------------

  // enlarge current slide and shrink others

  const enlargeCurrentSlide = (instant = false) => {
    const slides = getCarouselSlides();
    [...slides].forEach((slide, index) => {
      anime({
        targets: slide,
        scale: index === indexPosition ? 1 : 0.9,
        duration: instant ? 0 : 800,
        easing: 'easeInOutQuad',
      });
    });
  }

  // ----------------------------

  return (
    <div className='carousel' id={id}>
      <h1 className='carousel-header'>{header}</h1>
      <h4 className='carousel-subheader'>{subheader}</h4>
      <CarouselSlides images={images} />
      <CarouselControls images={images} />
    </div>
  );
}

export default Carousel;
