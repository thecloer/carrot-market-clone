import type { typeToFlattenedError } from 'zod';

type allKeys<T> = T extends unknown ? keyof T : never;
type FormValidationError<T> = typeToFlattenedError<T, string>;

export interface FormError<T> {
  errors: FormValidationError<T>;
}
interface FormFieldValues<T> {
  fieldValues: { [P in allKeys<T>]?: T[P] };
}
export interface ActionErrorResponse<T> extends FormError<T>, FormFieldValues<T> {}

export type ExcludeNull<T> = T extends null ? never : T;
export type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
