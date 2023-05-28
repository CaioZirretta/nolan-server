export enum ErrorMessage {
	MOVIES_NOT_FOUND = "No movies were found",								// 01
	MOVIE_NOT_FOUND = "Movie not found",									// 02 
	PARAMETER_NULL = "Parameter has a null value",							// 03 
	PARAMETER_INVALID = "Parameter has a invalid type",						// 04
	PARAMETER_ARRAY_SHORT = "Parameter has not a minimum required length",	// 05
	PARAMETER_INVALID_SIZE = "Parameter has a invalid size",				// 06
	VERIFICATION_INVALID = "Invalid verification type",						// 07
	USER_NOT_FOUND = "User not found",										// 08
	PASSWORD_INCORRECT = "Password incorrect",								// 09
	USER_ALREADY_REGISTERED = "User already registered",					// 10
    NOT_AUTHENTICATED = "Subject not authenticated",						// 11
    MISSING_AUTH = "Authentication not found",								// 12
	DATE_ISO_REQUIRED = "Date must be in ISO format" 						// 13,
}
