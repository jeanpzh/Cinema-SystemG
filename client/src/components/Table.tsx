// components/Table.tsx

import { DataTable, DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

export interface ColumnProps<T> {
  field: string;
  header: string;
  body?: (rowData: T) => JSX.Element | string;
}

interface TableProps<T> {
  label: string;
  items: T[] | null;
  columns: ColumnProps<T>[];
  editProduct?: (rowData: T) => void;
  confirmDeleteProduct: (rowData: T) => void;
}

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
    <div className="flex space-x-2 justify-center">
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        className="p-button-text text-primary hover:bg-primary-light"
        onClick={() => editProduct(rowData)}
      />
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        className="p-button-text text-danger hover:bg-danger-light"
        onClick={() => confirmDeleteProduct(rowData)}
      />
    </div>
  );
};

export default function TableComponent<T extends DataTableValue>({
  label,
  items,
  columns,
  editProduct,
  confirmDeleteProduct,
}: TableProps<T>) {
  const header = (
    <div className="flex flex-wrap justify-between gap-2">
      <span className="text-xl text-gray-800 font-bold">{label}</span>
    </div>
  );
  const footer = `En total hay ${items?.length || 0} ${label}.`;

  return (
    <div className="bg-lightTheme-card p-4 rounded-lg shadow-sm overflow-x-auto">
      <DataTable
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50]}
        value={items || []}
        header={header}
        footer={footer}
        className="min-w-full text-center w-[100%] p-2"
        dataKey="id"
        selectionMode="single"
        selectionPageOnly
        removableSort
      >
        {columns.map((column: ColumnProps<T>) => (
          <Column
            columnKey={column.field}
            key={column.field}
            field={column.field}
            header={column.header}
            body={column.body}
            sortable
            style={{
              alignItems: "center",
              textAlign: "center",
            }}
          />
        ))}
        {editProduct && (
          <Column
            key="actions"
            header="Acciones"
            body={(rowData) =>
              actionBodyTemplate(rowData, { editProduct, confirmDeleteProduct })
            }
            exportable={false}
            style={{
              alignItems: "center",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></Column>
        )}
      </DataTable>
    </div>
  );
}
