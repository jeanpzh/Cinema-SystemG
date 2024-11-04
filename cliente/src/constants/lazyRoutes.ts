import { lazy } from "react";

const lazyRoutes = [
  {
    lazyComponent: lazy(() => import("@/pages/Admin/Dashboard")),
    path: "/dashboard",
    children: [
      {
        lazyComponent: lazy(
          () => import("@/pages/Admin/Películas/PeliculasPage")
        ),
        path: "peliculas", // Note: No leading slash for nested routes
      },
      {
        lazyComponent: lazy(
          () => import("@/pages/Admin/Funciones/FuncionesPage")
        ),
        path: "funciones",
      },
    ],
  },
];

export default lazyRoutes;
