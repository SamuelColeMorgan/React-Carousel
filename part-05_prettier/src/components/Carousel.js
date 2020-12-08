import CarouselSlides from './CarouselSlides';
import CarouselControls from './CarouselControls';

function Carousel({ id, images }) {
  return (
    <div className='carousel' id={id}>
      <CarouselSlides images={images} />
      <CarouselControls images={images} />
    </div>
  );
}

export default Carousel;
