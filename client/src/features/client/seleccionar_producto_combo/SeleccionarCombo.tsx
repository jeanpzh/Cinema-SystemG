import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Combo, useComboStore } from "@/store/comboStore";
import { Plus, Minus, Package } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  combos: Combo[];
  combosSeleccionados: Combo[];
}

export function SeleccionarCombo({
  combos = [],
  combosSeleccionados = [],
}: Props) {
  const setCombos = useComboStore((state) => state.setCombos);
  const updateCombo = useComboStore((state) => state.updateCantidad);
  const [activeCombo, setActiveCombo] = useState<string | null>(null);

  const handleOnCheckedChange = (combo: Combo) => {
    setCombos(
      combosSeleccionados.some((p) => p.Codigo_Combo === combo.Codigo_Combo)
        ? combosSeleccionados.filter(
            (c) => c.Codigo_Combo !== combo.Codigo_Combo
          )
        : [...combosSeleccionados, combo]
    );
  };

  const handleChecked = (combo: Combo) => {
    return (
      combosSeleccionados.findIndex(
        (c) => c.Codigo_Combo === combo.Codigo_Combo
      ) !== -1
    );
  };

  const handleQuantityChange = (comboId: string, change: number) => {
    const combo = combos.find((c) => c.Codigo_Combo === comboId);

    if (!combo) return;

    updateCombo(
      comboId,
      Math.max(
        0,
        (combosSeleccionados.find((c) => c.Codigo_Combo === comboId)
          ?.Cantidad || 0) + change
      )
    );
  };

  const calculateTotal = () => {
    return combosSeleccionados.reduce((total, combo) => {
      return total + combo.Precio * (combo.Cantidad || 0);
    }, 0);
  };

  if (!combos || combos.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No hay combos disponibles.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selección de Combos */}
      <Card className="border shadow-sm">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-xl font-bold">Selección de Combos</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {combos.map((combo) => (
                <Card
                  key={combo.Codigo_Combo}
                  className={`border ${
                    activeCombo === combo.Codigo_Combo ? "ring-1 ring-gray-400" : ""
                  }`}
                  onMouseEnter={() => setActiveCombo(combo.Codigo_Combo)}
                  onMouseLeave={() => setActiveCombo(null)}
                >
                  {/* Contenido del Combo */}
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={combo.Imagen_Combo}
                        alt={combo.Nombre_Combo}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <Label
                            htmlFor={`combo-${combo.Codigo_Combo}`}
                            className="text-lg font-semibold"
                          >
                            {combo.Nombre_Combo}
                          </Label>
                          <Checkbox
                            id={`combo-${combo.Codigo_Combo}`}
                            checked={handleChecked(combo)}
                            onCheckedChange={() => handleOnCheckedChange(combo)}
                          />
                        </div>
                        <Badge variant="outline" className="mb-2 block w-fit">
                          ${combo.Precio}
                        </Badge>
                        <p className="text-sm text-gray-600">{combo.Descripcion}</p>
                      </div>
                    </div>
                  </CardContent>
  
                  {/* Footer del Combo */}
                  <CardFooter className="p-4 flex justify-between items-center">
                    {/* Control de Cantidad */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          handleQuantityChange(combo.Codigo_Combo, -1)
                        }
                        disabled={
                          !combosSeleccionados.find(
                            (c) => c.Codigo_Combo === combo.Codigo_Combo
                          )?.Cantidad
                        }
                      >
                        <Minus />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {combosSeleccionados.find(
                          (c) => c.Codigo_Combo === combo.Codigo_Combo
                        )?.Cantidad || 0}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          handleQuantityChange(combo.Codigo_Combo, 1)
                        }
                      >
                        <Plus />
                      </Button>
                    </div>
  
                    {/* Botón Agregar/Quitar */}
                    <Button
                      variant={handleChecked(combo) ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleOnCheckedChange(combo)}
                    >
                      {handleChecked(combo) ? "Quitar" : "Agregar"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
  
      {/* Resumen del Pedido */}
      <Card className="border shadow-sm">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Package className="h-5 w-5" />
            Resumen del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-[200px] rounded-md border">
            {combosSeleccionados.length > 0 ? (
              combosSeleccionados.map((combo) => (
                <div
                  key={combo.Codigo_Combo}
                  className="flex justify-between items-center py-2 px-4 hover:bg-gray-50"
                >
                  <span className="font-medium">
                    {combo.Nombre_Combo} x {combo.Cantidad}
                  </span>
                  <span className="font-semibold">
                    ${(combo.Precio * (combo.Cantidad || 0)).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 italic">
                No hay combos seleccionados
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="p-4 flex justify-between items-center">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
        </CardFooter>
      </Card>
    </div>
  );
}

