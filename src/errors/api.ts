export class UnauthorizedError extends Error {
  constructor(message?: string, cause?: Error) {
    const _message = message || 'Unauthorized';
    super(_message);
    this.cause = cause;
    this.name = 'UnauthorizedError';
  }
}
