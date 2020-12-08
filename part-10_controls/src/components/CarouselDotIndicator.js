function CarouselDotIndicator({ handleClick, index }) {
  return (
    <div 
      onClick={() => handleClick(index)}
      className='carousel-dot-indicator'>
    </div>
  );
}

export default CarouselDotIndicator;
