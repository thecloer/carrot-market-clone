export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export const DB = {
  users: new Map<User['id'], User>(),
};
