import { post } from '@/utils/http/axios';

export function login(loginForm: LoginForm): Promise<LoginResponse> {
  return post<LoginResponse>('/base/api/v1/login', loginForm).then(
    (resp) => resp.data,
  );
}
