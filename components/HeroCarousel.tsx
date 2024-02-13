"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImage = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "SmarWatch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "air fryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel select-none">
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={2000}
        >
        {heroImage.map((hero, index) => (
          <Image
            key={index}
            src={hero.imgUrl}
            alt={hero.alt}
            width={480}
            height={480}
          />
        ))}
      </Carousel>
      <Image
        src={"/assets/icons/hand-drawn-arrow.svg"}
        alt="hand-drawn-arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute bottom-0 -left-[15%]"
      />
    </div>
  );
};

export default HeroCarousel;
