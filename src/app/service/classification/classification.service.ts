import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  constructor(private http: HttpClient) {}
  Find(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/classification', {
      params: { skip, limit },
    });
  }
  SaveData(classificationdata: any) {
    return this.http.post(
      environment.apiUrl + '/classification',
      classificationdata
    );
  }
  FindbyID(id: any) {
    return this.http.get(environment.apiUrl + '/classification/' + id);
  }
  update(id: any, classificationdata: any) {
    return this.http.patch(
      environment.apiUrl + '/classification/' + id,
      classificationdata
    );
  }
  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/classification/' + id);
  }
}
