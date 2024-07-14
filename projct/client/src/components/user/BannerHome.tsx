import React from "react";
import { Carousel } from "react-bootstrap";

export default function BannerHome() {
  return (
    <div>
      <div>
        <Carousel data-bs-theme='dark'>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img1.jpg?v=1369'
              alt='First slide'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img2.jpg?v=1369'
              alt='Second slide'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img3.jpg?v=1369'
              alt='Third slide'
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <br />
    </div>
  );
}
