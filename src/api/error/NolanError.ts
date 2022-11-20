export class NolanError extends Error {
	code: string;
	expected: string | null;
	
	constructor(message: string, code: string, expected?: string) {
		super();
		this.message = message;
		this.code = code;
		this.expected = expected ?? null;
	}
}
