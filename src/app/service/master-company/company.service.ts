import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiUrl="http://13.232.11.217/api/company";
  constructor(private http:HttpClient) { }
  Find(){
    return this.http.get(this.apiUrl + '/getall');
   }
  SaveData(data:any){
    return this.http.post(this.apiUrl + '/add',data)
  }
 FindbyID(id:any){
    return this.http.get(this.apiUrl + '/' + id)
  }
  update(id:any,data:any){
    console.log("update the form")
    return this.http.put(this.apiUrl+'/'+ id,data);
  }
  Removedata(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
