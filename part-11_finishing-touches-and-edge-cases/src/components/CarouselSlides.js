// library imports

import PropTypes from 'prop-types';

// ----------------------------

// component imports

import CarouselSlide from './CarouselSlide';

// ----------------------------

function CarouselSlides({ images }) {
  // map images for later render

  const mapImageJSX = images.map((image) => (
    <CarouselSlide key={`${image}-slide`} image={image} />
  ));

  // ----------------------------

  return (
    <div className='carousel-slides'>
      <div className='carousel-slider'>{mapImageJSX}</div>
    </div>
  );
}

// handle component proptypes

CarouselSlides.propTypes = {
  images: PropTypes.array,
};

// ----------------------------

export default CarouselSlides;
