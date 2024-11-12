/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/admin/productos/ListaProductos.tsx

import React, { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import { COLUMN_PRODUCTOS } from "@/constants/columns";
import { useProducts } from "@/hooks/useCrud";
import { Producto } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import ModalFormularioProductos from "./ModalFormularioProducto";
import HeaderList from "@/components/HeaderList";
import SearchBar from "@/components/SearchBar";
import ItemFilter from "@/utils/ItemFilter";
import { useAlert } from "@/hooks/useAlert";

function ListaProductos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [storedProductos, setStoredProductos] = useState<Producto[]>([]);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const { showAlert } = useAlert();
  const {
    data: productos,
    createItem: crearProducto,
    updateItem: actualizarProducto,
    deleteItem: eliminarProducto,
  } = useProducts();

  useEffect(() => {
    setStoredProductos(productos || []);
  }, [productos]);

  const showDeleteDialogFunc = () => setVisibleDeleteDialog(true);
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
    setSelectedProducto(rowData);
    setIsEditing(true);
    showAddDialog();
  };

  const handleDeleteProduct = (rowData: Producto) => {
    setSelectedProducto(rowData);
    showDeleteDialogFunc();
  };

  const confirmDelete = () => {
    if (selectedProducto) {
      eliminarProducto(selectedProducto.Codigo_Producto)
        .then(() => {
          const nuevaLista = storedProductos.filter(
            (producto) =>
              producto.Codigo_Producto !== selectedProducto.Codigo_Producto
          );
          setStoredProductos(nuevaLista);
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
          showAlert(`Error al eliminar el producto ${selectedProducto.Nombre}`);
        });
      hideDeleteDialog();
    }
  };

  const handleAddOrUpdateProducto = async (data: Producto) => {
    try {
      if (isEditing && selectedProducto) {
        const updatedProducto = await actualizarProducto(
          selectedProducto.Codigo_Producto,
          data
        );
        setStoredProductos(
          storedProductos.map((producto) =>
            producto.Codigo_Producto === selectedProducto.Codigo_Producto
              ? updatedProducto.data
              : producto
          )
        );
      } else {
        const nuevoProducto = await crearProducto(data);
        setStoredProductos([...storedProductos, nuevoProducto.data]);
      }
    } catch (error: any) {
      console.error("Error al agregar/actualizar el producto:", error);
      if (error.response && error.response.status === 400) {
        showAlert(`El item ${data.Nombre} ya existe.`);
      } else {
        showAlert("Error al agregar/actualizar el producto.");
      }
    }
    hideAddDialog();
  };

  const filteredProducts = ItemFilter({
    searchTerm: searchTerm,
    memoItems: memoProductos,
    getNombreItem: (producto) => producto.Nombre,
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      <HeaderList
        title="Productos"
        showAddDialog={showAddDialog}
        buttonLabel="Agregar Producto"
      />
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar productos..."
      />
      <Table
        label="Productos"
        items={filteredProducts}
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
