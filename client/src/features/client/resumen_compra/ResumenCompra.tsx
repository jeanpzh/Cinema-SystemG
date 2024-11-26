import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { useComboStore } from "@/store/comboStore";
import { useEntradaStore } from "@/store/entradaStore";
import { useProductoStore } from "@/store/productoStore";
import { useLocation, useNavigate } from "react-router-dom";

function ResumenCompra() {
  const navigate = useNavigate();
  const location = useLocation();
  const entradas = useEntradaStore((state) => state.entradas);
  const butacas = useEntradaStore((state) => state.asientos);
  const productos = useProductoStore((state) => state.productos);
  const combos = useComboStore((state) => state.combos);

  const subtotalEntradas = entradas.reduce(
    (acc, entrada) => acc + entrada.cantidad * entrada.precio,
    0
  );
  const subtotalProductos = productos.reduce(
    (acc, producto) => acc + producto.Cantidad * producto.Precio,
    0
  );
  const subtotalCombos = combos.reduce(
    (acc, combo) => acc + combo.Cantidad * combo.Precio,
    0
  );
  const total = subtotalEntradas + subtotalProductos + subtotalCombos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b26] to-[#24283b] p-6 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto bg-[#1f2937]/90 backdrop-blur-sm text-slate-200 rounded-xl border border-slate-700/50 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20 p-6">
        {/* Encabezado con Gradiente */}
        <div className="space-y-4 bg-gradient-to-r from-black to-purple-900 p-5 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-purple-200/50 mb-8">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-4xl font-bold text-white">
              Resumen de Compra
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información Adicional */}
          <Card className="w-full max-w-2xl overflow-hidden border-none bg-white/95 shadow-xl backdrop-blur-sm rounded-3xl transition-all duration-300 hover:shadow-purple-200/50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-800">
                Información Adicional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-purple-800 mb-1">
                  Política de Devoluciones
                </h3>
                <p className="text-sm text-black">
                  Las entradas de cine no son reembolsables una vez compradas.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-purple-800 mb-1">Notas</h3>
                <p className="text-sm text-black">
                  Llega al menos 15 minutos antes de la función para evitar
                  contratiempos.
                </p>
              </div>
            </CardContent>
          </Card>
  
          {/* Detalles de la Compra */}
          <Card className="overflow-hidden border-none bg-white/95 rounded-lg border border-purple-300 shadow-lg transition-shadow hover:shadow-purple-200/50 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-800">
                Detalles de la Compra
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Butacas Seleccionadas */}
          {butacas.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-black">Butacas Seleccionadas</h3>
              <div className="flex flex-wrap gap-2">
                {butacas.map((butaca, index) =>
                  butaca ? (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-black to-purple-900 rounded-lg shadow-md hover:bg-purple-600 hover:border-purple-700 transition-all duration-300"
                    >
                      {butaca.fila}{butaca.numero_asiento}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          )}

              {/* Entradas */}
              {entradas.length > 0 && (
                <>
                  <Separator className="bg-purple-300" />
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-800">Entradas</h3>
                    <ul className="list-disc list-inside text-sm text-black space-y-1">
                      {entradas.map(
                        (entrada, index) =>
                          entrada.cantidad > 0 && (
                            <li key={index}>
                              {entrada.tipo} - Cantidad: {entrada.cantidad} -
                              Subtotal: $
                              {(entrada.cantidad * entrada.precio).toFixed(2)}
                            </li>
                          )
                      )}
                    </ul>
                    <div className="flex justify-between mt-2">
                      <strong className="text-purple-800">Subtotal Entradas</strong>
                      <span className="text-black">${subtotalEntradas.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
  
              {/* Productos */}
              {productos.length > 0 && (
                <>
                  <Separator className="bg-purple-300" />
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-800">
                      Productos de Dulcería
                    </h3>
                    <ul className="list-disc list-inside text-sm text-black space-y-1">
                      {productos.map(
                        (producto, index) =>
                          producto.Cantidad > 0 && (
                            <li key={index}>
                              {producto.Nombre} - Cantidad: {producto.Cantidad}{" "}
                              - Subtotal: $
                              {(producto.Cantidad * producto.Precio).toFixed(2)}
                            </li>
                          )
                      )}
                    </ul>
                    <div className="flex justify-between mt-2">
                      <strong className="text-purple-800">
                        Subtotal Productos
                      </strong>
                      <span className="text-black">
                        ${subtotalProductos.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              )}
  
              {/* Combos */}
              {combos.length > 0 && (
                <>
                  <Separator className="bg-purple-300" />
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-800">Combos</h3>
                    <ul className="list-disc list-inside text-sm text-black space-y-1">
                      {combos.map(
                        (combo, index) =>
                          combo.Cantidad > 0 && (
                            <li key={index}>
                              {combo.Nombre_Combo} - Cantidad: {combo.Cantidad}{" "}
                              - Subtotal: $
                              {(combo.Cantidad * combo.Precio).toFixed(2)}
                            </li>
                          )
                      )}
                    </ul>
                    <div className="flex justify-between mt-2">
                      <strong className="text-purple-800">Subtotal Combos</strong>
                      <span className="text-black">${subtotalCombos.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
  
              {/* Total */}
              <Separator className="bg-purple-300" />
              <div className="flex justify-between items-center pt-4 border-t border-purple-300">
                <span className="font-bold text-lg text-purple-800">Total</span>
                <span className="font-bold text-lg text-purple-800">
                  ${total.toFixed(2)}
                </span>
              </div>
  
              {/* Botón de Pagar */}
              <Button
                className="w-full bg-gradient-to-br from-[#1a1b26] to-[#24283b] py-8 text-xl font-bold text-white transition-all hover:bg-purple-200 hover:scale-[1.02] disabled:bg-gray-300 disabled:text-gray-500 rounded-xl shadow-lg hover:shadow-purple-300/50"
                onClick={() => {
                  navigate(`${location.pathname}/pago`);
                }}
              >
                Pagar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
  
  
}

export default ResumenCompra;
