import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  // apiUrl = "http://13.232.11.217/api/groups";
  constructor(private http:HttpClient) { }
  Find(skip: number, limit: number){
    return this.http.get(environment.apiUrl + '/group', {params:{skip, limit}});

   }
   SaveData(groupsdata:any){
    return this.http.post(environment.apiUrl + '/group',groupsdata)

   }
   FindbyID(id:any){
    return this.http.get(environment.apiUrl + '/group/' + id)
  }
  update(id:any,groupsdata:any){
    console.log("update id",id);
    console.log("update data",groupsdata);
    return this.http.patch(environment.apiUrl+'/group/'+ id,groupsdata);
  }

  Removedata(id:any){
    return this.http.delete(environment.apiUrl + '/group/' + id);
  }
}



