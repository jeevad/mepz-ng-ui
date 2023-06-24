import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/service/project/project.service';
import { EquipmentAllocationModalComponent } from '../equipment-allocation-modal/equipment-allocation-modal.component';
import { RoomService } from 'src/app/service/room/room.service';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
})
export class EquipmentListComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  equipmentData: any[] = [];
  name!: string;
  searchText: string = ''; // For search bar
  filteredEquipmentData: any[] = []; // For search bar
  projectId: any;
  loader = false;
  selectedRoomId!: string;
  selectedIndex!: number;
  deptId!: string;
  projectType: string | null = 'individual';

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private room: RoomService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private customDialog: MyCustomDialogService
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectType = this.route.snapshot.paramMap.get('projectType');
    this.loadEquipments();
  }

  loadEquipments() {
    this.skip = this.limit * (this.page - 1);
    this.loader = true;
    this.projectService
      .getEquipments(this.projectId, this.skip, this.limit)
      .subscribe((data: any) => {
        this.equipmentData = data.results[0].data;
        this.count = data.results[0].metadata[0].total;
        this.filteredEquipmentData = this.equipmentData.slice(); //For search bar
        this.loader = false;
      });
  }

  //Search Bar function
  searchProjectList(): void {
    if (this.searchText.trim() !== '') {
      this.filteredEquipmentData = this.equipmentData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.company.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEquipmentData = this.equipmentData.slice();
    }
  }

  // Deletes an item
  delete(id: any) {
    if (confirm('delete?')) {
      this.projectService.Removedata(id).subscribe((data) => {
        this.loadEquipments();
      });
    }
  }

  selectRoom(eqp: any, index: number) {
    this.deptId = eqp.departments._id;
    this.selectedRoomId = eqp.departments.rooms._id;
    this.selectedIndex = index;
  }

  openCustomDialog() {
    this.customDialog.openAlertDialog();
  }
  openEquipmentAllocationModal() {
    if (!this.selectedRoomId) {
      const dialogRef = this.customDialog.openAlertDialog({
        dialogMsg: 'Please select room from the table',
      });
      // const dialogRef = this.customDialog.openConfirmDialog({
      //   dialogMsg: 'Are you sure want to delete?',
      // });
      // dialogRef.afterClosed().subscribe((result) => {
      //   console.log(result);
      //   if (result === 'ok') {
      //     // write your code here
      //   }
      // });

      return;
    }
    const modalRef = this.modalService.open(EquipmentAllocationModalComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.deptId = this.deptId;
    modalRef.componentInstance.roomId = this.selectedRoomId;
    modalRef.componentInstance.projectType = this.projectType;
  }

  // Function to load room list
  loadProjectRooms(): void {}
}
