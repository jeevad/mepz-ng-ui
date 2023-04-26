import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  apiUrl="http://13.232.11.217/api/package";

  constructor(private http:HttpClient) { }
  Find(){
    return this.http.get(this.apiUrl + '/getall');
   }
   SaveData(packagedata:any){
    return this.http.post(this.apiUrl + '/add',packagedata)
   }
   FindbyID(id:any){
    return this.http.get(this.apiUrl + '/' + id)
  }
  update(id:any,packagedata:any){
    return this.http.put(this.apiUrl+'/'+ id,packagedata);
  }
  Removedata(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
