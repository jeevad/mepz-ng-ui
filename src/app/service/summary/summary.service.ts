import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  // environment.apiUrl="http://localhost:3000/rooms";

  constructor(private http:HttpClient) { }
  Find(skip: number, limit: number){
    return this.http.get(environment.apiUrl + '/rooms', {params:{skip, limit}});
   }
   SaveData(summaryData:any){
    return this.http.post(environment.apiUrl + '/rooms',summaryData)
   }
   LoadbyID(id:any){
    return this.http.get(environment.apiUrl + '/rooms/' + id)
  }
  update(id:any,summaryData:any){
    console.log("update id",id);
    console.log("update data",summaryData);
    return this.http.patch(environment.apiUrl+'/rooms/'+ id,summaryData);
  }
  // update(summaryData:any){
  //   return this.http.patch(this.environment.apiUrl+'/'+ summaryData.id,summaryData);
  // }
  Removedata(id:any){
    return this.http.delete(environment.apiUrl + '/rooms/' + id);
  }
}


