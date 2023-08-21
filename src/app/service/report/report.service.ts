import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export const REPORT_TYPE = [
  {
    title: 'equipment-location-listing',
    key: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  {
    title: 'department-list',
    key: 'department-list',
    format: ['pdf', 'excel'],
  },
  {
    title: 'room-listing',
    key: 'room-listing',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-bq',
    key: 'equipment-listing-bq',
    format: ['pdf', 'excel'],
  },
  {
    title: 'disabled-equipment-listing-bq',
    key: '',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-by-department',
    key: 'equipment-listing-by-department',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-by-department-and-room',
    key: 'equipment-listing-by-department-and-room',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-by-department-and-room-disabled',
    key: 'equipment-listing-by-department-and-room-disabled',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-room-to-room-variation',
    key: 'equipment-room-to-room-variation',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-by-floor',
    key: 'equipment-listing-by-floor',
    format: ['pdf', 'excel'],
  },
  {
    title: 'power-requirement',
    key: 'power-requirement',
    format: ['pdf', 'excel'],
  },
  {
    title: 'power-requirement-for-rds',
    key: 'power-requirement-for-rds',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-for-rds',
    key: 'equipment-listing-for-rds',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-specs',
    key: 'equipment-specs',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-brands',
    key: 'equipment-brands',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-bq-by-group',
    key: 'equipment-listing-bq-by-group',
    format: ['pdf', 'excel'],
  },
  {
    title: 'summary-of-equipment-variation',
    key: 'summary-of-equipment-variation',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-location-listing-by-group',
    key: 'equipment-location-listing-by-group',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-by-department-by-group',
    key: 'equipment-listing-by-department-by-group',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-by-department-and-room-by-group',
    key: 'equipment-listing-by-department-and-room-by-group',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-bq-with-utility',
    key: 'equipment-listing-bq-with-utility',
    format: ['pdf', 'excel'],
  },
  {
    title: 'equipment-listing-by-department-and-room-with-utility',
    key: 'equipment-listing-by-department-and-room-with-utility',
    format: ['pdf', 'excel'],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getEquipmentReports(params: {
    projectId: string;
    reportType: string;
    format: string;
    roomId?: any[];
    group?: any[];
  }) {
    let room: any = [];
    params?.roomId?.forEach((item: any, i: number) => {
      room[`roomId[${i}]`] = item;
    });
    let group: any = [];
    params?.group?.forEach((item: any, i: number) => {
      room[`group[${i}]`] = item;
    });
    delete params.roomId;
    delete params.group;
    params = { ...params, ...room, ...group };
    return this.http.get(environment.apiUrl + '/reports/getEquipmentReports', {
      params: params,
      responseType: 'blob',
    });
  }
}
