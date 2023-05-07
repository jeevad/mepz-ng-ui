import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // apiUrl="http://13.232.11.217/api/company";
  constructor(private http:HttpClient) { }
  Find(skip: number, limit: number){
        return this.http.get(environment.apiUrl + '/company', {params:{skip, limit}});
   }
  SaveData(data:any){
      return this.http.post(environment.apiUrl + '/company',data)
  }
 FindbyID(id:any){
    return this.http.get(environment.apiUrl + '/company/' + id)
  }
  update(id:any,data:any){
    console.log("update id",id);
    console.log("update data",data);
    return this.http.patch(environment.apiUrl+'/company/'+ id,data);
  }
  Removedata(id:any){
     return this.http.delete(environment.apiUrl + '/company/' + id);
  }
}
