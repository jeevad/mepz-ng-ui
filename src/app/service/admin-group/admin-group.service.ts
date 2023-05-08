import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupService {

  // apiUrl="http://13.232.11.217/api/admingroup";
  constructor(private http:HttpClient) {

   }
   LoadGroupData(skip: number, limit: number){
    return this.http.get(environment.apiUrl + '/admingroup', {params:{skip, limit}});
   }

   SaveGroupData(groupdata:any){
    return this.http.post(environment.apiUrl + '/admingroup',groupdata)
   }

  LoadbyID(id:any){
    return this.http.get(environment.apiUrl + '/admingroup/' + id)
  }
  update(id:any,groupdata:any){
    console.log("update id",id);
    console.log("update data",groupdata);
    return this.http.patch(environment.apiUrl+'/admingroup/'+ id,groupdata);
  }
  Removedata(id:any){
    return this.http.delete(environment.apiUrl + '/admingroup/' + id);
  }
}
