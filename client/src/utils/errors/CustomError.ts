// utils/errors/CustomError.ts

export class CustomError extends Error {
  code: string;
  type: string;

  constructor(code: string, message?: string, type?: string) {
    super(code); // Pass the message to the base Error class
    this.code = code || ""; // Set custom properties
    this.name = "CustomError"; // Optional: Set a custom error name
    this.type = type || ""; // Optional: Set a custom error name

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
