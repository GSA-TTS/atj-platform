type Success<T> = { success: true; data: T };
type VoidSuccess = { success: true };
type Failure<E> = { success: false; error: E };
type Result<T, E = string> = Success<T> | Failure<E>;
type VoidResult<E = string> = VoidSuccess | Failure<E>;
