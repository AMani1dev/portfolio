import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useStateContext } from "../../context/ContextProvider";
import styles from "./index.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MenuBtn = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
// console.log(import.meta.env.BASE_URL);

  const handleMenuBtnClick = () => {
    setActiveMenu((prev) => !prev);
  };

  return (
    <div
      className="menu-btn bg-violet-400 fixed top-4 right-4 w-[50px] aspect-square rounded-[50%] flex flex-col justify-center px-3 gap-1 cursor-pointer z-20"
      onClick={handleMenuBtnClick}
    >
      <div className="line border border-white"></div>
      <div className="line border border-white"></div>
    </div>
  );
};

const MenuImg = () => (
  <div
    className={`menu-img ${styles["menu-img"]} hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] aspect-square will-change-[transform,opacity]`}
  >
    <img
      // src="/about/images/profile.webp"
      // src={`${import.meta.env.VITE_BASE_URL}about/images/profile.webp`}
      src={`${import.meta.env.BASE_URL}about/images/profile.webp`}
      alt="menu img"
      loading="lazy"
      className="w-full h-full object-cover"
    />
  </div>
);

const Content = () => {
  const { activeMenu } = useStateContext();
  const menuWrapperRef = useRef(null);
  const linksWrapperRef = useRef(null);
  const tl = useRef(null);
  const cleanupFns = useRef([]);


  const menulinks = [
    { text: "home", to: "/" },
    { text: "about", to: "/about" },
    { text: "work", to: "/work" },
    { text: "contact", to: "/contact" },
  ];


const MenuLinks = () =>
    menulinks.map((link) => (
      <div
        className="relative will-change-transform overflow-hidden"
        key={link.text}
      >
        <NavLink
          to={link.to}

  data-to={link.to} // 👈 raw route (no basename)

          className={({ isActive }) =>
            `relative inline-block overflow-hidden page-transition-link menu-link ${
              isActive ? "text-violet-400" : "text-white"
            }`
          }
        >
          <span className="visible-text">{link.text}</span>
          
          {typeof window !== "undefined" && window.innerWidth > 1000 && (
            <span className="absolute top-0 left-0 hidden-text">
              {link.text}
            </span>
          )}

        </NavLink>
      </div>
));



  useGSAP(
    () => {
      const selector = gsap.utils.selector(menuWrapperRef);
      const menuWrapper = menuWrapperRef.current;
      const linksWrapper = linksWrapperRef.current;
      const paragraphs = selector("p");
      const menuLinks = selector(".menu-link");
      const img =
        typeof window !== "undefined" && window.innerWidth > 1000
          ? selector(".menu-img")
          : null;

      // Reset states before any animation
      gsap.set(menuWrapper, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });
      gsap.set(paragraphs, { y: "-100%", opacity: 0 });
      if (img && img.length) gsap.set(img, { scale: 0.45, opacity: 0 });

      // Initialize timeline only once
      if (!tl.current) {
        tl.current = gsap.timeline({
          defaults: { ease: "expo.inOut" },
          paused: true,
        });

        tl.current
          .to(menuWrapper, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power4.out",
          })
          .to(
            paragraphs,
            {
              y: "0%",
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
            },
            "-=0.9"
          );

        if (img && img.length) {
          tl.current.to(img, { scale: 1, opacity: 1 }, "-=0.7");
        }
      }

      // Desktop hover + mouse follow effects
      const setupDesktopEffects = () => {
        if (!menuLinks?.length) return;

        menuLinks.forEach((link) => {
          const visible = link.querySelector(".visible-text");
          const hidden = link.querySelector(".hidden-text");
          if (!visible || !hidden) return;

          const visibleSplit = new SplitText(visible, { type: "chars" });
          const hiddenSplit = new SplitText(hidden, { type: "chars" });

          gsap.set(hiddenSplit.chars, { y: "110%" });

          const onEnter = () => {
            gsap.to(visibleSplit.chars, {
              y: "-110%",
              stagger: 0.03,
              duration: 0.4,
              ease: "power2.out",
            });
            gsap.to(hiddenSplit.chars, {
              y: "0%",
              stagger: 0.03,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const onLeave = () => {
            gsap.to(visibleSplit.chars, {
              y: "0%",
              stagger: 0.03,
              duration: 0.4,
              ease: "power2.inOut",
            });
            gsap.to(hiddenSplit.chars, {
              y: "110%",
              stagger: 0.03,
              duration: 0.4,
              ease: "power2.inOut",
            });
          };

          link.addEventListener("mouseenter", onEnter);
          link.addEventListener("mouseleave", onLeave);

          cleanupFns.current.push(() => {
            link.removeEventListener("mouseenter", onEnter);
            link.removeEventListener("mouseleave", onLeave);
            visibleSplit.revert();
            hiddenSplit.revert();
          });
        });

        const handleMouseMove = (e) => {
          if (!linksWrapper) return;
          const { width } = linksWrapper.getBoundingClientRect();
          const mouseX = e.clientX;
          const maxShift = Math.max(0, width - window.innerWidth);
          const shiftFactor = 1.15;
          let targetX = -mouseX * shiftFactor;
          targetX = Math.max(-maxShift, Math.min(0, targetX));

          gsap.to(linksWrapper, {
            x: targetX,
            duration: 0.4,
            ease: "power3.out",
          });
        };

        linksWrapper.addEventListener("mousemove", handleMouseMove);
        cleanupFns.current.push(() =>
          linksWrapper.removeEventListener("mousemove", handleMouseMove)
        );
      };

      if (activeMenu) {
        tl.current.play();

        if (typeof window !== "undefined" && window.innerWidth > 1000) {
          setupDesktopEffects();
        }
      } else {
        tl.current.reverse().then(() => {
          gsap.to(linksWrapper, {
            x: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        });

        // Cleanup all listeners + resets
        cleanupFns.current.forEach((fn) => fn());
        cleanupFns.current = [];
      }
    },
    { dependencies: [activeMenu], scope: menuWrapperRef }
  );

  // Full cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupFns.current.forEach((fn) => fn());
      if (tl.current) {
        tl.current.kill();
        tl.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`${styles["menu-wrapper"]} fixed top-0 left-0 w-screen h-screen bg-[var(--primary-clr)] text-white flex justify-between items-start pt-20 flex-wrap text-center px-10 sm:px-10 md:px-15 overflow-hidden z-10 will-change-[clip-path]`}
      ref={menuWrapperRef}
    >
      <div className="menu-col mt-5 sm:mt-0">
        <p className="font-semibold text-gray-500">Amine Mani</p>
        <p>Frontend Developer</p>
      </div>

      <div className="menu-col mt-5 sm:mt-0 sm:text-end">
        <p className="uppercase text-gray-500">goal</p>
        <p>money</p>
      </div>

      <MenuImg />

      <div
        className={`${styles["menu-links"]} absolute bottom-0 flex flex-col ml-7 sm:ml-10 md:ml-15 mb-35 gap-5 sm:gap-15 text-4xl sm:text-5xl md:text-[5vw] capitalize`}
        ref={linksWrapperRef}
      >
        <MenuLinks />
      </div>
    </div>
  );
};

const Menu = () => (
  <>
    <MenuBtn />
    <Content />
  </>
);

export default Menu;
