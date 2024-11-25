class Reporte_Boleto {
  private Codigo_Reporte_Boleto: string;
  private Codigo_Funcion: string;
  private Total: number;
  private Codigo_Cliente: string;

  constructor(
    Codigo_Reporte_Boleto: string,
    Codigo_Funcion: string,
    Total: number,

    Codigo_Cliente: string
  ) {
    this.Codigo_Reporte_Boleto = Codigo_Reporte_Boleto;
    this.Codigo_Funcion = Codigo_Funcion;
    this.Total = Total;
    this.Codigo_Cliente = Codigo_Cliente;
  }

  public getCodigo_Reporte_Boleto(): string {
    return this.Codigo_Reporte_Boleto;
  }
  public setCodigo_Reporte_Boleto(Codigo_Reporte_Boleto: string) {
    this.Codigo_Reporte_Boleto = Codigo_Reporte_Boleto;
  }
  public getCodigo_Funcion(): string {
    return this.Codigo_Funcion;
  }
  public setCodigo_Funcion(Codigo_Funcion: string) {
    this.Codigo_Funcion = Codigo_Funcion;
  }
  public getTotal(): number {
    return this.Total;
  }
  public setTotal(Total: number) {
    this.Total = Total;
  }
  public getCodigo_Cliente(): string {
    return this.Codigo_Cliente;
  }
  public setCodigo_Cliente(Codigo_Cliente: string) {
    this.Codigo_Cliente = Codigo_Cliente;
  }
}
export default Reporte_Boleto;
