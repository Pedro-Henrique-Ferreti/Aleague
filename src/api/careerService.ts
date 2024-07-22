import { axiosInstance } from '@/helpers/axios';

export default class CareerService {
  static getAllCareers() {
    return axiosInstance.get('/careers');
  }
}
