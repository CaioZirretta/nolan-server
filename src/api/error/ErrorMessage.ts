export enum ErrorMessage {
    UNKNOWN_ERROR = "Unknown error",
    MOVIES_NOT_FOUND = "No movies were found",
    MOVIE_NOT_FOUND = "Movie not found",
    ROOMS_NOT_FOUND = "No rooms were found",
    ROOM_NOT_FOUND = "Room not found",
    ROOM_ALREADY_EXISTS = "Room already exists",
    SESSIONS_NOT_FOUND = "No sessions were found",
    SESSION_NOT_FOUND = "Session not found",
    SESSION_BY_ROOM_NOT_FOUND = "No sessions were found by given room",
    SESSION_IN_GIVEN_TIME_ALREADY_EXISTS = 'Session in given time already exists',
    PARAMETER_NULL = "Parameter has a null value",
    PARAMETER_INVALID = "Parameter has a invalid type",
    PARAMETER_ARRAY_SHORT = "Parameter has not a minimum required length",
    PARAMETER_INVALID_SIZE = "Parameter has a invalid size",
    VERIFICATION_INVALID = "Invalid verification type",
    USER_NOT_FOUND = "User not found",
    PASSWORD_INCORRECT = "Password incorrect",
    USER_ALREADY_REGISTERED = "User already registered",
    NOT_AUTHENTICATED = "Subject not authenticated",
    MISSING_AUTH = "Authentication not found",
    DATE_ISO_REQUIRED = "Date must be in ISO format",
    MOVIE_NAME_TOO_LARGE = "Movie name must be of a maximum length of 36",
    MOVIE_WRONG_NAME = "Movie name does not match",
    GLOBALPARAMETER_NOT_FOUND = "Global parameter not found",
    GLOBALPARAMETER_ALREADY_EXISTS = "Global parameter already exists",
    ORIGIN_NOT_ALLOWED = "Access origin not allowed",
}
