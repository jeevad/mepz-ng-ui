import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminGroupService } from 'src/app/service/admin-group/admin-group.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '@app/components/toaster/toaster.service';
@Component({
  selector: 'app-admin-group-form',
  templateUrl: './admin-group-form.component.html',
  styleUrls: ['./admin-group-form.component.css'],
})
export class AdminGroupFormComponent implements OnInit {
  groupdata: any;
  message = '';
  messageclass = '';
  error: boolean = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  groupid: any;
  editdata: any;
  loader: boolean = false;

  constructor(
    private group: AdminGroupService,
    private router: Router,
    public toastService: ToasterService,
    private route: ActivatedRoute
  ) {
    this.groupid = this.route.snapshot.paramMap.get('id');

    if (this.groupid != null) {
      this.Updatedata(this.groupid);
      this.isEdit = true;
    }
  }
  ngOnInit(): void {}

  addgroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  SaveGroupData() {
    this.submitted = true;
    if (!this.isEdit) {
      if(this.addgroup.valid){
        this.submitted = false;
        this.loader = true;
        this.group.SaveGroupData(this.addgroup.value).subscribe((result) => {
          if (result != null) {
            this.message = 'data saves';
            this.messageclass = 'success';
            this.Cleardata();
            this.loader = false;
            this.toastService.show('Admin group created', {
              classname: 'bg-success text-light',
              delay: 10000,
            });
            this.router.navigate(['pages/admin-group']);
          }
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if(this.addgroup.valid){
        this.submitted = false;
        this.updateRecord(this.groupid, this.editdata);
        this.router.navigate(['pages/admin-group']);
      }
    } 
    // else {
    //   this.message = 'please enter valid data';
    //   this.messageclass = 'error';
    // }
  }
  Cleardata() {
    this.addgroup = new FormGroup({
      name: new FormControl(''),
    });
  }

  Updatedata(Id: any) {
    this.loader = true;
    this.group.LoadbyID(Id).subscribe((data) => {
      this.editdata = data;
      this.loader = false;
      this.addgroup = new FormGroup({
        name: new FormControl(this.editdata.name),
      });
    });
  }

  updateRecord(Id: any, data: any) {
    this.loader = true;
    this.group.update(Id, this.addgroup.value).subscribe((data) => {
      this.loader = false;
      this.isEdit = false;
      this.toastService.show('Admin group updated', {
        classname: 'bg-success text-light',
        delay: 10000,
      });
    });
  }
}
