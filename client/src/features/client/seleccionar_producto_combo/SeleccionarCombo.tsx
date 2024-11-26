import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Combo, useComboStore } from "@/store/comboStore";
import { Plus, Minus } from "lucide-react";

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
      <div className="text-center text-[#a9b1d6]">
        No hay combos disponibles.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-[#1a1b26] text-[#a9b1d6]">
      <h2 className="text-2xl font-bold text-[#7aa2f7] mb-4">
        Selección de Combos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {combos.map((combo) => (
          <Card
            key={combo.Codigo_Combo}
            className="bg-[#24283b] border-[#414868]"
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={combo.Imagen_Combo}
                  alt={combo.Nombre_Combo}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Label
                        htmlFor={`combo-${combo.Codigo_Combo}`}
                        className="text-lg font-semibold text-[#7aa2f7]"
                      >
                        {combo.Nombre_Combo}
                      </Label>
                      <p className="text-sm text-[#565f89]">
                        {combo.Descripcion}
                      </p>
                    </div>
                    <Checkbox
                      id={`combo-${combo.Codigo_Combo}`}
                      checked={handleChecked(combo)}
                      onCheckedChange={() => handleOnCheckedChange(combo)}
                      className="border-[#414868]"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">
                    Precio: ${combo.Precio}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-[#1f2335] p-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(combo.Codigo_Combo, -1)}
                  disabled={
                    !combosSeleccionados.find(
                      (c) => c.Codigo_Combo === combo.Codigo_Combo
                    )?.Cantidad
                  }
                  className="h-8 w-8 rounded-full bg-[#414868] text-[#a9b1d6] hover:bg-[#414868]/80"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">
                  {combosSeleccionados.find(
                    (c) => c.Codigo_Combo === combo.Codigo_Combo
                  )?.Cantidad || 0}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(combo.Codigo_Combo, 1)}
                  className="h-8 w-8 rounded-full bg-[#414868] text-[#a9b1d6] hover:bg-[#414868]/80"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleOnCheckedChange(combo)}
                className="bg-[#7aa2f7] text-[#1a1b26] hover:bg-[#7aa2f7]/80"
              >
                {handleChecked(combo) ? "Quitar" : "Agregar"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="mt-6 bg-[#24283b] border-[#414868]">
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold text-[#7aa2f7] mb-2">
            Resumen del Pedido
          </h3>
          {combosSeleccionados.map((combo) => (
            <div
              key={combo.Codigo_Combo}
              className="flex justify-between items-center py-2"
            >
              <span>
                {combo.Nombre_Combo} x{}
              </span>
              <span>${(combo.Precio * (combo.Cantidad || 0)).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-[#414868] mt-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              ${Number(calculateTotal().toFixed(2))}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
