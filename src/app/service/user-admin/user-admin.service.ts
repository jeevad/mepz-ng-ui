import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserAdminService {
  groupname: string[] = [];
 groupNames: string[] = [];
  constructor(private http: HttpClient) {}

  fetchGroupNames() {
    return this.http.get(environment.apiUrl + '/admingroup').pipe(
      map((response: any) => response.results.map((item: any) => item.groupname))
    );
  }

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
