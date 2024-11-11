// Layout para la vista del admin - dashboard
// ¿Qué es un layout? Es una estructura que se repite en todas las páginas de la aplicación, en este caso, el layout del admin

import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar/Sidebar";
// SideBar : Menú lateral
// Header : Cabecera - Usuario y notificaciones
// Outlet : Contenido de la vista

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  );
}

export default AdminLayout;
