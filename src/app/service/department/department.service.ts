import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  // Load departments with skip and limit parameters
  Load(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/department', {params: { skip, limit }, });
  }


  // Save department data
  SaveData(departmentdata: any) {
    return this.http.post(environment.apiUrl + '/department', departmentdata);
  }

  // Load department data by ID
  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/department/' + id);
  }

  // Update department data by ID
  update(id: any, departmentdata: any) {
    return this.http.patch(
      environment.apiUrl + '/department/' + id,
      departmentdata
    );
  }

  // Remove department data by ID
  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/department/' + id);
  }

  // Save departments for a project
  saveDepartments(departmentData: any) {
    // const projectId = '64735b04ef112ca4b26872ca';
    const projectId = '647099f81d7513b34418f744';
    const departments = departmentData.departments;
    return this.http.post(
      environment.apiUrl + '/project/addDepartment/' + projectId,
      departments
    );
  }

   // Get selected departments for a project | Listing
   getSelectedDepartments(skip: number, limit: number) {
    const projectId = '647099f81d7513b34418f744';
    // const projectId = '64735b04ef112ca4b26872ca';
    return this.http.get(environment.apiUrl + '/project/getDepartments/' + projectId, {params: { skip, limit }, });
  }

}
