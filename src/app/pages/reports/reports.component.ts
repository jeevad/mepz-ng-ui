import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project/project.service';
// import { DepartmentService } from 'src/app/service/department/department.service';
// import { RoomService } from 'src/app/service/room/room.service';
// import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import {
  ReportService,
  REPORT_TYPE,
} from 'src/app/service/report/report.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  // page = 1;
  limit = 1000;
  skip = 0;
  projectData: any[] = [];
  selectedProjectId!: string;
  reportTypeList = REPORT_TYPE;
  reportFormat!: string;
  // selectedDepartments: any[] = [];
  // deptId!: any;
  // projectId: any;
  // projectRooms: any[] = [];
  // otherProjectId: string[] = [];
  // otherDepartmentId: any = '';
  // otherRoomId: any = '';
  // searchInput: any = '';
  // otherEquipmentData: any[] = [];
  // loadFromMasterData: any[] = [];
  // count: number = 0;
  // summaryData: any[] = [];
  // loader = false;
  // equipmentData: any[] = [];
  selectedReportType: string = '';
  reportFormats: any;

  constructor(
    private projectService: ProjectService,
    // private departmentService: DepartmentService,
    // private equipmentService: EquipmentService,
    // private room: RoomService
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  // Method to load all projects in a dropdown
  loadProjects() {
    this.projectService
      .Load(this.skip, this.limit, 'individual')
      .subscribe((data: any) => {
        this.projectData = data.results;
      });
  }

  // Method to retrieve all rooms for the currently selected project
  // getCurrentProjectRooms() {
  //   const filterEquipmentDto: any = {
  //     projectId: [this.selectedProjectId],
  //   };
  //   this.projectService.getAllRooms(0, 1000, filterEquipmentDto).subscribe(
  //     (data: any) => {
  //       this.projectRooms = data.results[0]?.data || [];
  //       console.log('Project Rooms: ', this.projectRooms);
  //     },
  //     (error: any) => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

  // Method to load data from the master equipment list
  // loadFromMaster() {
  //   this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
  //     this.loadFromMasterData = data.results;
  //     const groupNames = this.loadFromMasterData
  //       .filter((equipment: any) => equipment.equipmentPower && equipment.equipmentPower.group)
  //       .map((equipment: any) => equipment.equipmentPower.group);
  //     console.log('Group Names:', groupNames);
  //   });
  // }

  // Method called when the project selection changes
  // onProjectChange(event: any) {
  //   this.selectedProjectId = event.target.value;
  //   this.selectedReportType = '';
  //   this.projectRooms = [];
  // }

  onReportTypeChange(event: any) {
    this.reportFormats = this.reportTypeList.find(
      (item) => item.key === this.selectedReportType
    )?.format;
  }

  exportData(format: string) {
    const params = {
      projectId: this.selectedProjectId,
      reportType: this.selectedReportType,
      format,
    };
    this.reportService.getEquipmentReports(params).subscribe((response) => {
      saveAs(response, `${this.selectedReportType}.pdf`);
    });
  }
}
