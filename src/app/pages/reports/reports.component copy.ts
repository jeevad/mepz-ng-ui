import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project/project.service';
import { DepartmentService } from 'src/app/service/department/department.service';
import { RoomService } from 'src/app/service/room/room.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {

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

  constructor(
    private projectService: ProjectService,
    private departmentService: DepartmentService,
    private room: RoomService,
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  //For list all projects in drop-down
  loadProjects() {
    this.projectService.Load(0, 10, 'individual').subscribe((data: any) => {
      this.projectData = data.results;
    });
  }

//For list all project's rooms
  getCurrentProjectRooms() {
    const filterEquipmentDto: any = {
      projectId: [this.projectId],
    };

    this.projectService.getAllRooms(0, 10, filterEquipmentDto).subscribe(
      (data: any) => {
        this.projectRooms = data.results[0].data;
        console.log('Project Rooms: ', this.projectRooms);
      },
      (error: any) => {
        console.error('Error: ', error);
      }
    );
  }

  getAllProjectEquipments() {
    const filterEquipmentDto: any = {
      projectId: this.otherProjectId,
    };

    this.projectService.getAllEquipments(0, 10, filterEquipmentDto).subscribe(
      (data: any) => {
        this.otherEquipmentData = data.results[0].data;
        console.log('Selected Project Equipment:');
        this.otherEquipmentData.forEach((equipment: any) => {
          console.log(equipment.name);
        });
      },
      (error: any) => {
        console.error('Error fetching project equipment: ', error);
      }
    );
  }

//For list project's departments & rooms
 onProjectChange(event: any) {
  const selectedProjectId = event.target.value;
  this.projectId = selectedProjectId;

  const reportTypeElement = document.getElementById('equ_listing2') as HTMLSelectElement;
  const reportType = reportTypeElement?.value;
  let selectedProjectName: string | undefined;

  if (reportType === '110' && selectedProjectId) {
    const selectedProject = this.projectData.find((project) => project._id === selectedProjectId);

    if (selectedProject) {
      selectedProjectName = selectedProject.name;

      this.departmentService.getProjectDepartments(selectedProjectId, 0, 10).subscribe((data: any) => {
        const departments = data.results[0]?.departments || [];
        console.log('Selected Project: ', selectedProjectName);
        console.log('Departments: ', departments);
      });
    }
  } else if (reportType === '111' && selectedProjectId) {
    this.getCurrentProjectRooms();
  } else if (reportType === '112' && selectedProjectId) {
    this.getAllProjectEquipments();
  }
}


}

