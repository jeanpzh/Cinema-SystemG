import SidebarOptions from "./SidebarOptions";

function Sidebar() {
  return (
    <aside className="flex justify-around flex-col w-[240px] h-screen">
      <header>
        <p className=" text-center max-w-lg text-3xl font-semibold leading-loose text-black-900 ">
          CinePlex
        </p>
      </header>
      <nav>
        <SidebarOptions to="/admin/dashboard" label="Dashboard" />
        <SidebarOptions to="/admin/peliculas" label="Peliculas" />
        <SidebarOptions to="/admin/productos" label="Productos" />
        <SidebarOptions to="/admin/funciones" label="Funciones" />
        <SidebarOptions to="/admin/combos" label="Combos" />
      </nav>
      <footer>
        <p className="text-center text-gray-400 text-xs">
          &copy; CinePlex 2021
        </p>
      </footer>
    </aside>
  );
}

export default Sidebar;
