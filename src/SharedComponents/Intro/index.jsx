import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Intro = () => {
  const words = [
    "hello",
    "bonjour",
    "hi",
    "hola",
    "ciao",
    "hallo",
    "salut",
    "ola",
  ];

  const textRef = useRef(null);
  const wrapperRef = useRef(null);


  useGSAP(() => {
    
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    gsap.set("body", {overflow : "hidden"})


    words.forEach((word) => {
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.12,
        onComplete: () => (textRef.current.textContent = word),
      })

      .to(textRef.current, {
        opacity: 1,
        duration: 0.12,
      });

    });

    tl.to(textRef.current, { opacity: 0, duration: 0.12 })
     .to(wrapperRef.current, {
        y: "-110vh",
        duration: 1,
        opacity : "0",
      })
    .to("body", {overflowY : "auto"})  
  }, []);

  return (
    <div
    ref={wrapperRef}
      className="intro bg-(--primary-clr) fixed inset-0 z-50 flex justify-center items-center text-white pointer-none select-none "
    >
      <span ref={textRef} className="capitalize text-4xl">
        {words[0]}
      </span>
    </div>
  );
};

export default Intro;
