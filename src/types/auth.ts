export type AuthenticatedUserDTO = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
};

export type AuthenticatedSessionDTO = {
  id: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
};

export type AuthenticatedSessionResponse = {
  user: AuthenticatedUserDTO;
  session: AuthenticatedSessionDTO;
};
