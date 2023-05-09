import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsermodelService {
  constructor(private http: HttpClient) {}
  Find(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/usermodel', {
      params: { skip, limit },
    });
  }
  SaveData(userdata: any) {
    return this.http.post(environment.apiUrl + '/usermodel', userdata);
  }
  FindbyID(id: any) {
    return this.http.get(environment.apiUrl + '/usermodel/' + id);
  }
  update(id: any, userdata: any) {
    return this.http.patch(environment.apiUrl + '/usermodel/' + id, userdata);
  }

  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/usermodel/' + id);
  }
}
