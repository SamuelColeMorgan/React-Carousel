import CarouselDotIndicator from './CarouselDotIndicator';

function CarouselControls({ images }) {
  // map dot indicators for later render

  const mapDotIndicatorJSX = images.map((image) => (
    <CarouselDotIndicator key={`${image}-dot-indicator`} />
  ));

  // ----------------------------

  return (
    <div className='carousel-controls'>
      <div className='carousel-prev'>Prev</div>
      <div className='carousel-dot-indicators'>{mapDotIndicatorJSX}</div>
      <div className='carousel-next'>Next</div>
    </div>
  );
}

export default CarouselControls;
