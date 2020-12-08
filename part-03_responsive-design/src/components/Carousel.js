function Carousel({ id }) {
    return (
      <div className="carousel" id={id}>
        <div className="carousel-slides">
            <div className="carousel-slider">
                <div className="carousel-slide"></div>
                <div className="carousel-slide"></div>
                <div className="carousel-slide"></div>
                <div className="carousel-slide"></div>
            </div>
        </div>
        <div className="carousel-controls">
            <div className="carousel-prev">Prev</div>
            <div className="carousel-dot-indicators">
                <div className="carousel-dot-indicator"></div>
                <div className="carousel-dot-indicator"></div>
                <div className="carousel-dot-indicator"></div>
                <div className="carousel-dot-indicator"></div>
            </div>
            <div className="carousel-next">Next</div>
        </div>
      </div>
    );
  }
  
  export default Carousel;
  