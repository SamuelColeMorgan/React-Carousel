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

export default CarouselSlide;
