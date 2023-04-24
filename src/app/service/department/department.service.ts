import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiUrl="http://13.232.11.217/api/department";
  constructor(private http:HttpClient) { }
  Load(){
    return this.http.get(this.apiUrl + '/getall');
   }
   SaveData(departmentdata:any){
    return this.http.post(this.apiUrl + '/add',departmentdata)
   }
   LoadbyID(id:any){
    return this.http.get(this.apiUrl + '/' + id)
  }
  update(id:any,departmentdata:any){
    return this.http.put(this.apiUrl+'/'+ id,departmentdata);
  }
  Removedata(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
