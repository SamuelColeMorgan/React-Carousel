import { useEffect } from 'react';
import CarouselSlides from './CarouselSlides';
import CarouselControls from './CarouselControls';

function Carousel({ id, images, header, subheader }) {
  // global component variables

  let isDragging = false;
  let dragStart = 0;
  let carouselLeft = 0;

  // ----------------------------

  // useEffect for event listeners

  useEffect(() => {
    const carouselSlider = getCarouselSlider();
    carouselSlider.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      carouselSlider.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
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
    if(isDragging) {
      isDragging = false;
      carouselLeft = getCarouselSliderLeft();
    }
  };

  // ----------------------------

  // handle mouse move

  const handleMouseMove = (e) => {
    if(isDragging) {
      const dragDistance = e.clientX - dragStart;
      const carouselSlider = getCarouselSlider();
      carouselSlider.style.left = `${dragDistance + carouselLeft}px`;
    }
  };

  // ----------------------------

  // get carousel slider 

  const getCarouselSlider = () => {
    const carousel = document.getElementById(id);
    const carouselSlider = carousel.querySelector('.carousel-slider');
    return carouselSlider;
  }

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
