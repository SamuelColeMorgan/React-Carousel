// library imports

import PropTypes from 'prop-types';

// ----------------------------

function CarouselSlide({ image }) {
  return (
    <div
      className='carousel-slide'
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
}

// handle component proptypes

CarouselSlide.propTypes = {
  image: PropTypes.string,
};

// ----------------------------

export default CarouselSlide;
