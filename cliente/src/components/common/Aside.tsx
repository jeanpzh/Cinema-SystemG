import { menuItems } from "@/constants/menuItems";
import OptionSidebar from "./OptionSidebar";

function Aside() {
  return (
    <aside className="w-[240px] h-screen bg-[#F1F2F7] items-center flex flex-col">
      <header className="text-center pt-10">
        <strong className="text-2xl">Cinema System</strong>
      </header>
      <nav className="w-full h-full flex flex-col justify-around gap-4 items-center">
        <div className="flex flex-col gap-2">
          <span className="text-center pb-5">MENU</span>
          <ul>
            {menuItems.map((item, index) => (
              <OptionSidebar
                key={index}
                path={item.path}
                nombre={item.nombre}
              />
            ))}
          </ul>
        </div>
        <ul>
          <OptionSidebar path="profile" nombre="Perfil" />
          <OptionSidebar path="logout" nombre="Cerrar Sesión" />
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;
