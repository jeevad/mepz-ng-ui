import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // apiUrl="http://localhost:3000/currency";
  constructor(private http:HttpClient) { }
   Find( skip: number, limit: number){
    return this.http.get(environment.apiUrl + '/currency', {params:{skip, limit}})
   }
   SaveData(currencyData:any){
    return this.http.post(environment.apiUrl + '/currency',currencyData)
   }
   FindbyID(id:any){
    return this.http.get(environment.apiUrl + '/currency/' + id)
  }
  update(id:any,currencyData:any){
    console.log("update id",id);
    console.log("update data",currencyData);
    return this.http.patch(environment.apiUrl+'/currency/'+ id,currencyData);
  }
  Removedata(id:any){
    return this.http.delete(environment.apiUrl + '/currency/' + id);
  }
}
