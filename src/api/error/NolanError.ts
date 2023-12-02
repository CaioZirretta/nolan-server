import { ErrorMessage } from "./ErrorMessage";
import { ErrorCode } from "./ErrorCode";

export class NolanError extends Error {
    constructor(public error: string = ErrorMessage.UNKNOWN_ERROR,
                public code: string = ErrorCode.UNKNOWN_ERROR_CODE,
                public details?: string) {
        super();
    }
}
