import { USER_FIELDS } from '@/modules/user/lib';
import { AUTH_FIELDS } from './constants';

export const doesConfirmPasswordMatch = ({
  password,
  confirm_password,
}: {
  [USER_FIELDS.password]: string;
  [AUTH_FIELDS.confirmPassword]: string;
}) => password === confirm_password;
