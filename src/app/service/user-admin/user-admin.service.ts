import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAdminService {
  constructor(private http: HttpClient) {}
  LoadFormData(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/usermodel', {
      params: { skip, limit },
    });
  }

  SaveUserData(formData: any) {
    return this.http.post(environment.apiUrl + '/usermodel', formData);
  }

  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/usermodel/' + id);
  }
  update(id: any, formData: any) {
    return this.http.patch(environment.apiUrl + '/usermodel/' + id, formData);
  }
  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/usermodel/' + id);
  }
}
