import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Title = ({ title, additionClasses = "" }) => {
  const wrapperRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(".animated-title__e", {
        opacity: 0,
        x: 10,
        y: 51,
        z: -60,
        rotateY: 60,
        rotateX: -40,
        transformOrigin: "50% 50% -150px",
        willChange: "opacity, transform",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "100 bottom",
            end: "center bottom",
            toggleActions: "play none none reverse",
          },
        })
        .to(".animated-title__e", {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          y: 0,
          x: 0,
          ease: "power2.inOut",
          stagger: 0.02,
        });
    },
    { scope: wrapperRef } 
  );

  return (
    <div
      ref={wrapperRef}
      className={`overflow-hidden  py-4 ${additionClasses} text-3xl `}
    >
      {title.split("<br />").map((line, i) => (
        <div className="flex justify-center px-1 flex-wrap gap-3" key={i}>
          {line.split(" ").map((word, index) => (
            <span
              key={index}
              className="animated-title__e inline-block text-black"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Title;
