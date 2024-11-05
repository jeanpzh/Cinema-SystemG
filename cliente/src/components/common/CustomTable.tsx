import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  Table,
} from "../ui/table";
import { Button } from "@/components/ui/button";

interface TableProps {
  headers: string[];
  items?: { [key: string]: any }[];
  editarItem?: (id: string) => void;
  eliminarItem?: (id: string) => void;
  idKey: string;
  itemsPerPage?: number;
}

function CustomTable({
  headers,
  items = [],
  editarItem,
  eliminarItem,
  idKey,
  itemsPerPage = 7,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!items || items.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, colIndex) =>
                header.toLowerCase() === "acciones" ? (
                  <TableCell key={colIndex}>
                    <button
                      onClick={() => {
                        if (editarItem) editarItem(item[idKey]);
                      }}
                    >
                      <Edit2
                        color="blue"
                        style={{ marginRight: "10px" }}
                        size={20}
                      />
                    </button>
                    <button
                      onClick={() => {
                        console.log(item[idKey]);
                        if (eliminarItem) eliminarItem(item[idKey]);
                      }}
                    >
                      <Trash2
                        color="red"
                        style={{ marginLeft: "10px" }}
                        size={20}
                      />
                    </button>
                  </TableCell>
                ) : (
                  <TableCell key={colIndex}>{item[header]}</TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default CustomTable;
