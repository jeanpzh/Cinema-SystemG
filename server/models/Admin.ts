export interface AdminLogin {
  username: string;
  password: string;
}

export class Admin {
  private Codigo_Admin: string;
  private Nombre: string;
  private Username: string;
  private Password: string;
  private Telefono: string;
  private Correo: string;

  constructor(
    Codigo_Admin: string,
    Nombre: string,
    Username: string,
    Password: string,
    Telefono: string,
    Correo: string
  ) {
    this.Codigo_Admin = Codigo_Admin;
    this.Nombre = Nombre;
    this.Username = Username;
    this.Password = Password;
    this.Telefono = Telefono;
    this.Correo = Correo;
  }

  getCodigo_Admin(): string {
    return this.Codigo_Admin;
  }

  setCodigo_Admin(Codigo_Admin: string): void {
    this.Codigo_Admin = Codigo_Admin;
  }

  getNombre(): string {
    return this.Nombre;
  }

  setNombre(Nombre: string): void {
    this.Nombre = Nombre;
  }

  getUsername(): string {
    return this.Username;
  }

  setUsername(Username: string): void {
    this.Username = Username;
  }

  getPassword(): string {
    return this.Password;
  }

  setPassword(Password: string): void {
    this.Password = Password;
  }

  getTelefono(): string {
    return this.Telefono;
  }

  setTelefono(Telefono: string): void {
    this.Telefono = Telefono;
  }

  getCorreo(): string {
    return this.Correo;
  }

  setCorreo(Correo: string): void {
    this.Correo = Correo;
  }
}
