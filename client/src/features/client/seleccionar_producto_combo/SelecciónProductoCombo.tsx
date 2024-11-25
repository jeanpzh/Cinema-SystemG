import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useProductoStore } from "@/store/productoStore";
import { useComboStore } from "@/store/comboStore";
import { useCombos, useProducts } from "@/hooks/useCrud";
import { Dialog } from "primereact/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import ItemsSeleccionados from "./ItemsSeleccionados";
import PrecioTotal from "./PrecioTotal";
import { SeleccionarProducto } from "./SeleccionarProductos";
import { SeleccionarCombo } from "./SeleccionarCombo";

export default function ProductSelectionSPA() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: products } = useProducts();

  const { data: combos } = useCombos();

  const [activeTab, setActiveTab] = useState<"products" | "combos">("products");

  const handleReserve = () => {
    setIsOpenModal(true);
  };

  const handleContinue = () => {
    setIsOpenModal(false);
    navigate(`${location.pathname}/resumen-compra`);
  };

  // Obtenemos los items seleccionados
  const productosSeleccionados = useProductoStore((state) => state.productos);
  const combosSeleccionados = useComboStore((state) => state.combos);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Dialog
        visible={isOpenModal}
        onHide={() => setIsOpenModal(false)}
        header={<strong>Reserva de productos/combos</strong>}
      >
        <main className="flex flex-col gap-4 p-4">
          <p>¿Estás seguro de que deseas reservar los siguientes items?</p>
          {productosSeleccionados.length > 0 ||
          combosSeleccionados.length > 0 ? (
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
        <footer className="flex justify-between p-4">
          <button onClick={() => setIsOpenModal(false)}>Cancelar</button>
          <button onClick={handleContinue}>Continuar</button>
        </footer>
      </Dialog>
      <Card className="w-full md:w-1/4">
        <CardHeader>
          <CardTitle>Categorías</CardTitle>
          <CardDescription>Selecciona el tipo de items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Button
              variant={activeTab === "products" ? "default" : "outline"}
              onClick={() => setActiveTab("products")}
              className="justify-start"
            >
              Productos
            </Button>
            <Button
              variant={activeTab === "combos" ? "default" : "outline"}
              onClick={() => setActiveTab("combos")}
              className="justify-start"
            >
              Combos
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full md:w-1/2">
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
      <Card className="w-full md:w-1/4">
        <CardHeader>
          <CardTitle>Selección Actual</CardTitle>
          <CardDescription>
            Items seleccionados:{" "}
            <Badge variant="secondary">
              {productosSeleccionados.length + combosSeleccionados.length}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {productosSeleccionados.length > 0 ||
            combosSeleccionados.length > 0 ? (
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
        <Separator className="my-4" />
        <CardFooter className="flex flex-col">
          {/* Apartado para visualizar el costo total */}
          <div>
            <PrecioTotal
              productosSeleccionados={productosSeleccionados}
              combosSeleccionados={combosSeleccionados}
            />
          </div>

          <Button
            onClick={handleReserve}
            disabled={
              productosSeleccionados.length === 0 &&
              combosSeleccionados.length === 0
            }
            className="w-full"
          >
            Reservar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
