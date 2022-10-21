export class NolanError extends Error {
	code: string;
	constructor(message: string, code: string) {
		super();
		this.message = message;
		this.code = code;
	}
}
