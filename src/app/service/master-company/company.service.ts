import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  // environment.apiUrl="http://localhost:3000/company";

  constructor(private http:HttpClient) { }
  Load(skip: number, limit: number){
    return this.http.get(environment.apiUrl + '/company', {params:{skip, limit}});
   }
   SaveData(departmentdata:any){
    return this.http.post(environment.apiUrl + '/company',departmentdata)
   }
   LoadbyID(id:any){
    return this.http.get(environment.apiUrl + '/company/' + id)
  }
  update(id:any,departmentdata:any){
    console.log("update id",id);
    console.log("update departmentdata",departmentdata);
    return this.http.patch(environment.apiUrl+'/company/'+ id,departmentdata);
  }
  // update(departmentdata:any){
  //   return this.http.patch(this.environment.apiUrl+'/'+ departmentdata.id,departmentdata);
  // }
  Removedata(id:any){
    return this.http.delete(environment.apiUrl + '/company/' + id);
  }
}


