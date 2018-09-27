class BaseError {
    constructor(
        public name: string,
        public message: string
    ) {
        Error.apply(this, arguments);
    }
}

BaseError.prototype = new Error();

export default BaseError;
