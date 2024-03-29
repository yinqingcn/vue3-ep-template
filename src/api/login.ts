import { post } from '@/utils/http/axios';
// TEST API
export function updatePassword(data:any): Promise<any> {
  return post<any>(`/api/user/updatePassword/${data.id}`, data).then(resp => resp.data);
}
