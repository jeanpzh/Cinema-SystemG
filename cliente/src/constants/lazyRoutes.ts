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
        path: "peliculas",
      },
      {
        lazyComponent: lazy(
          () => import("@/pages/Admin/Funciones/FuncionesPage")
        ),
        path: "funciones",
      },
    ]
  },
  {
    lazyComponent: lazy(() => import("@/pages/Auth/LoginPage")),
    path: "/login"
  }
];

export default lazyRoutes;
