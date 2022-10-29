import { ErrorMessage } from "../error/ErrorMessage";
import { ErrorCode } from "./../error/ErrorCode";
import { NolanError } from "./../error/NolanError";

export class FieldValidation {
	static number(num: any) {
		if (!num) {
			throw new NolanError(ErrorMessage.PARAMETER_NULL, ErrorCode.NL_S_003);
		}
		if (isNaN(num)) {
			throw new NolanError(ErrorMessage.PARAMETER_INVALID, ErrorCode.NL_S_004);
		}
	}

	static string(str: any) {
		if (!str) {
			throw new NolanError(ErrorMessage.PARAMETER_NULL, ErrorCode.NL_S_003);
		}
		if (Object.prototype.toString.call(str) !== "[object String]") {
			throw new NolanError(ErrorMessage.PARAMETER_INVALID, ErrorCode.NL_S_004);
		}
	}

	
}
