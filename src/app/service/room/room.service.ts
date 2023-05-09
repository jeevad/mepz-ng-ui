import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}
  Load(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/rooms', {
      params: { skip, limit },
    });
  }
  SaveData(roomdata: any) {
    return this.http.post(environment.apiUrl + '/rooms', roomdata);
  }
  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/rooms/' + id);
  }
  update(id: any, roomdata: any) {
    return this.http.patch(environment.apiUrl + '/rooms/' + id, roomdata);
  }

  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/rooms/' + id);
  }
}
