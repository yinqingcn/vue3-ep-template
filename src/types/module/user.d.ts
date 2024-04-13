declare interface LoginForm {
  username: string;
  password: string;
  captcha: string;
}
declare interface LoginResponse {
  token: string;
  id: number;
}
