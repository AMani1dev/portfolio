import { Title } from "../../SharedComponents";

const About = () => {
  const base = import.meta.env.VITE_BASE_URL;
  // console.log(base)
  
  return (
    <>
      <div className="mt-40">
        <Title
          title="help<b>i</b>ng other's thrive <br /> in the digit<b>a</b>l world"
          additionClasses={""}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:px-10 gap-5 sm:gap-0 px-5 mt-10 sm:mt-20">
        <div className="w-full  sm:w-1/3 ">
          <span className="max-w-[45ch] sm:max-w-[initial] inline-block">
            I craft portfolios, landing pages, and small web apps tailored to
            each client's needs—blending design, code, and seamless interactions
            to deliver high-quality results.
          </span>

          <span className="text-gray-500 flex gap-2 mt-4">
            Always exploring
          </span>
        </div>

        <div className="w-full  sm:w-7/12 sm:ml-auto flex justify-center">
          {/* <img
            src={"/favicon.png"}
            alt="img"
            className="w-full max-w-[300px] aspect-square"
          /> */}
          <img
  // src={`${import.meta.env.VITE_BASE_URL || "/"}favicon.png`}
  // src={`${import.meta.env.VITE_BASE_URL}favicon.png`}
  src={`${import.meta.env.BASE_URL}favicon.png`}
  alt="img"
  className="w-full max-w-[300px] aspect-square"
/>

        </div>
      </div>

      <div className=" my-10 sm:my-20">
        <Title title="i ca<b>n</b> help you <br /> with" additionClasses={""} />
      </div>

      <div className="font-bold my-10 sm:my-20 mx-auto max-w-[400px] px-3">
        <div className="">
          <hr className="" />

          <h3 className="mb-3 my-4 text-center">development</h3>

          <p className="font-light text-center ">
            building modern websites from scratch that fit seamlessly with
            design, focusing on micro animations, transitions & interaction.
            Building with React JS , tailwind
            <br />
            (& gsap).
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
