import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjecttemplateService {
  constructor(private http: HttpClient) {}
  Load(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/projecttemplate', {
      params: { skip, limit },
    });
  }
  SaveData(projectTempData: any) {
    return this.http.post(
      environment.apiUrl + '/projecttemplate',
      projectTempData
    );
  }
  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/projecttemplate/' + id);
  }
  update(id: any, projectTempData: any) {
    return this.http.patch(
      environment.apiUrl + '/projecttemplate/' + id,
      projectTempData
    );
  }

  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/projecttemplate/' + id);
  }
}
