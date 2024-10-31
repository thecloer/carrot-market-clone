export const USER_FIELDS = {
  username: 'username',
  email: 'email',
  password: 'password',
  phone: 'phone',
} as const;

export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MAX_LENGTH = 20;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).+$/;
