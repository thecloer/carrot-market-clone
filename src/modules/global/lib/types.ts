import { typeToFlattenedError } from 'zod';

type allKeys<T> = T extends unknown ? keyof T : never;
type FormValidationError<T> = typeToFlattenedError<T, string>;

interface FormError<T> {
  errors: FormValidationError<T>;
}

interface FormFieldValues<T> {
  fieldValues: { [P in allKeys<T>]?: T[P] };
}

export interface ActionErrorResponse<T> extends FormError<T>, FormFieldValues<T> {}
