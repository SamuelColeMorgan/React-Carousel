// library imports

import PropTypes from 'prop-types';

// ----------------------------

// component imports

import CarouselDotIndicator from './CarouselDotIndicator';

// ----------------------------

function CarouselControls({
  images,
  handleDotIndicatorClick,
  handleNextPrevButtonClick,
}) {
  // map dot indicators for later render

  const mapDotIndicatorJSX = images.map((image, index) => (
    <CarouselDotIndicator
      key={`${image}-dot-indicator`}
      index={index}
      handleClick={handleDotIndicatorClick}
    />
  ));

  // ----------------------------

  return (
    <div className='carousel-controls'>
      <div
        className='carousel-prev'
        data-action='prev'
        onClick={handleNextPrevButtonClick}
      >
        Prev
      </div>
      <div className='carousel-dot-indicators'>{mapDotIndicatorJSX}</div>
      <div
        className='carousel-next'
        data-action='next'
        onClick={handleNextPrevButtonClick}
      >
        Next
      </div>
    </div>
  );
}

// handle component proptypes

CarouselControls.propTypes = {
  images: PropTypes.array,
  handleDotIndicatorClick: PropTypes.func,
  handleNextPrevButtonClick: PropTypes.func,
};

// ----------------------------

export default CarouselControls;
