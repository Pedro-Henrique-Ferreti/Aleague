export default interface User {
  id: number,
  username: string,
  email: string,
  emailVerifiedAt: string | null,
  avatar: string,
  createdAt: string,
  updatedAt: string,
}