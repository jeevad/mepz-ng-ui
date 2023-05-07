import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  // apiUrl="http://13.232.11.217/api/utility";

  constructor(private http:HttpClient) { }
  Find(skip: number, limit: number){
    return this.http.get(environment.apiUrl + '/utility',  {params:{skip, limit}});
   }
   SaveData(utilitydata:any){
    return this.http.post(environment.apiUrl + '/utility',utilitydata)
   }
   FindbyID(id:any){
    return this.http.get(environment.apiUrl + '/utility/' + id)
  }
  update(id:any,utilitydata:any){
    console.log("update id",id);
    console.log("update data",utilitydata);
    return this.http.patch(environment.apiUrl+'/utility/'+ id,utilitydata);
  }

  Removedata(id:any){
    return this.http.delete(environment.apiUrl + '/utility/' + id);

  }
}
