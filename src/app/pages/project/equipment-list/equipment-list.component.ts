import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/service/project/project.service';
import { EquipmentAllocationModalComponent } from '../equipment-allocation-modal/equipment-allocation-modal.component';
import { RoomService } from 'src/app/service/room/room.service';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ToasterService } from '@app/components/toaster/toaster.service';
import { EqpDetailModalComponent } from '../eqp-detail-modal/eqp-detail-modal.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss'],
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
  maxSize: number = 5;
  departmentQuery: string = '';
  roomQuery: string = '';
  equipmentQuery: string = '';

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private room: RoomService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private customDialog: MyCustomDialogService,
    public toastService: ToasterService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectType = this.route.snapshot.paramMap.get('projectType');
    this.loadEquipments();
    this.reponsivePagination();
  }
  openDetailModal(eqp: any) {
    const modalRef = this.modalService.open(EqpDetailModalComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.eqp = eqp;
  }

  openFilterModal() {
    const modalRef = this.modalService.open(FilterModalComponent, {
      size: 'lg',
    });
    modalRef.result.then((data) => {
      console.log('data',data);
      
      // on close
    }, (reason) => {
      // on dismiss
    });
    // modalRef.componentInstance.eqp = eqp;
  }
  reponsivePagination() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        if (result.matches) {
          this.maxSize = 1;
        } else {
          this.maxSize = 5;
        }
      });
  }

  loadEquipments() {
    this.skip = this.limit * (this.page - 1);
    this.loader = true;
    const params = {
      skip: this.skip,
      limit: this.limit,
      departmentQuery: this.departmentQuery,
      roomQuery: this.roomQuery,
      equipmentQuery: this.equipmentQuery,
    };
    this.projectService
      .getEquipments(this.projectId, params)
      .subscribe((data: any) => {
        this.equipmentData = data.results;
        this.count = data.count;
        this.filteredEquipmentData = this.equipmentData.slice(); //For search bar
        this.loader = false;
      });
  }

  // Deletes an item
  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.loader = true;
        this.projectService.Removedata(id).subscribe((data) => {
          this.loader = false;
          this.toastService.show('Equipment deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.loadEquipments();
        });
      }
    });
    // if (confirm('delete?')) {
    //   this.projectService.Removedata(id).subscribe((data) => {
    //     this.loadEquipments();
    //   });
    // }
  }

  selectRoom(eqp: any, index: number) {
    this.deptId = eqp.department.projectDepartmentId;
    this.selectedRoomId = eqp.room.projectRoomId;
    this.selectedIndex = index;
  }

  // openCustomDialog() {
  //   this.customDialog.openAlertDialog();
  // }

  openEquipmentAllocationModal() {
    if (!this.selectedRoomId) {
      const dialogRef = this.customDialog.openAlertDialog({
        dialogMsg: 'Please select room from the table',
      });
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
