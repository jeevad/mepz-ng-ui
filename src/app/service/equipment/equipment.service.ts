import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private http: HttpClient) {}
  Load(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/equipment', {
      params: { skip, limit },
    });
  }
  SaveData(equipmentdata: any) {
    return this.http.post(environment.apiUrl + '/equipment', equipmentdata);
  }
  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/equipment/' + id);
  }
  update(id: any, equipmentdata: any) {
    return this.http.patch(
      environment.apiUrl + '/equipment/' + id,
      equipmentdata
    );
  }
  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/equipment/' + id);
  }
}
