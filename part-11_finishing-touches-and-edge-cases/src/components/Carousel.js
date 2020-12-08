// library imports

import { useEffect } from 'react';
import PropTypes from 'prop-types';

// ----------------------------

// component imports

import CarouselSlides from './CarouselSlides';
import CarouselControls from './CarouselControls';

// ----------------------------

// function imports

import {
  getCarouselSlider,
  getCarouselSlides,
  getCarouselSliderLeft,
  setCarouselSliderLeftOnDrag,
  animateCarouselSlider,
  enlargeCurrentSlide,
  hightlightCurrentDotIndicator,
} from '../vanilla-js/carousel-helper-functions';

// ----------------------------

function Carousel({ id, images, header, subheader }) {
  // global component variables

  let isDragging = false;
  let dragStart = 0;
  let dragDistance = 0;
  let carouselLeft = 0;
  let indexPosition = 0;
  let swipeDirection = '';

  // ----------------------------

  // useEffect for event listeners

  useEffect(() => {
    enlargeCurrentSlide(id, indexPosition, true);
    hightlightCurrentDotIndicator(id, indexPosition);
    const carouselSlider = getCarouselSlider(id);
    carouselSlider.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleWindowResize);
    return () => {
      carouselSlider.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleWindowResize);
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
      handleUpdateIndexPositionOnMouseUp();
      handleSnapCarouselToLeftPosition();
      enlargeCurrentSlide(id, indexPosition);
      hightlightCurrentDotIndicator(id, indexPosition);
    }
  };

  // ----------------------------

  // handle mouse move

  const handleMouseMove = (e) => {
    if (isDragging) {
      dragDistance = e.clientX - dragStart;
      setCarouselSliderLeftOnDrag(id, dragDistance, carouselLeft);
      handleSetSwipeDirection();
    }
  };

  // ----------------------------

  // handle window resize

  const handleWindowResize = () => {
    handleSnapCarouselToLeftPosition(true);
    enlargeCurrentSlide(id, indexPosition, true);
  };

  // ----------------------------

  // handle snap carousel to left position

  const handleSnapCarouselToLeftPosition = (instant = false) => {
    const [carouselSlide] = getCarouselSlides(id);
    const slideWidth = carouselSlide.clientWidth;
    const newLeft = -(slideWidth * indexPosition);
    animateCarouselSlider(id, newLeft, instant, () => {
      carouselLeft = getCarouselSliderLeft(id);
    });
  };

  // ----------------------------

  // handle update index position on mouse up

  const handleUpdateIndexPositionOnMouseUp = () => {
    if (Math.abs(dragDistance) > 50) {
      if (swipeDirection === 'LEFT' && indexPosition < images.length - 1) {
        indexPosition++;
      }
      if (swipeDirection === 'RIGHT' && indexPosition > 0) {
        indexPosition--;
      }
    }
    dragDistance = 0;
  };

  // ----------------------------

  // handle set swipe direction

  const handleSetSwipeDirection = () => {
    if (dragDistance < 0) swipeDirection = 'LEFT';
    if (dragDistance > 0) swipeDirection = 'RIGHT';
  };

  // ----------------------------

  // handle dot indicator click

  const handleDotIndicatorClick = (index) => {
    indexPosition = index;
    handleSnapCarouselToLeftPosition();
    enlargeCurrentSlide(id, indexPosition);
    hightlightCurrentDotIndicator(id, indexPosition);
  };

  // ----------------------------

  // handle next/prev button click

  const handleNextPrevButtonClick = (e) => {
    const { action } = e.target.dataset;
    if (action === 'prev' && indexPosition > 0) {
      indexPosition--;
    }
    if (action === 'next' && indexPosition < images.length - 1) {
      indexPosition++;
    }
    handleSnapCarouselToLeftPosition();
    enlargeCurrentSlide(id, indexPosition);
    hightlightCurrentDotIndicator(id, indexPosition);
  };

  // ----------------------------

  return (
    <div className='carousel' id={id}>
      <h1 className='carousel-header'>{header}</h1>
      <h4 className='carousel-subheader'>{subheader}</h4>
      <CarouselSlides images={images} />
      <CarouselControls
        images={images}
        handleDotIndicatorClick={handleDotIndicatorClick}
        handleNextPrevButtonClick={handleNextPrevButtonClick}
      />
    </div>
  );
}

// handle component proptypes

Carousel.propTypes = {
  id: PropTypes.string,
  images: PropTypes.array,
  header: PropTypes.string,
  subheader: PropTypes.string,
};

// ----------------------------

export default Carousel;
