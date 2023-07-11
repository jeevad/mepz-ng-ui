import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project/project.service';
import { DepartmentService } from 'src/app/service/department/department.service';
import { RoomService } from 'src/app/service/room/room.service';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})

export class ReportsComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  projectData: any[] = [];
  selectedProjectId: string | null = null;
  selectedDepartments: any[] = [];
  deptId!: any;
  projectId: any;
  projectRooms: any[] = [];
  otherProjectId: string[] = [];
  otherDepartmentId: any = '';
  otherRoomId: any = '';
  searchInput: any = '';
  otherEquipmentData: any[] = [];
  loadFromMasterData: any[] = [];
  count: number = 0;
  summaryData: any[] = [];
  loader = false;
  equipmentData: any[] = [];
  selectedReportType: string = '';

  constructor(
    private projectService: ProjectService,
    private departmentService: DepartmentService,
    private equipmentService: EquipmentService,
    private room: RoomService,
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  // Method to load all projects in a dropdown
  loadProjects() {
    this.projectService.Load(0, 10, 'individual').subscribe((data: any) => {
      this.projectData = data.results;
    });
  }

  // Method to retrieve all rooms for the currently selected project
  getCurrentProjectRooms() {
    const filterEquipmentDto: any = {
      projectId: [this.selectedProjectId],
    };
    this.projectService.getAllRooms(0, 1000, filterEquipmentDto).subscribe(
      (data: any) => {
        this.projectRooms = data.results[0]?.data || [];
        console.log('Project Rooms: ', this.projectRooms);
      },
      (error: any) => {
        console.error('Error: ', error);
      }
    );
  }

  // Method to load data from the master equipment list
  loadFromMaster() {
    this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
      this.loadFromMasterData = data.results;
      const groupNames = this.loadFromMasterData
        .filter((equipment: any) => equipment.equipmentPower && equipment.equipmentPower.group)
        .map((equipment: any) => equipment.equipmentPower.group);
      console.log('Group Names:', groupNames);
    });
  }

  // Method called when the project selection changes
  onProjectChange(event: any) {
    this.selectedProjectId = event.target.value;
    this.selectedReportType = '';
    this.projectRooms = [];
  }

  // Method called when the report type selection changes
  onReportTypeChange(event: any) {
    const selectedReportType = event.target.value;

    if (selectedReportType === '110' && this.selectedProjectId) {
      const selectedProject = this.projectData.find((project) => project._id === this.selectedProjectId);

      if (selectedProject) {
        const selectedProjectName = selectedProject.name;

        this.departmentService.getProjectDepartments(this.selectedProjectId, 0, 10).subscribe((data: any) => {
          const departments = data.results[0]?.departments || [];
          console.log('Selected Project: ', selectedProjectName);
          console.log('Departments: ', departments);
        });
      }
    } else if (selectedReportType === '111' && this.selectedProjectId) {
      this.getCurrentProjectRooms();
    }
  }
}
