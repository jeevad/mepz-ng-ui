import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsermodelService {
  constructor(private http: HttpClient) {}
  find(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/users', {
      params: { skip, limit },
    });
  }
  SaveData(userdata: any) {
    return this.http.post(environment.apiUrl + '/users', userdata);
  }
  FindbyID(id: any) {
    return this.http.get(environment.apiUrl + '/users/' + id);
  }
  update(id: any, userdata: any) {
    return this.http.patch(environment.apiUrl + '/users/' + id, userdata);
  }

  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/users/' + id);
  }
}
