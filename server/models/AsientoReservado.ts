export class Asientos_Reservados {
  private Codigo_Asiento: string;
  private Codigo_Reporte_Boleto: string;

  constructor(Codigo_Asiento: string, Codigo_Reporte_Boleto: string) {
    this.Codigo_Asiento = Codigo_Asiento;
    this.Codigo_Reporte_Boleto = Codigo_Reporte_Boleto;
  }
  public getCodigo_Asiento(): string {
    return this.Codigo_Asiento;
  }
  public setCodigo_Asiento(Codigo_Asiento: string) {
    this.Codigo_Asiento = Codigo_Asiento;
  }
  public getCodigo_Reporte_Boleto(): string {
    return this.Codigo_Reporte_Boleto;
  }

  public setCodigo_Reporte_Boleto(Codigo_Reporte_Boleto: string) {
    this.Codigo_Reporte_Boleto = Codigo_Reporte_Boleto;
  }
}
