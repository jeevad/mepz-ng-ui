import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  apiUrl = "http://localhost:3000/groups";
  constructor(private http:HttpClient) { }
  Find(){
    return this.http.get(this.apiUrl + '/getall');
   }
   SaveData(groupsdata:any){
    return this.http.post(this.apiUrl + '/add',groupsdata)
   }
   FindbyID(id:any){
    return this.http.get(this.apiUrl + '/' + id)
  }
  update(id:any,groupsdata:any){
    return this.http.put(this.apiUrl+'/'+ id,groupsdata);
  }
  
  Removedata(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
