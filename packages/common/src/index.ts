export type Success<T> = { success: true; data: T };
export type VoidSuccess = { success: true };
export type Failure<E> = { success: false; error: E };
export type Result<T, E = string> = Success<T> | Failure<E>;
export type VoidResult<E = string> = VoidSuccess | Failure<E>;
