import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl="http://localhost:3000/project";
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