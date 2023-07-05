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
  filteredEquipmentData: any[] = [];



  constructor(
    private projectService: ProjectService,
    private departmentService: DepartmentService,
    private equipmentService: EquipmentService,
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


  loadFromMaster() {
    this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
      this.loadFromMasterData = data.results;
      console.log(data.results, "data results");

      const groupNames = this.loadFromMasterData
        .filter((equipment: any) => equipment.equipmentPower && equipment.equipmentPower.group)
        .map((equipment: any) => equipment.equipmentPower.group);

      console.log('Group Names:', groupNames);
    });
  }


//   loadFromMaster() {
//   this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
//     this.loadFromMasterData = data.results;
//     console.log(data.results, "data results");

//     const selectedProjectGroupNames = this.loadFromMasterData
//       .filter((equipment: any) => equipment.projectId === this.projectId && equipment.equipmentPower && equipment.equipmentPower.group)
//       .map((equipment: any) => equipment.equipmentPower.group);

//     console.log('Selected Project Group Names:', selectedProjectGroupNames);
//   });
// }



  // loadEquipments() {
  //   this.skip = this.limit * (this.page - 1);
  //   this.loader = true;
  //   this.projectService
  //     .getEquipments(this.projectId, this.skip, this.limit)
  //     .subscribe((data: any) => {
  //       this.equipmentData = data.results[0].data;
  //       this.count = data.results[0].metadata[0].total;
  //       this.filteredEquipmentData = this.equipmentData.slice();
  //       this.loader = false;
  //       this.loadGroupNames();
  //     });
  // }

  // loadGroupNames() {
  //   const selectedProjectIds = this.equipmentData.map((equipment: any) => equipment.projectId);

  //   selectedProjectIds.forEach((projectId: string) => {
  //     const filterEquipmentDto: any = {
  //       projectId: [projectId],
  //     };

  //     this.projectService.getAllEquipments(0, 1000, filterEquipmentDto).subscribe(
  //       (data: any) => {
  //         const equipmentData = data.results[0].data;
  //         const groupNames = equipmentData
  //           .filter((equipment: any) => equipment.equipmentPower && equipment.equipmentPower.group)
  //           .map((equipment: any) => equipment.equipmentPower.group);

  //         console.log(`Group Names for Project ID ${projectId}:`, groupNames);
  //       },
  //       (error: any) => {
  //         console.error(`Error fetching equipment for Project ID ${projectId}:`, error);
  //       }
  //     );
  //   });
  // }
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
    this.getProjectEquipments(selectedProjectId);

} else if (reportType === '114' && selectedProjectId) {
  this.getAllProjectEquipments(selectedProjectId);

} else if (reportType === '120') {
  this.getAllEquipments();
}


}



// Get all equipment names for report type '120'
getAllEquipments() {
  this.equipmentService.Load(this.skip, this.limit).subscribe(
    (data: any) => {
      this.equipmentData = data.results;
      this.count = data.metadata?.total ?? 0;

      console.log('All Equipment:');
      console.log('Total Equipments:', this.count);
      this.equipmentData.forEach((equipment: any) => {
        console.log('Equipment Name:', equipment.name);
      });
    },
    (error: any) => {
      console.error('Error fetching all equipments: ', error);
    }
  );
}



// Get project equipments for report type '112'
getProjectEquipments(selectedProjectId: string) {
  const filterEquipmentDto: any = {
    projectId: [selectedProjectId],
  };

  this.projectService.getAllEquipments(0, 1000, filterEquipmentDto).subscribe(
    (data: any) => {
      this.equipmentData = data.results[0].data;
      this.count = data.results[0].metadata[0].total;
      console.log('Selected Project Equipment:');
      console.log('Total Equipments:', this.count);
      this.equipmentData.forEach((equipment: any) => {
        console.log('All Equipments:', equipment.name);
      });
    },
  );
}

// Get all project equipments for report type '114'
getAllProjectEquipments(selectedProjectId: string) {
  if (selectedProjectId !== '112') {
    // Retrieve equipment data for a specific project
    const filterEquipmentDto: any = {
      projectId: [selectedProjectId],
    };

    this.projectService.getAllEquipments(0, 1000, filterEquipmentDto).subscribe(
      (data: any) => {
        this.equipmentData = data.results[0].data;
        this.count = data.results[0].metadata[0].total;

        console.log('Selected Project Equipment:');
        console.log('Total Equipments:', this.count);
        this.equipmentData.forEach((equipment: any) => {
          console.log('Equipment Code:', equipment.code);
          console.log('Equipment Name:', equipment.name);

          if (equipment.equipmentPower && equipment.equipmentPower.group !== undefined) {
            console.log('Equipment Power Group:', equipment.equipmentPower.group);
          } else {
            console.log('Equipment Power Group: Not Available');
          }
        });

        const groupData = this.equipmentData
          .filter((equipment: any) => equipment.equipmentPower && equipment.equipmentPower.group)
          .map((equipment: any) => equipment.equipmentPower.group);
        console.log('Group Data:', groupData);
     


      },
      (error: any) => {
        console.error('Error fetching project equipment: ', error);
      }
    );
  } else {
    // Retrieve all equipment data
    this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
      this.equipmentData = data.results;
      this.count = data.metadata.total;

      console.log('All Equipment:');
      console.log('Total Equipments:', this.count);
      this.equipmentData.forEach((equipment: any) => {
        console.log('Equipment Code:', equipment.code);
        console.log('Equipment Name:', equipment.name);

        if (equipment.equipmentPower && equipment.equipmentPower.group !== undefined) {
          console.log('Equipment Power Group:', equipment.equipmentPower.group);
        } else {
          console.log('Equipment Power Group: Not Available');
        }
      });

      const groupData = this.equipmentData
        .filter((equipment: any) => equipment.equipmentPower && equipment.equipmentPower.group)
        .map((equipment: any) => equipment.equipmentPower.group);
      console.log('Group Data:', groupData);
    });
  }
}

}
