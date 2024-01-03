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

  Load(skip: number, limit: number, projectType: string) {
    return this.http.get(environment.apiUrl + '/project', {
      params: { skip, limit, projectType },
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

  updateAccessLevel(payload: any) {
    return this.http.patch(
      environment.apiUrl + '/project/updateAccessLevel',
      payload
    );
  }

  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/project/' + id);
  }

  getEquipments(projectId: string, params: any) {
    let filters: any = [];
    // console.log('params.filters--------', params.filters);
    // console.log('params.filters', typeof params.filters);

    // if (Array.isArray(params.filters)) {
    // data.filters.forEach((filter: any) => {});
    params.filters.forEach((item: any, i: number) => {
      if (item['department']) {
        filters[`departments[${i}]`] = item['department'];
      }
      if (item['equipment']) {
        filters[`equipments[${i}]`] = item['equipment'];
      }
      if (item['room']) {
        filters[`rooms[${i}]`] = item['room'];
      }
    });
    delete params.filters;
    // }

    return this.http.get(
      environment.apiUrl + '/project/getProjectEquipments/' + projectId,
      {
        params: { ...params, ...filters },
      }
    );
  }

  // Function to get selected equipments for a project
  getProjectEquipments(projectId: string, deptId: string, roomId: string) {
    const url =
      environment.apiUrl +
      `/project/getEquipments/${projectId}/${deptId}/${roomId}`;
    return this.http.get(url);
  }

  getAllEquipments(filterEquipmentDto: any) {
    let proj: any = [];
    if (Array.isArray(filterEquipmentDto.projectId)) {
      filterEquipmentDto.projectId.forEach((item: any, i: number) => {
        proj[`projectIds[${i}]`] = item;
      });
      delete filterEquipmentDto.projectId;
    }

    return this.http.get(environment.apiUrl + '/project/getAllEquipments', {
      params: { ...filterEquipmentDto, ...proj },
    });
  }

  getAllRooms(skip: number, limit: number, filterEquipmentDto: any) {
    let proj: any = [];
    filterEquipmentDto.projectId.forEach((item: any, i: number) => {
      proj[`projectId[${i}]`] = item;
    });

    delete filterEquipmentDto.projectId;
    return this.http.get(environment.apiUrl + '/project/getAllRooms', {
      params: { skip, limit, ...filterEquipmentDto, ...proj },
    });
  }

  saveProjectField(projectId: string, data: any) {
    return this.http.post(
      environment.apiUrl + '/project/updateProjectFields/' + projectId,
      data
    );
  }

  updateEquipmentFields(equipmentId: string, data: any) {
    return this.http.post(
      environment.apiUrl + '/project/updateEquipmentFields/' + equipmentId,
      data
    );
  }

  //new test
  getDepartmentEquipments(projectId: string, departmentId: string) {
    return this.http.get(
      environment.apiUrl + '/project/getDepartmentEquipments',
      {
        params: { projectId, departmentId },
      }
    );
  }
}
