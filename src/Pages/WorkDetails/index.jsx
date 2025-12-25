import { useLoaderData } from "react-router-dom";

import { CircleBtn } from "../../SharedComponents";
import { SlicedImage, TextReveal } from "./components";

const WorkDetails = () => {
  const { project } = useLoaderData();
  const base = import.meta.env.BASE_URL;

  return (
    <>
      <h1 className="text-2xl sm:text-5xl text-black text-center mt-40">
        {project.title}
      </h1>

      <div className="mt-20 flex flex-wrap justify-center px-7 gap-10 sm:gap-8 capitalize">
        <div className="w-full max-w-[250px] flex flex-col gap-2">
          <span className="text-gray-500">role</span>
          <hr className="border border-gray-400" />
          <span>development</span>
        </div>
        <div className="w-full max-w-[250px] flex flex-col gap-2">
          <span className="text-gray-500">credits</span>
          <hr className="border border-gray-400" />
          <span>amine mani</span>
        </div>
        <div className="w-full max-w-[250px] flex flex-col gap-2">
          <span className="text-gray-500">location & year</span>
          <hr className="border border-gray-400" />
          <span>{project?.page?.location ?? "N/A"}</span>
        </div>
      </div>

      <div className="pr-5 sm:pr-40 flex justify-end mb-50 mt-10">
        <CircleBtn
          text="live site"
          to={project.page.link}
          textClr="text-white"
          allowTransition={false}
        />
      </div>

      <SlicedImage
        // src={project.card.imgSrc}
        src={`${base}${project.card.imgSrc}`}
        width="min(90vw, 350px)"
        aspectRatio={1 / 1}
      />

      {project?.page?.description && (
        <TextReveal
          paragraph={project.page.description}
          keywords={project?.page?.keywords}
          holderBg="var(--primary-clr)"
          textClr="text-black"
          keywordClr="text-white"
          keywordBg="before:bg-violet-500"
        />
      )}
    </>
  );
};

export default WorkDetails;
