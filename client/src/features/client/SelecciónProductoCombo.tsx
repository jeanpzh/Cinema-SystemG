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
import { SeleccionarProducto } from "./SeleccionarProductos";
import { SeleccionarCombo } from "./SeleccionarCombo";
import ItemsSeleccionados from "./ItemsSeleccionados";
import { useProductoStore } from "@/store/productoStore";
import { useComboStore } from "@/store/comboStore";
import { useCombos, useProducts } from "@/hooks/useCrud";

export default function ProductSelectionSPA() {
  const { data: products } = useProducts();

  const { data: combos } = useCombos();

  const [activeTab, setActiveTab] = useState<"products" | "combos">("products");
  const handleReserve = () => {
    const itemType = activeTab === "products" ? "producto(s)" : "combo(s)";
    alert(`Reservando ${itemType}...`);
  };
  // Obtenemos los items seleccionados
  const productosSeleccionados = useProductoStore((state) => state.productos);
  const combosSeleccionados = useComboStore((state) => state.combos);

  return (
    <div className="flex flex-col md:flex-row gap-6">
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
                products={products || []}
                productosSeleccionados={productosSeleccionados}
              />
            ) : (
              <SeleccionarCombo
                combos={combos || []}
                combosSeleccionados={combosSeleccionados}
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
            {
              productosSeleccionados.length > 0 ||
              combosSeleccionados.length > 0 ? (
                <div className="flex justify-between">
                  <p className="text-base font-semibold">Total:</p>
                  <p className="text-base font-semibold">
                    $
                    {productosSeleccionados.reduce(
                      (acc, current) => acc + Number(current.Precio || 0), // Suma el precio de los productos
                      0
                    ) +
                      combosSeleccionados.reduce(
                        (acc, current) => acc + Number(current.Precio || 0), // Suma el precio de los combos
                        0
                      )}
                  </p>
                </div>
              ) : null
              /* Si no hay items seleccionados, no se muestra el total */
            }
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
