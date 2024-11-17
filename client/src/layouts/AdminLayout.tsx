/* eslint-disable @typescript-eslint/no-explicit-any */
// Layout para la vista del admin - dashboard
// ¿Qué es un layout? Es una estructura que se repite en todas las páginas de la aplicación, en este caso, el layout del admin

import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useLoginStore } from "@/store/loginStore";

// SideBar : Menú lateral
// Header : Cabecera - Usuario y notificaciones
// Outlet : Contenido de la vista

function AdminLayout() {
  const user = useLoginStore((state: any) => state.user);

  return (
    <div className="flex ">
      <Sidebar user={user} />
      <Main />
    </div>
  );
}

export default AdminLayout;
