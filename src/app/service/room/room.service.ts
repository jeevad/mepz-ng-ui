import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  equipmentNamesEmitter: any;

  constructor(private http: HttpClient) { }

  // Function to load rooms with pagination
  Load(skip: number, limit: number) {
    return this.http.get(environment.apiUrl + '/rooms', {
      params: { skip, limit },
    });
  }

  // Function to save room data
  SaveData(roomdata: any) {
    return this.http.post(environment.apiUrl + '/rooms', roomdata);
  }

  // Function to load room data by ID
  LoadbyID(id: any) {
    return this.http.get(environment.apiUrl + '/rooms/' + id);
  }

  // Function to update room data
  update(id: any, roomdata: any) {
    return this.http.patch(environment.apiUrl + '/rooms/' + id, roomdata);
  }

  // Function to remove room data
  Removedata(id: any) {
    return this.http.delete(environment.apiUrl + '/rooms/' + id);
  }

  // Function to save room data with additional project and department IDs
  saveRoomData(projectId: string, deptId: string, roomData: any) {
    const url = environment.apiUrl + `/project/addRoom/${projectId}/${deptId}`;
    return this.http.post(url, roomData);
  }

  // Function to get selected rooms for a project
  getSelectedRooms(projectId: string) {
    return this.http.get(environment.apiUrl + '/project/getRooms/' + projectId);
  }

  // Function to add room equipment with additional project, department & room IDs
  // Save equipment data for a room
  saveEquipmentData(projectId: string, deptId: string, roomId: string, roomData: any) {
    const url = environment.apiUrl + `/project/addEquipmentData/${projectId}/${deptId}/${roomId}`;
    return this.http.post(url, roomData);
  }


  // Function to get selected equipments for a project
  getSelectedEquipments(projectId: string) {
    return this.http.get(environment.apiUrl + '/project/getEquipments/' + projectId);
  }
}
