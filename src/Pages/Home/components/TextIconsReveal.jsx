import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

import { BsPcDisplayHorizontal } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

const iconsData = [
  { src: <BsPcDisplayHorizontal/> },
  { src: <FaReact /> },
  { src: <RiTailwindCssFill/> },
];

const AniamtedIcons = () => (
  <div className="animated-icons fixed bottom-5  left-5 right-5 rounded-lg flex flex-wrap items-center justify-center gap-5 will-change-transform">
    {iconsData.map((icon, i) => (
      <div
        key={i}
        className={`animated-icon icon-${
          i + 1
        }  w-[50px] aspect-square flex justify-center items-center rounded-lg will-change-transform text-2xl`}
      >
        {icon.src}
      </div>
    ))}
  </div>
);

const AnimatedText = () => {
  const TextSegment = ({ text }) => {
    return <span className="text-segment text-white opacity-0"> {text} </span>;
  };

  const IconPlaceholder = () => {
    return (
      <div className="icon-placeholder w-[50px] aspect-square inline-block will-change-transform align-middle">
        {/* invisible */}
      </div>
    );
  };

  return (

    <div className="animated-text text-lg sm:text-2xl px-3 sm:px-0 max-w-[35ch] font-semibold sm:font-medium relative text-center leading-none">



      <TextSegment text={"frontend web developer"} />
      <IconPlaceholder />


<TextSegment text={"creating modern websites with react"} />
      <IconPlaceholder />

<TextSegment text={"powered by bootstrap, gsap & tailwind css"} />
      <IconPlaceholder />


    </div>
  );
};

const TextIconsReveal = () => {
useGSAP(() => {
  const iconsWrapper = document.querySelector(".animated-icons");
  const iconElements = document.querySelectorAll(".animated-icon");
  const placeholders = document.querySelectorAll(".icon-placeholder");
  const heroHeader = document.querySelector(".hero-header");

    const textSegments = document.querySelectorAll(".text-segment");

  const animationEnd = window.innerHeight * 5;

  let startCenters = null;
  const targetCenters = Array.from(placeholders).map(holder => {
    const rect = holder.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: `+=${animationEnd}px`,
    pin: true,
    pinSpacing: true,
    scrub: true,
    onUpdate: (self) => {
      const originalProgress = self.progress;

      gsap.to(".hero", {
        // backgroundColor : originalProgress <= 0.2 ? "white" : "#131313",
        backgroundColor : originalProgress <= 0.2 ? "white" : "var(--primary-clr)",
        color : originalProgress <= 0.2 ? "#131313" : "white",
      })

      if (originalProgress <= 0.3) {
        const translateProgress = originalProgress / 0.3;
        const translateYVal = -window.innerHeight * 0.3 * translateProgress;

        const centerPageY = Math.round(window.innerHeight / 2);
        const iconsWrapperRect = iconsWrapper.getBoundingClientRect();
        const iconsWrapperY = Math.round(
          iconsWrapperRect.top + iconsWrapperRect.height
        );

        const targetCenterY = centerPageY - iconsWrapperY;

        gsap.to(heroHeader, {
          y: translateYVal * 0.5,
          opacity: 1 - translateProgress * 2,
        });

        gsap.to(iconsWrapper, {
          y: targetCenterY * translateProgress * 4,
        });

      }

else if (originalProgress <= 0.6) {
  const moveProgress = (originalProgress - 0.3) / 0.3;

  if (!startCenters) {
    startCenters = Array.from(iconElements).map(icon => {
      const rect = icon.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
  }

  iconElements.forEach((icon, i) => {
    const startCenter = startCenters[i];
    const targetCenter = targetCenters[i];

    const moveX = targetCenter.x - startCenter.x;
    const moveY = (targetCenter.y - startCenter.y) + 3; // ✅ adjust 7px lower

    let currentX = 0;
    let currentY = 0;

    if (moveProgress <= 0.5) {
      const verticalProgress = moveProgress / 0.5;
      currentY = moveY * verticalProgress;
    } else {
      const horizontalProgress = (moveProgress - 0.5) / 0.5;
      currentY = moveY;
      currentX = moveX * horizontalProgress;
    }

    gsap.set(icon, {
      x: currentX,
      y: currentY,
    });
  });
}else {

textSegments.forEach((item, i) => {
  const segmentStart = 0.75 + i * 0.03;   
  const segmentEnd   = segmentStart + 0.03;

  const segmentProgress = gsap.utils.mapRange(
    segmentStart,
    segmentEnd,
    0,
    1,
    originalProgress
  );

  const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

  gsap.set(item, {
    opacity: clampedProgress * .7,
  });
});


}


    },
  });
});


  return (
    <>
      <section
        className="hero flex flex-col justify-center items-center h-screen supports-[height:1svh]:h-svh relative overflow-hidden transition-[background-color] duration-300 ease-linear"
      >
        <div className="hero-header capitalize text-center absolute top-[15%] left-1/2 -translate-1/2 will-change-[transform,opacity]">
          <h1 className="text-6xl sm:text-7xl ">
            mani amine 
          </h1>
        </div>

        <AnimatedText />
        <AniamtedIcons />
      </section>
    </>
  );
};

export default TextIconsReveal;
