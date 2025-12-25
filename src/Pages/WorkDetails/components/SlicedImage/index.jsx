import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const clipStart = [
  "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
  "polygon(66.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",

  "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
  "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
  "polygon(66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",

  "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
  "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
  "polygon(66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
];

const clipEnd = [
  "polygon(0% 0%, 33.33% 0%, 33.33% 33.33%, 0% 33.33%)",
  "polygon(33.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 33.33%)",
  "polygon(66.66% 0%, 100% 0%, 100% 33.33%, 66.66% 33.33%)",

  "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
  "polygon(33.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
  "polygon(66.66% 33.33%, 100% 33.33%, 100% 66.66%, 66.66% 66.66%)",

  "polygon(0% 66.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
  "polygon(33.33% 66.66%, 66.66% 66.66%, 66.66% 100%, 33.33% 100%)",
  "polygon(66.66% 66.66%, 100% 66.66%, 100% 100%, 66.66% 100%)",
];

const SlicedImage = ({ src, width , aspectRatio}) => {

  const wrapperRef = useRef(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const slices = wrapper.querySelectorAll(".slice");

    gsap.set(slices, {
      clipPath: (i) => clipStart[i],
    });

    const order = [
      ["slice-0"],
      ["slice-1", "slice-3"],
      ["slice-2", "slice-4", "slice-6"],
      ["slice-5", "slice-7"],
      ["slice-8"],
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 75%",
      },
    });

    order.forEach((group, step) => {
      tl.to(
        group.map((cls) => wrapper.querySelector(`.${cls}`)),
        {
          clipPath: (i, el) => {
            const idx = [...slices].indexOf(el);
            return clipEnd[idx];
          },
          duration: 0.5,
          ease: "power4.inOut",
          stagger: 0.1,
        },
        step * 0.125
      );
    });
  });

  return (
    <div
      ref={wrapperRef}
      className={`sliced-image grid grid-cols-3 relative mx-auto `}
      style={{width,aspectRatio}}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={`slice slice-${i} absolute inset-0`}
          style={{
            background: `url(${src}) center center/cover no-repeat`,
          }}
        />
      ))}
    </div>
  );
};

export default SlicedImage;
