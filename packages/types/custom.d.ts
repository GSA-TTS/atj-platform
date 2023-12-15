type Success<T> = { success: true; data: T };
type Failure<E> = { success: false; error: E };
type Result<T, E = string> = Success<T> | Failure<E>;
