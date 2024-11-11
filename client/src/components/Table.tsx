// components/Table.tsx

import { DataTable, DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-purple/theme.css";
import React from "react";

// Se define las props que se le pasan al componente Column
export interface ColumnProps<T> {
  field: string;
  header: string;
  body?: (rowData: T) => JSX.Element | string;
}

// Se define las props que se le pasan al componente Table
interface TableProps<T> {
  label: string;
  items: T[] | null;
  columns: ColumnProps<T>[];
  editProduct?: (rowData: T) => void;
  confirmDeleteProduct: (rowData: T) => void;
}

// Sirve para renderizar los botones de editar y eliminar
const actionBodyTemplate = <T,>(
  rowData: T,
  {
    editProduct,
    confirmDeleteProduct,
  }: {
    editProduct: (rowData: T) => void;
    confirmDeleteProduct: (rowData: T) => void;
  }
) => {
  return (
    <React.Fragment>
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        className="mr-2"
        onClick={() => editProduct(rowData)}
      />
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        onClick={() => confirmDeleteProduct(rowData)}
      />
    </React.Fragment>
  );
};

// Se define el componente Table
export default function TableComponent<T extends DataTableValue>({
  label,
  items,
  columns,
  editProduct,
  confirmDeleteProduct,
}: TableProps<T>) {
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{label}</span>
    </div>
  );
  const footer = `En total hay ${items?.length || 0} ${label}.`;

  return (
    <div className="card">
      <DataTable
        paginator
        rows={4}
        rowsPerPageOptions={[5, 10, 20]}
        value={items || []}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        {columns.map((column: ColumnProps<T>) => (
          <Column
            columnKey={column.field}
            key={column.field}
            field={column.field}
            header={column.header}
            body={column.body}
          />
        ))}
        {editProduct && (
          <Column
            body={(rowData) =>
              actionBodyTemplate(rowData, { editProduct, confirmDeleteProduct })
            }
            exportable={false}
            style={{ textAlign: "center" }}
          ></Column>
        )}
      </DataTable>
    </div>
  );
}
