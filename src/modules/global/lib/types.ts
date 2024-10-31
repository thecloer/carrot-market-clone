import { typeToFlattenedError } from 'zod';

type FormValidationError<T> = typeToFlattenedError<T, string>;

export type ErrorResponse<T> = { error: FormValidationError<T> };
