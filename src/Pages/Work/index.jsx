// import { Title } from "../../SharedComponents";
// import { Link, useLoaderData } from "react-router-dom";

// const Cards = ({ projectsData }) => {
// const base = import.meta.env.BASE_URL;

//   return projectsData.map((project, i) => {
//     return (
//       <Link
//         to={`${project.id}`}
//         className="max-w-[350px] aspect-square page-transition-link inline-block p-2"
//         key={i}
//       >
//         <div className=" text-gray-900 text-xl">
//           <img
//             // src={project?.card?.imgSrc}
//             src={`${base}${project?.card?.imgSrc}`}
//             alt="card img"
//             className="w-full aspect-square "
//           />

//           <div className="">
//             <span className="block  font-medium capitalize mt-3 mb-1">
//               {project?.title}
//             </span>

//             <hr className="my-3 border-gray-300" />
//               <span>{project?.card?.yearCreated}</span>
//           </div>
//         </div>
//       </Link>
//     );
//   });
// };

// const Work = () => {
//   // const data = useLoaderData();
//   // console.log(data)
//   // const projectsData = data.projects; 
//   // console.log(projectsData)

//   const {projects} = useLoaderData();

//   return (
//     <>
//       <div className="mt-40">
//         <Title
//           title="creat<b>i</b>ng next level <br /> web<b>s</b>ites"
//           additionClasses=""
//         />
//       </div>

//       <section className="flex justify-center flex-wrap gap-10 my-20 p-3">
//         {/* <Cards projectsData={projectsData} /> */}
//         <Cards projectsData={projects} />
//       </section>
//     </>
//   );
// };

// export default Work;





import { Title } from "../../SharedComponents";
import { Link, useLoaderData } from "react-router-dom";

const Cards = ({ projectsData }) => {
  const base = import.meta.env.BASE_URL;
console.log(`base = > ${base}`)
// import.meta.env.BASE_URL

return projectsData.map((project, i) => {
    console.log(`project.id = > ${project.id}`)
    return (
      <Link
        to={`${project.id}`}
        className="max-w-[350px] aspect-square page-transition-link inline-block p-2"
        key={i}
      >
        <div className="text-gray-900 text-xl">
          <img
            src={`${base}${project?.card?.imgSrc}`}
            alt="card img"
            className="w-full aspect-square"
          />

          <div>
            <span className="block font-medium capitalize mt-3 mb-1">
              {project?.title}
            </span>

            <hr className="my-3 border-gray-300" />

            <span>{project?.card?.yearCreated}</span>
          </div>
        </div>
      </Link>
    );
  });
};

const Work = () => {
  const { projects } = useLoaderData();

  return (
    <>
      <div className="mt-40">
        <Title
          title="creat<b>i</b>ng next level <br /> web<b>s</b>ites"
          additionClasses=""
        />
      </div>

      <section className="flex justify-center flex-wrap gap-10 my-20 p-3">
        <Cards projectsData={projects} />
      </section>
    </>
  );
};

export default Work;
