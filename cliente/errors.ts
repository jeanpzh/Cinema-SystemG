export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

export class ConnectionError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "ConnectionError";
  }
}
