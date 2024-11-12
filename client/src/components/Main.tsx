import { AlertProvider } from "@/context/AlertContext";
import { Outlet } from "react-router-dom";

// Outlet : Cuando se renderiza un componente con un <Outlet />, se renderiza el componente hijo correspondiente a la ruta actual.

function Main() {
  return (
    <AlertProvider>
      <main className="flex-1 p-8 bg-lightTheme-background min-h-screen overflow-y-auto ml-[240px]">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </AlertProvider>
  );
}

export default Main;
