import { Outlet } from "react-router-dom";

// Outlet : Cuando se renderiza un componente con un <Outlet />, se renderiza el componente hijo correspondiente a la ruta actual.
function Main() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}

export default Main;
