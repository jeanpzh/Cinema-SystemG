import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Combo } from "@/constants/table";
import { useComboStore } from "@/store/comboStore";

interface Props {
  combos: Combo[];
  combosSeleccionados: Combo[];
}

export function SeleccionarCombo({ combos, combosSeleccionados }: Props) {
  
  const setCombos = useComboStore((state) => state.setCombos);

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
        (p) => p.Codigo_Combo === combo.Codigo_Combo
      ) !== -1
    );
  };

  return (
    <div className="space-y-4">
      {combos.map((combo) => (
        <div
          key={combo.Codigo_Combo}
          className="flex items-start space-x-4 rtl:space-x-reverse"
        >
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
                  className="text-base font-semibold"
                >
                  {combo.Nombre_Combo}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {combo.Descripcion}
                </p>
              </div>
              <Checkbox
                id={`combo-${combo.Codigo_Combo}`}
                checked={handleChecked(combo)}
                onCheckedChange={() => handleOnCheckedChange(combo)}
              />
            </div>
            <p className="mt-2 text-sm font-medium">Precio: ${combo.Precio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
