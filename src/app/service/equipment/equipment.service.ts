import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  // apiUrl="http://13.232.11.217/api/equipment";

  constructor(private http:HttpClient) { }
  Load(skip: number, limit: number){
    return this.http.get(environment.apiUrl + '/equipment',  {params:{skip, limit}});
   }
   SaveData(equipmentdata:any){
    return this.http.post(environment.apiUrl + '/equipment',equipmentdata)
   }
   LoadbyID(id:any){
    return this.http.get(environment.apiUrl + '/equipment/' + id)
  }
  update(id:any,equipmentdata:any){
    console.log("update id",id);
    console.log("update data",equipmentdata);
    return this.http.patch(environment.apiUrl+'/equipment/'+ id,equipmentdata);
  }
  Removedata(id:any){
    return this.http.delete(environment.apiUrl + '/equipment/' + id);
  }
}
