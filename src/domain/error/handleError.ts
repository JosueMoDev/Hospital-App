
import { CustomError } from "./customErrors";

export class HandlerError {
    static hasError(error: unknown) {
        if (error instanceof CustomError) {
            return { statusCode: error.statusCode, errorMessage: error.message }
        }

        console.log(`${error}`);

        return { statusCode: 500, errorMessage: 'Internal Server Error'}
    }
}