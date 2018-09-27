import BaseError from '@app/core/base.error';

export default class DocumentMissingError extends BaseError {

    public static readonly NAME = 'DocumentMissing';

    constructor(message: string) {
        super(DocumentMissingError.NAME, message);
    }

}
