import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import RootLayout from "./Layout/RootLayout";
import WorkLayout from "./Layout/WorkLayout";
import ContactLayout from "./Layout/ContactLayout";

import projectsLoader from "./loaders/projectsLoader";
import projectLoader from "./loaders/projectLoader";

import Home from "./pages/Home"; 


const About = lazy(() => import("./pages/About"));

const Contact = lazy(() => import("./pages/Contact"));
const Success = lazy(() => import("./pages/Success"));
const ErrorContact = lazy(() => import("./Pages/ErrorContact"));

const Work = lazy(() => import("./pages/Work"));
const WorkDetails = lazy(() => import("./pages/WorkDetails"));


const Loader = () => {
  return (
<div className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
aspect-square w-8 flex justify-center items-center text-yellow-700
absolute top-1/2 left-1/2 -translate-1/2
"></div>
  )
}
const LazyPage = (Page) => (
  <Suspense fallback={<Loader/>}>
    <Page />
  </Suspense>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <Home /> }, 

//       { 
//         path: "about", 
//         element: LazyPage(About), 
//       },
//       { 
//         path: "contact", 
//         element: <ContactLayout/>,
//         children: [
//           { index : true , element : LazyPage(Contact)} ,
//           { path : "success" , element : LazyPage(Success)} ,
//           { path : "error" , element : LazyPage(ErrorContact)} ,
//         ] 
//       },

//       {
//         path: "work",
//         element: <WorkLayout />, 
//         children: [
//           { index: true, element: LazyPage(Work), loader: projectsLoader,},
//           {path: ":id",element: LazyPage(WorkDetails),loader: projectLoader,},
//         ],
//       },
//     ],
//   },
// ]
// ,{
//   basename : "/portfolio/"
// }

// );

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },

        {
          path: "about",
          element: LazyPage(About),
        },

        {
          path: "contact",
          element: <ContactLayout />,
          children: [
            { index: true, element: LazyPage(Contact) },
            { path: "success", element: LazyPage(Success) },
            { path: "error", element: LazyPage(ErrorContact) },
          ],
        },

        {
          path: "work",
          element: <WorkLayout />,
          children: [
            {
              index: true,
              element: LazyPage(Work),
              loader: projectsLoader,
            },
            {
              path: ":id",
              element: LazyPage(WorkDetails),
              loader: projectLoader,
            },
          ],
        },
      ],
    },
  ],
  // {
  //   basename: "/portfolio",
  // }
  {
    basename: "/portfolio/",
  }
);


export default router;