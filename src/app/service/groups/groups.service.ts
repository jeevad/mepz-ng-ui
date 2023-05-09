import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient) {}
  Find(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/group', {
      params: { skip, limit },
    });
  }
  SaveData(groupsdata: any) {
    return this.http.post(environment.apiUrl + '/group', groupsdata);
  }
  FindbyID(id: any) {
    return this.http.get(environment.apiUrl + '/group/' + id);
  }
  update(id: any, groupsdata: any) {
    return this.http.patch(environment.apiUrl + '/group/' + id, groupsdata);
  }

  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/group/' + id);
  }
}
