import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupService {

  apiUrl="http://13.232.11.217/api/group";
  constructor(private http:HttpClient) {

   }
   LoadGroupData(){
    return this.http.get(this.apiUrl + '/getall');
   }

   SaveGroupData(groupdata:any){
    return this.http.post(this.apiUrl + '/add',groupdata)
   }

  LoadbyID(id:any){
    return this.http.get(this.apiUrl + '/' + id)
  }
  update(id:any,groupdata:any){
    console.log("update id",id);
    console.log("update data",groupdata);
    return this.http.put(this.apiUrl+'/'+ id,groupdata);
  }
  Removedata(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
