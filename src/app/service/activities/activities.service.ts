import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}
  LoadGroupData(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/admingroup', {
      params: { skip, limit },
    });
  }

  SaveGroupData(activityData: any) {
    return this.http.post(environment.apiUrl + '/admingroup', activityData);
  }

  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/admingroup/' + id);
  }
  update(id: any, activityData: any) {
    return this.http.patch(
      environment.apiUrl + '/admingroup/' + id,
      activityData
    );
  }
  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/admingroup/' + id);
  }
}
