export class Trabajador {
  private _codigo_trabajador: string;
  private _correo: string;
  private _nombre: string;
  private _username: string;
  private _password: string;
  private _telefono: string;
  private _rol: string;

  constructor(
    codigo_trabajador: string,
    correo: string,
    nombre: string,
    username: string,
    password: string,
    telefono: string,
    rol: string
  ) {
    this._codigo_trabajador = codigo_trabajador;
    this._correo = correo;
    this._nombre = nombre;
    this._username = username;
    this._password = password;
    this._telefono = telefono;
    this._rol = rol;
  }

  get codigo_trabajador(): string {
    return this._codigo_trabajador;
  }

  set codigo_trabajador(value: string) {
    this._codigo_trabajador = value;
  }

  get correo(): string {
    return this._correo;
  }

  set correo(value: string) {
    this._correo = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get telefono(): string {
    return this._telefono;
  }

  set telefono(value: string) {
    this._telefono = value;
  }

  get rol(): string {
    return this._rol;
  }

  set rol(value: string) {
    this._rol = value;
  }
}
