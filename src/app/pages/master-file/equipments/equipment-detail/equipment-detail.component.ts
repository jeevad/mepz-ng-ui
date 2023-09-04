import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { ToasterService } from '@app/components/toaster/toaster.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent implements OnInit {
  [x: string]: any;
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  loader: boolean = false;
  equipmentData: any[] = []; //Equipment data list in sidebar
  maxSize: number = 5;

  constructor(
    private equipmentService: EquipmentService,
    private http: HttpClient,
    private customDialog: MyCustomDialogService,
    public toastService: ToasterService,
    private breakpointObserver: BreakpointObserver) {
    this.Load();
  }

  ngOnInit() {
    // this.Load();
    // this.loadEquipmentData() //Equipment data list in sidebar
    this.reponsivePagination();
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


  // Load equipmentData from the server | List in Sidebar
  loadEquipmentData(): void {
    this.equipmentService.Load(0, 10).subscribe((data: any) => {
      this.equipmentData = data.results;
    });
  }

  Load() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
      this.equipmentData = data.results;
      this.count = data.count;
      this.loader = false;
    });
  }

  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.loader = true;
        this.equipmentService.Removedata(id).subscribe((data) => {
          this.loader = false;
          this.toastService.show('Equipment deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.Load();
        });
      }
    });
  }
}
