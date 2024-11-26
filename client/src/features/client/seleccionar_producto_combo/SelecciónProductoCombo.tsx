import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/Card";

import { useProductoStore } from "@/store/productoStore";
import { useComboStore } from "@/store/comboStore";
import { useCombos, useProducts } from "@/hooks/useCrud";

import ItemsSeleccionados from "./ItemsSeleccionados";
import PrecioTotal from "./PrecioTotal";
import { SeleccionarProducto } from "./SeleccionarProductos";
import { SeleccionarCombo } from "./SeleccionarCombo";

export default function ProductSelectionSPA() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "combos">("products");

  const { data: products } = useProducts();
  const { data: combos } = useCombos();

  const handleReserve = () => {
    setIsOpenModal(true);
  };

  const handleContinue = () => {
    setIsOpenModal(false);
    navigate(`${location.pathname}/resumen-compra`);
  };

  const productosSeleccionados = useProductoStore((state) => state.productos);
  const combosSeleccionados = useComboStore((state) => state.combos);

  const totalItems = productosSeleccionados.length + combosSeleccionados.length;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Dialog
        visible={isOpenModal}
        onHide={() => setIsOpenModal(false)}
        header={<strong>Reserva de productos/combos</strong>}
      >
        <main className="flex flex-col gap-4 p-4">
          <p>¿Estás seguro de que deseas reservar los siguientes items?</p>
          {totalItems > 0 ? (
            <ItemsSeleccionados
              products={productosSeleccionados}
              combos={combosSeleccionados}
            />
          ) : (
            <p>No hay items seleccionados</p>
          )}
          <PrecioTotal
            productosSeleccionados={productosSeleccionados}
            combosSeleccionados={combosSeleccionados}
          />
        </main>
        <footer className="flex justify-end gap-4 p-4">
          <Button variant="outline" onClick={() => setIsOpenModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleContinue}>Continuar</Button>
        </footer>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="col-span-1 lg:row-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Categorías</CardTitle>
            <CardDescription className="text-sm">
              Selecciona el tipo de items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button
                variant={activeTab === "products" ? "default" : "outline"}
                onClick={() => setActiveTab("products")}
                className="justify-start text-sm"
              >
                Productos
              </Button>
              <Button
                variant={activeTab === "combos" ? "default" : "outline"}
                onClick={() => setActiveTab("combos")}
                className="justify-start text-sm"
              >
                Combos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {activeTab === "products" ? "Productos" : "Combos"}
            </CardTitle>
            <CardDescription>
              Selecciona los items que deseas reservar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
              {activeTab === "products" ? (
                <SeleccionarProducto
                  products={(products || []).map((product) => ({
                    ...product,
                    Cantidad: 0,
                  }))}
                  productosSeleccionados={productosSeleccionados}
                />
              ) : (
                <SeleccionarCombo
                  combos={
                    combos?.map((combo) => ({
                      ...combo,
                      Cantidad: 0,
                    })) || []
                  }
                  combosSeleccionados={
                    combosSeleccionados.map((combo) => ({
                      ...combo,
                      Cantidad: combo.Cantidad,
                    })) || []
                  }
                />
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:row-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Selección Actual</CardTitle>
            <CardDescription className="text-sm">
              Items seleccionados:{" "}
              <Badge variant="secondary">{totalItems}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ScrollArea className="h-[300px] lg:h-[400px] w-full rounded-md border p-4">
              {totalItems > 0 ? (
                <ItemsSeleccionados
                  products={productosSeleccionados}
                  combos={combosSeleccionados}
                />
              ) : (
                <p className="text-center text-muted-foreground">
                  No hay items seleccionados
                </p>
              )}
            </ScrollArea>
          </CardContent>
          <Separator className="my-2" />
          <CardFooter className="flex-col items-stretch gap-4 pt-4">
            <PrecioTotal
              productosSeleccionados={productosSeleccionados}
              combosSeleccionados={combosSeleccionados}
            />
            <Button
              onClick={handleReserve}
              disabled={totalItems === 0}
              className="w-full"
            >
              Reservar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

