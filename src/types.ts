export interface User {
  id: string;
  username: string;
  password?: string; // Optional since JWT might not include it
}
