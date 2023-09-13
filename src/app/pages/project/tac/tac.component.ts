import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '@app/service/project/project.service';
import { EquipmentService } from '@app/service/equipment/equipment.service';
import * as XLSX from 'xlsx';
import { PackageService } from '@app/service/package/package.service';
import { ReportService } from '@app/service/report/report.service';
import { GroupsService } from '@app/service/groups/groups.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tac',
  templateUrl: './tac.component.html',
  styleUrls: ['./tac.component.css']
})

export class TacComponent implements OnInit{

  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  loader = false;
  projectId: any;
  equipmentData: any[] = [];
  filteredEquipmentData: any[] = [];
  loadFromMasterData: any[] = [];
  projectType: string | null = 'individual';
  maxSize: number = 5;
  packages: any[] = [];
  groups: any[] = [];
  project: any;
  uplDocForm!: FormGroup;

  filterFunctions: ((item: any) => boolean)[] = [];
  filterValues: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,private breakpointObserver: BreakpointObserver, private modalService: NgbModal, private projectService: ProjectService, private equipmentService: EquipmentService, private packageService: PackageService, private reportService: ReportService, private groupsService: GroupsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectType = this.route.snapshot.paramMap.get('projectType');
    this.reponsivePagination();
    this.loadEquipments();
    this.loadPackage();
    this.loadGroup();

    this.uplDocForm = this.fb.group({
      'file':''
    })
  }

  reponsivePagination(){
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.maxSize = 1;
      } else {
        this.maxSize = 5;
      }
    });
  }

  uploadDocModal(upldoccontent:any) {
		this.modalService.open(upldoccontent, { size: 'xl', centered: true });
	}

  printReportModal(reportcontent:any) {
		this.modalService.open(reportcontent, { size: 'xl', centered: true, scrollable: true });
	}

  loadPackage(){
    this.skip = this.limit * (this.page - 1);
    this.packageService.Find(this.skip,100000000000).subscribe((resp:any) => {
      this.packages = resp.results;
    })
  }

  loadGroup(){
    this.skip = this.limit * (this.page - 1);
    this.groupsService.Find(this.skip,100000000000).subscribe((resp:any) => {
      this.groups = resp.results;
    })
  }

  loadFromMaster() {
    this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
      this.loadFromMasterData = data.results;
      const groupNames = this.loadFromMasterData.filter((equipment: any) => equipment.equipmentPower && equipment.equipmentPower.group).map((equipment: any) => equipment.equipmentPower.group);
    });
  }

  loadEquipments() {
    this.skip = this.limit * (this.page - 1);
    this.loader = true;
    this.projectService.getEquipments(this.projectId, this.skip, this.limit).subscribe((data: any) => {
      this.project = data.results[0].project;
      this.equipmentData = data.results;
      this.filteredEquipmentData = this.equipmentData;
      this.count = data.count;
      this.loader = false;
      this.loadFromMaster();
    });
  }

  filterPackage = (item: any): boolean => {
    return item.package?.toLowerCase().includes(this.filterValues[0].toLowerCase());
  }

  filterGroup = (item: any): boolean => {
    return item.group?.toLowerCase().includes(this.filterValues[1].toLowerCase());
  }

  filterEqCode = (item: any): boolean => {
    return item.code?.toLowerCase().includes(this.filterValues[2].toLowerCase());
  }
  
  filterEquipment = (item: any): boolean => {
    return item.name?.toLowerCase().includes(this.filterValues[3].toLowerCase());
  }
  
  filterBrand = (item: any): boolean => {
    return item.brands?.toLowerCase().includes(this.filterValues[4].toLowerCase());
  }

  filterModel = (item: any): boolean => {
    return item.model?.toLowerCase().includes(this.filterValues[5].toLowerCase());
  }

  filterCountry = (item: any): boolean => {
    return item.country_of_origin?.toLowerCase().includes(this.filterValues[6].toLowerCase());
  }

  filterSupplier = (item: any): boolean => {
    return item.supplier_firm?.toLowerCase().includes(this.filterValues[7].toLowerCase());
  }

  filterActDelivery = (item: any): boolean => {
    return item.delivery_actual?.toLowerCase().includes(this.filterValues[8].toLowerCase());
  }

  filterEstDelivery = (item: any): boolean => {
    return item.est_delivery?.toLowerCase().includes(this.filterValues[9].toLowerCase());
  }

  onFilterChange(index: number, event: any) {
    this.filterValues[index] = event.target.value;
    this.filterFunctions[index] = index === 0 ? this.filterPackage : index === 1 ? this.filterGroup : index === 2 ? this.filterEqCode : index === 3 ? this.filterEquipment : index === 4 ? this.filterBrand : index === 5 ? this.filterModel : index === 6 ? this.filterCountry : index === 7 ? this.filterSupplier : index === 8 ? this.filterActDelivery : this.filterEstDelivery;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEquipmentData = this.equipmentData.filter(item => {
      return this.filterFunctions.every(filterFn => filterFn(item));
    });
  }

  exportToExcelService(tableId: string, filename: string) {
    const table: HTMLElement | null = document.getElementById(tableId);
    if(table){
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      XLSX.writeFile(workbook, filename);
    }
  }

  exportToExcel() {
    const filename = 'tac-report.xlsx';
    this.exportToExcelService('tac-table', filename);
  }

  exportData(equipcode:any,projectId:any){
    this.loader = true;
    const params:any = {
      projectId : projectId,
      equipCode : equipcode,
      reportType : 'equipment-location-listing',
      format: 'pdf'
    }
    this.reportService.getEquipmentReports(params).subscribe((response)=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      this.loader = false;
    })
  }

  uplDoc(){
    if(this.uplDocForm.valid){
      console.log(this.uplDocForm.value);
    }
  }
}
