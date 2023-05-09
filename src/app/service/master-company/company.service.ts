import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}
  Load(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/company', {
      params: { skip, limit },
    });
  }
  SaveData(departmentdata: any) {
    return this.http.post(environment.apiUrl + '/company', departmentdata);
  }
  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/company/' + id);
  }
  update(id: any, departmentdata: any) {
    return this.http.patch(
      environment.apiUrl + '/company/' + id,
      departmentdata
    );
  }

  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/company/' + id);
  }
}
