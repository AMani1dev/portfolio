// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useStateContext } from "../../context/ContextProvider";

// const Slices = () => {
//   return Array(4)
//     .fill(null)
//     .map((_, index) => (
//       <div key={index} className="bg-(--primary-clr)"></div>
//     ));
// };

// const PageTransition = () => {
//     const { isPageTransition, setIsPageTransition, setActiveMenu} = useStateContext();
//   const gridLayout = "grid grid-cols-4  grow";

//   const targetHrefRef = useRef(null);
//   const delegatedListenerAttached = useRef(false);
//   const navigate = useNavigate();

//   useGSAP(
//     () => {
//       gsap.set(".slices-wrapper__top > div", { y: "-110%" });
//       gsap.set(".slices-wrapper__bottom > div", { y: "110%" });

// const delegatedClickHandler = (e) => {
//   const link = e.target.closest(".page-transition-link");
//   if (!link) return; // ✅ always check first

//   // If it's a menu link, close the menu
//   if (link.classList.contains("menu-link")) setTimeout(() => setActiveMenu(false), 200);

//   e.preventDefault();
//   e.stopPropagation();

//   // targetHrefRef.current = link.getAttribute("href");
//   // setIsPageTransition(true);
//   // console.log(link.getAttribute("href"))
// };

//       if (!delegatedListenerAttached.current) {
//         document.addEventListener("click", delegatedClickHandler, true);
//         delegatedListenerAttached.current = true;
//       }

//       return () => {
//         if (delegatedListenerAttached.current) {
//           document.removeEventListener("click", delegatedClickHandler, true);
//           delegatedListenerAttached.current = false;
//         }
//       };
//     },
//     { dependencies: [] }
//   );

//   useGSAP(
//     () => {
//       if (!isPageTransition) return;

//       const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power4.inOut" } });

//       // 1. Close (cover)
//       tl.to(".slices-wrapper__top > div", { y: 0, stagger: 0.1 })
//         .to(".slices-wrapper__bottom > div", { y: 0, stagger: 0.1 }, "-=0.45");

//       // 2. Navigate after cover
//       tl.add(() => {
//         if (targetHrefRef.current) {
//           window.scrollTo(0, 0);
//           navigate(targetHrefRef.current); // ✅ SPA navigation
//         }
//       });

//       // 3. Reopen (uncover)
//       tl.to(".slices-wrapper__top > div", { y: "-110%", stagger: 0.1 })
//         .to(".slices-wrapper__bottom > div", { y: "110%", stagger: 0.1 }, "-=0.45")
//         .add(() => {
//           setIsPageTransition(false); // reset state after reopen
//         });

//       return () => {
//         tl.kill();
//       };
//     },
//     { dependencies: [isPageTransition] }
//   );

//   return (
//     <div
//       className={`${
//         isPageTransition
//           ? "opacity-100 pointer-events-auto"
//           : "opacity-0 pointer-events-none"
//       } page-transition-wrapper fixed flex flex-col inset-0 z-40 select-none transition-opacity duration-100 ease-in`}
//       aria-hidden={!isPageTransition}
//     >
//       <div className={`${gridLayout} slices-wrapper__top `}>
//         <Slices />
//       </div>

//       <div className={`${gridLayout} slices-wrapper__bottom`}>
//         <Slices />
//       </div>
//     </div>
//   );
// };

// export default PageTransition;



import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const Slices = () => {
  return Array(4)
    .fill(null)
    .map((_, index) => (
      <div key={index} className="bg-(--primary-clr)"></div>
    ));
};

const PageTransition = () => {
  const { isPageTransition, setIsPageTransition, setActiveMenu } =
    useStateContext();

  const gridLayout = "grid grid-cols-4 grow";

  const targetHrefRef = useRef(null);
  const delegatedListenerAttached = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  useGSAP(() => {
    gsap.set(".slices-wrapper__top > div", { y: "-110%" });
    gsap.set(".slices-wrapper__bottom > div", { y: "110%" });

    const delegatedClickHandler = (e) => {
      const link = e.target.closest(".page-transition-link");
      if (!link) return;

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = link.dataset.to;
      if (!target) return;

      if (location.pathname === target) return;

      e.preventDefault();
      e.stopPropagation();

      targetHrefRef.current = target;

      if (link.classList.contains("menu-link")) setTimeout(() => setActiveMenu(false), 200);

      setIsPageTransition(true);
    };

    if (!delegatedListenerAttached.current) {
      document.addEventListener("click", delegatedClickHandler, true);
      delegatedListenerAttached.current = true;
    }

    return () => {
      document.removeEventListener("click", delegatedClickHandler, true);
      delegatedListenerAttached.current = false;
    };
  }, []);

  useGSAP(
    () => {
      if (!isPageTransition || !targetHrefRef.current) return;

      const tl = gsap.timeline({
        defaults: { duration: 0.5, ease: "power4.inOut" },
      });

      // 1️⃣ Cover
      tl.to(".slices-wrapper__top > div", { y: 0, stagger: 0.1 })
        .to(
          ".slices-wrapper__bottom > div",
          { y: 0, stagger: 0.1 },
          "-=0.45"
        )

        // 2️⃣ Navigate (NO basename here)
        .add(() => {
          window.scrollTo(0, 0);
          navigate(targetHrefRef.current);
        })

        // 3️⃣ Uncover
        .to(".slices-wrapper__top > div", { y: "-110%", stagger: 0.1 })
        .to(
          ".slices-wrapper__bottom > div",
          { y: "110%", stagger: 0.1 },
          "-=0.45"
        )
        .add(() => {
          setIsPageTransition(false);
          targetHrefRef.current = null;
        });

      return () => tl.kill();
    },
    { dependencies: [isPageTransition] }
  );

  return (
    <div
      className={`page-transition-wrapper fixed inset-0 z-40 flex flex-col select-none transition-opacity duration-100 ease-in ${
        isPageTransition
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isPageTransition}
    >
      <div className={`${gridLayout} slices-wrapper__top`}>
        <Slices />
      </div>

      <div className={`${gridLayout} slices-wrapper__bottom`}>
        <Slices />
      </div>
    </div>
  );
};

export default PageTransition;
