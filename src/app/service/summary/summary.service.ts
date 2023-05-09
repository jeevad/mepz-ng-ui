import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  constructor(private http: HttpClient) {}
  Find(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/rooms', {
      params: { skip, limit },
    });
  }
  SaveData(summaryData: any) {
    return this.http.post(environment.apiUrl + '/rooms', summaryData);
  }
  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/rooms/' + id);
  }
  update(id: any, summaryData: any) {
    return this.http.patch(environment.apiUrl + '/rooms/' + id, summaryData);
  }

  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/rooms/' + id);
  }
}
