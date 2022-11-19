import { ErrorMessage } from "../error/ErrorMessage";
import { ErrorCode } from "./../error/ErrorCode";
import { NolanError } from "./../error/NolanError";

type FieldValidationArgument = {
	fields: [
		{
			value: any;
			validation: string;
		}
	];
};

export function fieldValidation(target: FieldValidationArgument) {
	target.fields.forEach((field) => {
		switch (field.validation) {
			case "int":
				isInt(field.value);
				break;
			case "float":
				isFloat(field.value);
				break;
			case "string":
				isString(field.value);
				break;
			case "array":
				isArray(field.value);
				break;
			case "length":
				let min = field.value.min ?? undefined;
				hasLength(field.value, field.value.length, min);
		}
	});
}

const isInt = (num: any) => {
	if (!num) {
		throw new NolanError(ErrorMessage.PARAMETER_NULL, ErrorCode.NL_S_003);
	}
	if (isNaN(num)) {
		throw new NolanError(ErrorMessage.PARAMETER_INVALID, ErrorCode.NL_S_004);
	}
};
const isFloat = (num: any) => {
	if (!num) {
		throw new NolanError(ErrorMessage.PARAMETER_NULL, ErrorCode.NL_S_003);
	}
	if (isNaN(num)) {
		throw new NolanError(ErrorMessage.PARAMETER_INVALID, ErrorCode.NL_S_004);
	}
};

const isString = (str: any) => {
	if (!str) {
		throw new NolanError(ErrorMessage.PARAMETER_NULL, ErrorCode.NL_S_003);
	}
	if (Object.prototype.toString.call(str) !== "[object String]") {
		throw new NolanError(ErrorMessage.PARAMETER_INVALID, ErrorCode.NL_S_004);
	}
};

const isArray = (array: any[]) => {
	if (array.length === 0) {
		throw new NolanError(ErrorMessage.PARAMETER_NULL, ErrorCode.NL_S_003);
	}
};

const hasLength = (array: any[], target: number, min?: number) => {};
