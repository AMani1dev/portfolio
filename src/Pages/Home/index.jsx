import {TextIconsReveal }from "./components";

import {CircleBtn} from "../../SharedComponents";

const Home = () => {
  return (
    <>
      <TextIconsReveal />

      <section className="flex flex-col gap-3 sm:gap-7 sm:flex-row sm:justify-between px-[3vmax] sm:px-10 md:px-20 mt-20 mb-10 ">
        <span className="max-w-[30ch] text-lg sm:text-lg">
          Crafting unique digital experiences that make an impact. Together,
          we'll redefine online presence with innovation and precision—no fluff,
          just results.
        </span>

        <span className="max-w-[20ch]">
          My passion for frontend development & smooth interactions allows me to
          create engaging web experiences.
        </span>
      </section>

      <div className="pr-10 sm:pr-50 flex justify-end mb-50">
        <CircleBtn
          text={"about me"}
          // to="/about"
          to="about"
          backgroundColor="var(--primary-clr)"
          textClr={"text-white"}
        />
      </div>
    </>
  );
};

export default Home;
