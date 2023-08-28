import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export const REPORT_TYPE = [
  {
    title: 'equipment-location-listing',
    key: 'equipment-location-listing',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'department-list',
    key: 'department-list',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-by-floor',
      title: 'PDF by Floor'
    },{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'room-listing',
    key: 'room-listing',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-by-floor',
      title: 'PDF by Floor'
    },{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'equipment-listing-bq',
    key: 'equipment-listing-bq',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-with-price',
      title: 'PDF with price'
    },{
      key: 'excel',
      title: 'Excel'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'disabled-equipment-listing-bq',
    key: '',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-with-price',
      title: 'PDF with price'
    },{
      key: 'excel',
      title: 'Excel'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'equipment-listing-by-department',
    key: 'equipment-listing-by-department',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page-with-price',
      title: 'PDF 1 page with price'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'excel',
      title: 'Excel'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'equipment-listing-by-department-and-room',
    key: 'equipment-listing-by-department-and-room',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'pdf-1-page-w-sign',
      title: 'PDF 1 Page(w/sign)'
    },{
      key: 'pdf-1-page-with-price',
      title: 'PDF 1 page with price'
    },{
      key: 'excel',
      title: 'Excel'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'equipment-listing-by-department-and-room-disabled',
    key: 'equipment-listing-by-department-and-room-disabled',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'pdf-1-page-w-sign',
      title: 'PDF 1 Page(w/sign)'
    },{
      key: 'pdf-1-page-with-price',
      title: 'PDF 1 page with price'
    },{
      key: 'excel',
      title: 'Excel'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'equipment-room-to-room-variation',
    key: 'equipment-room-to-room-variation',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'pdf-1-page-with-price',
      title: 'PDF 1 page with price'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'equipment-listing-by-floor',
    key: 'equipment-listing-by-floor',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'power-requirement',
    key: 'power-requirement',
    format: [{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'power-requirement-for-rds',
    key: 'power-requirement-for-rds',
    format: [{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'equipment-listing-for-rds',
    key: 'equipment-listing-for-rds',
    format: [{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'equipment-specs',
    key: 'equipment-specs',
    format: [{
      key: 'pdf',
      title: 'PDF'
    }],
  },
  {
    title: 'equipment-brands',
    key: 'equipment-brands',
    format: [{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'equipment-listing-bq-by-group',
    key: 'equipment-listing-bq-by-group',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'pdf-1-page-with-price',
      title: 'PDF 1 page with price'
    },{
      key: 'excel',
      title: 'Excel'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'summary-of-equipment-variation',
    key: 'summary-of-equipment-variation',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'pdf-1-page-with-price',
      title: 'PDF 1 page with price'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'equipment-location-listing-by-group',
    key: 'equipment-location-listing-by-group',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'equipment-listing-by-department-by-group',
    key: 'equipment-listing-by-department-by-group',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'pdf-1-page-with-price',
      title: 'PDF 1 page with price'
    },{
      key: 'excel',
      title: 'Excel'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'equipment-listing-by-department-and-room-by-group',
    key: 'equipment-listing-by-department-and-room-by-group',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'pdf-1-page-w-sign',
      title: 'PDF 1 Page(w/sign)'
    },{
      key: 'pdf-1-page-with-price',
      title: 'PDF 1 page with price'
    },{
      key: 'excel',
      title: 'Excel'
    },{
      key: 'excel-with-price',
      title: 'Excel with price'
    }],
  },
  {
    title: 'equipment-listing-bq-with-utility',
    key: 'equipment-listing-bq-with-utility',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'excel',
      title: 'Excel'
    }],
  },
  {
    title: 'equipment-listing-by-department-and-room-with-utility',
    key: 'equipment-listing-by-department-and-room-with-utility',
    format: [{
      key: 'pdf',
      title: 'PDF'
    },{
      key: 'pdf-1-page',
      title: 'PDF 1 Page'
    },{
      key: 'pdf-1-page-w-sign',
      title: 'PDF 1 Page(w/sign)'
    },{
      key: 'excel',
      title: 'Excel'
    }],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) { }

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
