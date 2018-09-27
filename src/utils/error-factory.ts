import { inherits } from 'util';

export const DocumentMissingError = function(message: string) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
};
inherits(DocumentMissingError, Error);
