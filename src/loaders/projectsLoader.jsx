// export default async function projectsLoader() {
//   const url = "/data/data.json";

//   try {
//     const response = await fetch(url, { method: "GET", cache: "no-cache" });

//     if (!response.ok) {
//       throw new Response(
//         `Failed to load projects data. Status: ${response.status}`,
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

//     return { projects: data }; // used in Work.jsx
//   } catch (err) {
//     if (err instanceof Response) throw err;

//     throw new Response("Unexpected error while loading projects.", {
//       status: 500,
//       statusText: "Unexpected Loader Error",
//     });
//   }
// }










export default async function projectsLoader() {
  // const base = import.meta.env.VITE_BASE_URL || "/";
  const base = import.meta.env.BASE_URL || "/";
  const url = `${base}data/data.json`;

  try {
    const response = await fetch(url, { method: "GET", cache: "no-cache" });

    if (!response.ok) {
      throw new Response(
        `Failed to load projects data. Status: ${response.status}`,
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

    return { projects: data };
  } catch (err) {
    if (err instanceof Response) throw err;

    throw new Response("Unexpected error while loading projects.", {
      status: 500,
      statusText: "Unexpected Loader Error",
    });
  }
}
