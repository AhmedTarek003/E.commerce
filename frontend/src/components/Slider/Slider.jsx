import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { sliderItems } from "../../data";
import "./slider.css";
import { useState } from "react";

const Slider = () => {
  const [swip, setSwip] = useState(0);

  // Handle swiper
  const swipHandler = (type) => {
    if (type === "right") {
      if (swip < sliderItems.length - 1) {
        setSwip(swip + 1);
      }
      if (swip === sliderItems.length - 1) {
        setSwip(0);
      }
    } else if (type === "left") {
      if (swip > 0) {
        setSwip(swip - 1);
      }
      if (swip === 0) {
        setSwip(sliderItems.length - 1);
      }
    }
  };
  return (
    <div className="slider">
      <div className="arrow left" onClick={() => swipHandler("left")}>
        <KeyboardArrowLeft className="arrow-icon" />
      </div>
      <div
        className="wrapper"
        style={{ transform: `translateX(${swip * -100}vw)` }}
      >
        {sliderItems.map((slide) => (
          <div
            className="slide-item"
            key={slide.id}
            style={{ backgroundColor: "#" + slide.bg }}
          >
            <div className="slide-image">
              <img src={slide.img} alt="" />
            </div>
            <div className="slide-info">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-desc">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow right" onClick={() => swipHandler("right")}>
        <KeyboardArrowRight className="arrow-icon" />
      </div>
    </div>
  );
};

export default Slider;
