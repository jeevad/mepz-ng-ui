import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

interface FilterEquipmentDto {
  projectId: string[];
  departmentId?: string;
  roomId?: string;
  searchInput?: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  Load(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/project', {
      params: { skip, limit },
    });
  }
  SaveData(departmentdata: any) {
    return this.http.post(environment.apiUrl + '/project', departmentdata);
  }
  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/project/' + id);
  }
  update(id: any, departmentdata: any) {
    return this.http.patch(
      environment.apiUrl + '/project/' + id,
      departmentdata
    );
  }
  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/project/' + id);
  }

  getEquipments(projectId: string, skip: number, limit: number) {
    return this.http.get(
      environment.apiUrl + '/project/getProjectEquipments/' + projectId,
      {
        params: { skip, limit },
      }
    );
  }

  getAllEquipments(skip: number, limit: number, filterEquipmentDto: FilterEquipmentDto){
    return this.http.get(
      environment.apiUrl + '/project/getAllEquipments',
      {
        params: { skip, limit, ...filterEquipmentDto },
      }
    );
  }

  // getAllEquipments(skip: number, limit: number,){
  //   return this.http.get(
  //     environment.apiUrl + '/project/getAllEquipments',
  //     {
  //       params: { skip, limit,  },
  //     }
  //   );
  // }

  saveProjectField(projectId: string, data: any) {
    return this.http.post(
      environment.apiUrl + '/project/updateProjectFields/' + projectId,
      data
    );
  }
}
