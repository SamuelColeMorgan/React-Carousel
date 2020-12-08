// library imports

import PropTypes from 'prop-types';

// ----------------------------

function CarouselDotIndicator({ handleClick, index }) {
  return (
    <div
      onClick={() => handleClick(index)}
      className='carousel-dot-indicator'
    ></div>
  );
}

// handle component proptypes

CarouselDotIndicator.propTypes = {
  handleClick: PropTypes.func,
  index: PropTypes.number,
};

// ----------------------------

export default CarouselDotIndicator;
