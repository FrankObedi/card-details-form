import React from "react";
import mobileBg from "../../assets/images/bg-main-mobile.png";
import desktopBg from "../../assets/images/bg-main-desktop.png";
import "./cardui.css";

export default function CardUI() {
  return (
    <section className="card-ui-container">
      <picture className="card-ui-background">
        <source srcSet={desktopBg} media="(min-width: 600px)" />
        <img src={mobileBg}></img>
      </picture>
      <div className="card-front">
        <div className="card-number">
          <p>0000</p>
          <p>0000</p>
          <p>0000</p>
          <p>0000</p>
        </div>
        <div className="card-owner">
          <p>Jane Appleseed</p>
          <p>
            <span>00</span>/00
          </p>
        </div>
      </div>
      <div className="card-back"></div>
    </section>
  );
}
