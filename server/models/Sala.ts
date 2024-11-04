class Sala {
  private codigo_sala: string;
  private capacidad: number;
  private tipo_sala: string;

  constructor(codigo_sala: string, capacidad: number, tipo_sala: string) {
    this.codigo_sala = codigo_sala;
    this.capacidad = capacidad;
    this.tipo_sala = tipo_sala;
  }

  getCodigoSala(): string {
    return this.codigo_sala;
  }

  getCapacidad(): number {
    return this.capacidad;
  }

  getTipoSala(): string {
    return this.tipo_sala;
  }
}
export default Sala;
