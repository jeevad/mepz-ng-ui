import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export const REPORT_TYPE = {
  'equipment-location-listing': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'department-list': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'room-listing': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-bq': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'disabled-equipment-listing-bq': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-by-department': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-by-department-and-room': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-by-department-and-room-disabled': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-room-to-room-variation': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-by-floor': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'power-requirement': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'power-requirement-for-rds': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-for-rds': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-specs': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-brands': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-bq-by-group': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'summary-of-equipment-variation': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-location-listing-by-group': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-by-department-by-group': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-by-department-and-room-by-group': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-bq-with-utility': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
  'equipment-listing-by-department-and-room-with-utility': {
    title: 'equipment-location-listing',
    format: ['pdf', 'excel'],
  },
};

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getEquipmentReports(params: {
    projectId: string;
    reportType: string;
    format: string;
  }) {
    // ?projectId=648977116be3d0e6681effcf&reportType=equipment-listing-by-department
    return this.http.get(environment.apiUrl + '/reports/getEquipmentReports', {
      params: params,
      responseType: 'blob',
    });
  }
}
