import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // apiUrl="http://13.232.11.217/api/department";
  constructor(private http:HttpClient) { }
  Load(skip: number, limit: number){
        return this.http.get(environment.apiUrl + '/department', {params:{skip, limit}});
   }
   SaveData(departmentdata:any){
  return this.http.post(environment.apiUrl + '/department',departmentdata)
   }
   LoadbyID(id:any){
    return this.http.get(environment.apiUrl + '/department/' + id)
  }
  update(id:any,departmentdata:any){
    console.log("update id",id);
    console.log("update data",departmentdata);
    return this.http.patch(environment.apiUrl+'/department/'+ id,departmentdata);
  }
  Removedata(id:any){
        return this.http.delete(environment.apiUrl + '/department/' + id);
  }
}
