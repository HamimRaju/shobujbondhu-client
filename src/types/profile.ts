export type ProfileDTO = {
  name: string;
  email: string;
  image: string | null;
  createdAt: string | null;
};

export type UpdateProfileInput = Pick<ProfileDTO, "name" | "image">;

export type ProfileFieldErrors = Partial<
  Record<keyof UpdateProfileInput, string>
>;
