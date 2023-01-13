export class NolanError extends Error {
    expected: string | undefined;
    received: string | undefined;

    constructor(message: string, expected?: string, received?: string) {
        super();
        this.message = message;
        expected && (this.expected = expected);
        received && (this.received = received);
    }
}
