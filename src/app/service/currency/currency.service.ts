import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiUrl="http://13.232.11.217/api/currency";
  constructor(private http:HttpClient) { }
   Find(){
    return this.http.get(this.apiUrl + '/getall');
   }
   SaveData(currencyData:any){
    console.log(currencyData);
    return this.http.post(this.apiUrl + '/add',currencyData)
   }
   FindbyID(id:any){
    return this.http.get(this.apiUrl + '/' + id)
  }
  update(id:any,currencyData:any){
    return this.http.put(this.apiUrl+'/'+ id,currencyData);
  }
  Removedata(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
