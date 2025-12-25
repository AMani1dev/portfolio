// export default async function projectLoader({ params }) {
//   const url = "/data/data.json";
//   try {
//     const response = await fetch(url, { method: "GET", cache: "no-cache" });

//     if (!response.ok) {
//       throw new Response(
//         `Failed to load project data. Status: ${response.status}`,
//         {
//           status: response.status,
//           statusText: response.statusText || "Fetch Error",
//         }
//       );
//     }

//     const data = await response.json();

//     if (!Array.isArray(data)) {
//       throw new Response("Invalid data format: Expected an array.", {
//         status: 500,
//         statusText: "Data Format Error",
//       });
//     }

//     const project = data.find((p) => p.id === params.id);

//     if (!project) {
//       throw new Response(`Project with id "${params.id}" not found.`, {
//         status: 404,
//         statusText: "Not Found",
//       });
//     }

//     return { project }; // used in WorkDetails.jsx
//   } catch (err) {
//     if (err instanceof Response) throw err;

//     throw new Response("Unexpected error while loading single project.", {
//       status: 500,
//       statusText: "Unexpected Loader Error",
//     });
//   }
// }








export default async function projectLoader({ params }) {
  // const base = import.meta.env.VITE_BASE_URL || "/";
  const base = import.meta.env.BASE_URL || "/";
  const url = `${base}data/data.json`;

  try {
    const response = await fetch(url, { method: "GET", cache: "no-cache" });

    if (!response.ok) {
      throw new Response(
        `Failed to load project data. Status: ${response.status}`,
        {
          status: response.status,
          statusText: response.statusText || "Fetch Error",
        }
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Response("Invalid data format: Expected an array.", {
        status: 500,
        statusText: "Data Format Error",
      });
    }

    const project = data.find((p) => p.id === params.id);

    if (!project) {
      throw new Response(`Project with id "${params.id}" not found.`, {
        status: 404,
        statusText: "Not Found",
      });
    }

    return { project };
  } catch (err) {
    if (err instanceof Response) throw err;

    throw new Response("Unexpected error while loading single project.", {
      status: 500,
      statusText: "Unexpected Loader Error",
    });
  }
}
