import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiUrl="http://13.232.11.217/api/room";

  constructor(private http:HttpClient) { }
  Load(){
    return this.http.get(this.apiUrl + '/getall');
   }
   SaveData(roomdata:any){
    return this.http.post(this.apiUrl + '/add',roomdata)
   }
   LoadbyID(id:any){
    return this.http.get(this.apiUrl + '/' + id)
  }
  update(id:any,roomdata:any){
    console.log("update id",id);
    console.log("update data",roomdata);
    return this.http.put(this.apiUrl+'/'+ id,roomdata);
  }
  // update(roomdata:any){
  //   return this.http.put(this.apiUrl+'/'+ roomdata.id,roomdata);
  // }
  Removedata(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
