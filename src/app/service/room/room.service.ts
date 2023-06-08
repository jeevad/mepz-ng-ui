import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  equipmentNamesEmitter: any;

  constructor(private http: HttpClient) {}

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
  saveRoomData(roomData: any) {
    console.log('roomData:', roomData);
    // const projectId = '64735b04ef112ca4b26872ca';
    const projectId = '647099f81d7513b34418f744';
    // const departmentId = '64735c1def112ca4b268730e';
    const departmentId = '6481b8f4bcf2bf4cfef8d313';
    const url = environment.apiUrl + `/project/addRoom/${projectId}/${departmentId}`;
    return this.http.post(url, roomData);
  }

  // Function to add room equipment with additional project, department & room IDs
  saveEquipmentData(roomData: any) {
    const projectId = '647099f81d7513b34418f744';
    // const projectId = '64735b04ef112ca4b26872ca';
    // const departmentId = '64735c1def112ca4b268730e';
    const departmentId = '6481b8f4bcf2bf4cfef8d313';
    const roomId = '6481bc21bcf2bf4cfef8d94d';
    // const roomId = '647443dccdce2fe2106eefc3';
    const url = environment.apiUrl + `/project/addRoomEquipment/${projectId}/${departmentId}/${roomId}`;
    return this.http.post(url, roomData);
  }

  // Function to get selected rooms for a project
  getSelectedRooms() {
    // const projectId = '64735b04ef112ca4b26872ca';
    const projectId = '647099f81d7513b34418f744';
    return this.http.get(environment.apiUrl + '/project/getRooms/' + projectId);
  }

  // Function to get selected equipments for a project
  getSelectedEquipments() {
    // const projectId = '64735b04ef112ca4b26872ca';
    const projectId = '647099f81d7513b34418f744';
    return this.http.get(environment.apiUrl + '/project/getEquipments/' + projectId);
  }
}
