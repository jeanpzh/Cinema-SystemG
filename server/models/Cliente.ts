export class Cliente {
  private Codigo_Cliente: string;
  private Correo: string;
  private Nombre: string;
  private Username: string;
  private Password: string;
  private Telefono: string;

  constructor(
    Codigo_Cliente: string,
    Correo: string,
    Nombre: string,
    Username: string,
    Password: string,
    Telefono: string
  ) {
    this.Codigo_Cliente = Codigo_Cliente;
    this.Correo = Correo;
    this.Nombre = Nombre;
    this.Username = Username;
    this.Password = Password;
    this.Telefono = Telefono;
  }
  get getCodigo_Cliente() {
    return this.Codigo_Cliente;
  }
  set setCodigo_Cliente(Codigo_Cliente: string) {
    this.Codigo_Cliente = Codigo_Cliente;
  }
  get getCorreo() {
    return this.Correo;
  }
  set setCorreo(Correo: string) {
    this.Correo = Correo;
  }
  get getNombre() {
    return this.Nombre;
  }
  set setNombre(Nombre: string) {
    this.Nombre = Nombre;
  }
  get getUsername() {
    return this.Username;
  }
  set setUsername(Username: string) {
    this.Username = Username;
  }

  get getPassword() {
    return this.Password;
  }
  set setPassword(Password: string) {
    this.Password = Password;
  }
  get getTelefono() {
    return this.Telefono;
  }
  set setTelefono(Telefono: string) {
    this.Telefono = Telefono;
  }
}
