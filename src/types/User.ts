export default interface User {
  id: string,
  username: string,
  email: string,
  emailVerifiedAt: string | null,
  avatar: string,
  createdAt: string,
  updatedAt: string,
}