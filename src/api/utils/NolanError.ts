export class NolanError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}
}
