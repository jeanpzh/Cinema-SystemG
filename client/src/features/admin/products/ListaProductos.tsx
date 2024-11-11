import { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import { COLUMN_PRODUCTOS } from "@/constants/columns";
import { useProducts } from "@/hooks/useCrud";
import { Producto } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import { Button } from "primereact/button";
import ModalFormularioProductos from "./ModalFormularioProducto";

function ListaProductos() {
  const [storedProductos, setStoredProductos] = useState<Producto[]>([]);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: productos,
    createItem: crearProducto,
    updateItem: actualizarProducto,
    deleteItem: eliminarProducto,
  } = useProducts();

  useEffect(() => {
    setStoredProductos(productos || []);
  }, [productos]);

  const showDeleteDialog = () => setVisibleDeleteDialog(true);
  const hideDeleteDialog = () => {
    setVisibleDeleteDialog(false);
    setSelectedProducto(null);
  };

  const showAddDialog = () => setVisibleAddDialog(true);
  const hideAddDialog = () => {
    setVisibleAddDialog(false);
    setSelectedProducto(null);
    setIsEditing(false);
  };

  const memoProductos = useMemo(() => storedProductos, [storedProductos]);

  const handleEditProduct = (rowData: Producto) => {
    showAddDialog();
    setSelectedProducto(rowData);
    setIsEditing(true);
  };

  const handleDeleteProduct = (rowData: Producto) => {
    setSelectedProducto(rowData);
    showDeleteDialog();
  };

  const confirmDelete = async () => {
    if (selectedProducto) {
      try {
        await eliminarProducto(selectedProducto.Codigo_Producto);
        const nuevaLista = storedProductos.filter(
          (producto) =>
            producto.Codigo_Producto !== selectedProducto.Codigo_Producto
        );
        setStoredProductos(nuevaLista);
        hideDeleteDialog();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const handleAddOrUpdateProducto = async (data: Producto) => {
    try {
      if (isEditing && selectedProducto) {
        const updatedProducto = await actualizarProducto(
          selectedProducto.Codigo_Producto,
          data
        );
        const nuevaLista = storedProductos.map((producto) =>
          producto.Codigo_Producto === selectedProducto.Codigo_Producto
            ? updatedProducto.data
            : producto
        );
        setStoredProductos(nuevaLista);
      } else {
        const nuevoProducto = await crearProducto(data);
        setStoredProductos([...storedProductos, nuevoProducto.data]);
      }
      hideAddDialog();
    } catch (error) {
      console.error("Error al agregar/actualizar el producto:", error);
    }
  };

  return (
    <div className="p-8 gap-4">
      <Button
        label="Agregar Producto"
        icon="pi pi-plus"
        onClick={showAddDialog}
        className="p-mb-3 p-4"
      />
      <Table
        label="Productos"
        items={memoProductos}
        columns={COLUMN_PRODUCTOS}
        editProduct={handleEditProduct}
        confirmDeleteProduct={handleDeleteProduct}
      />
      <ModalEliminacion
        handleVisible={visibleDeleteDialog}
        hideDeleteDialog={hideDeleteDialog}
        footerDialog={
          <FooterDialog
            hideDialog={hideDeleteDialog}
            confirmDelete={confirmDelete}
          />
        }
        label={`el producto ${selectedProducto?.Nombre || ""}`}
      />
      <ModalFormularioProductos
        visible={visibleAddDialog}
        onHide={hideAddDialog}
        onAdd={handleAddOrUpdateProducto}
        producto={isEditing && selectedProducto ? selectedProducto : undefined}
      />
    </div>
  );
}

export default ListaProductos;
