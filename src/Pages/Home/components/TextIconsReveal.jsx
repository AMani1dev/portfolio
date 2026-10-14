import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { BsPcDisplayHorizontal } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HEADER_START = 0.3;
const ICONS_END = 0.6;
const TEXT_START = 0.75;

const iconsData = [
  { id: "pc", Icon: BsPcDisplayHorizontal },
  { id: "react", Icon: FaReact },
  { id: "tailwind", Icon: RiTailwindCssFill },
];

const TextSegment = ({ children }) => (
  <span className="text-segment inline-block text-white opacity-0">
    {" "}{children}{" "}
  </span>
);

const IconPlaceholder = () => (
  <span
    aria-hidden="true"
    className="icon-placeholder inline-block h-[50px] w-[50px] align-middle"
  />
);

const AnimatedIcons = () => (
  <div className="animated-icons fixed bottom-5 left-5 right-5 z-10 flex flex-wrap items-center justify-center gap-5">
    {iconsData.map(({ id, Icon }) => (
      <div
        key={id}
        className="animated-icon flex aspect-square w-[50px] shrink-0 items-center justify-center rounded-lg text-2xl"
      >
        <Icon />
      </div>
    ))}
  </div>
);

const AnimatedText = () => (
  <div className="animated-text relative max-w-[35ch] px-3 text-center text-lg font-semibold leading-none sm:px-0 sm:text-2xl sm:font-medium">
    <TextSegment>frontend web developer</TextSegment>
    <IconPlaceholder />

    <TextSegment>creating modern websites with react</TextSegment>
    <IconPlaceholder />

    <TextSegment>powered by bootstrap, gsap &amp; tailwind css</TextSegment>
    <IconPlaceholder />
  </div>
);

const TextIconsReveal = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;

      if (!container) return;

      const hero = container.querySelector(".hero");
      const heroHeader = container.querySelector(".hero-header");
      const iconsWrapper = container.querySelector(".animated-icons");

      const iconElements = gsap.utils.toArray(
        container.querySelectorAll(".animated-icon")
      );

      const placeholders = gsap.utils.toArray(
        container.querySelectorAll(".icon-placeholder")
      );

      const textSegments = gsap.utils.toArray(
        container.querySelectorAll(".text-segment")
      );

      if (
        !hero ||
        !heroHeader ||
        !iconsWrapper ||
        iconElements.length !== placeholders.length
      ) {
        return;
      }

      const clamp = gsap.utils.clamp(0, 1);

      let layout = null;

      // Smooth background transition controlled by scroll progress.
      // A paused tween avoids creating competing tweens on every update.
      const backgroundTween = gsap.to(hero, {
        backgroundColor: "var(--primary-clr)",
        paused: true,
        duration: 0.8,
        ease: "power2.inOut",
      });

      const measureLayout = () => {
        gsap.set(iconsWrapper, { x: 0, y: 0 });
        gsap.set(iconElements, { x: 0, y: 0 });

        const wrapperRect = iconsWrapper.getBoundingClientRect();

        const iconStartCenters = iconElements.map((icon) => {
          const rect = icon.getBoundingClientRect();

          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        });

        const placeholderCenters = placeholders.map((placeholder) => {
          const rect = placeholder.getBoundingClientRect();

          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        });

        layout = {
          wrapperShiftY:
            window.innerHeight / 2 -
            (wrapperRect.top + wrapperRect.height / 2),

          iconStartCenters,
          placeholderCenters,
        };
      };

      const renderProgress = (progress) => {
        if (!layout) return;

        // Phase 1: Move the icon group toward the viewport center.
        const headerProgress = clamp(progress / HEADER_START);

        gsap.set(iconsWrapper, {
          y: layout.wrapperShiftY * headerProgress,
        });

        gsap.set(heroHeader, {
          y: -window.innerHeight * 0.15 * headerProgress,
          opacity: clamp(1 - headerProgress * 2),
        });

        // Phase 2: Move icons vertically, then horizontally.
        const iconProgress = clamp(
          (progress - HEADER_START) /
            (ICONS_END - HEADER_START)
        );

        iconElements.forEach((icon, index) => {
          const start = layout.iconStartCenters[index];
          const target = layout.placeholderCenters[index];

          const deltaX = target.x - start.x;

          const deltaY =
            target.y - start.y - layout.wrapperShiftY + 3;

          const verticalProgress = clamp(iconProgress * 2);

          const horizontalProgress = clamp(
            (iconProgress - 0.5) * 2
          );

          gsap.set(icon, {
            x: deltaX * horizontalProgress,
            y: deltaY * verticalProgress,
          });
        });

        // Phase 3: Reveal text segments in sequence.
        textSegments.forEach((segment, index) => {
          const segmentStart = TEXT_START + index * 0.03;
          const segmentEnd = segmentStart + 0.03;

          const segmentProgress = clamp(
            (progress - segmentStart) /
              (segmentEnd - segmentStart)
          );

          gsap.set(segment, {
            opacity: segmentProgress * 0.7,
          });
        });

        // Smoothly interpolate the background from white to the
        // primary color during the first 20% of the scroll animation.
        const backgroundProgress = clamp(progress / 0.2);

        backgroundTween.progress(backgroundProgress);
      };

      gsap.set(hero, {
        backgroundColor: "white",
        color: "#131313",
      });

      gsap.set(heroHeader, {
        xPercent: -50,
        yPercent: -50,
        y: 0,
        opacity: 1,
      });

      gsap.set(textSegments, { opacity: 0 });
      gsap.set(iconsWrapper, { x: 0, y: 0 });
      gsap.set(iconElements, { x: 0, y: 0 });

      measureLayout();

      const scrollTrigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: () => `+=${window.innerHeight * 5}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,

        onRefreshInit: () => {
          gsap.set(iconsWrapper, { x: 0, y: 0 });
          gsap.set(iconElements, { x: 0, y: 0 });
        },

        onRefresh: (self) => {
          measureLayout();
          renderProgress(self.progress);
        },

        onUpdate: (self) => {
          renderProgress(self.progress);
        },
      });

      renderProgress(scrollTrigger.progress);

      return () => {
        scrollTrigger.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section className="hero relative flex h-screen flex-col items-center justify-center overflow-hidden supports-[height:1svh]:h-svh">
        <div className="hero-header absolute left-1/2 top-[15%] capitalize text-center will-change-[transform,opacity]">
          <h1 className="whitespace-nowrap text-6xl sm:text-7xl">
            mani amine
          </h1>
        </div>

        <AnimatedText />
        <AnimatedIcons />
      </section>
    </div>
  );
};

export default TextIconsReveal;