import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private http: HttpClient) {}
  Find(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/package', {
      params: { skip, limit },
    });
  }
  SaveData(packagedata: any) {
    return this.http.post(environment.apiUrl + '/package', packagedata);
  }
  FindbyID(id: any) {
    return this.http.get(environment.apiUrl + '/package/' + id);
  }
  update(id: any, packagedata: any) {
    return this.http.patch(environment.apiUrl + '/package/' + id, packagedata);
  }
  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/package/' + id);
  }
}
