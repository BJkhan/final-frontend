import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sliders = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get('api/api/slides');
        setSlides(response.data.slides);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const initializeCarousel = () => {
      const carouselElement = document.getElementById('carouselExampleControls');
      if (carouselElement) {
        new window.bootstrap.Carousel(carouselElement, {
          interval: 3000 // Adjust the interval time in milliseconds as needed
        });
      }
    };

    initializeCarousel();
  }, [slides]);

  return (
    <div className="container mb-3">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={slide._id}>
              <img src={slide.url} className="d-block w-100" alt={slide.caption} />
              <div className="carousel-caption">
                <h5>{slide.caption}</h5>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Sliders;
