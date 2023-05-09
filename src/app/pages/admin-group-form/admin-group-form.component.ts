import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminGroupService } from 'src/app/service/admin-group/admin-group.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  isEdit: boolean = false;
  groupid: any;
  editdata: any;
  constructor(
    private group: AdminGroupService,
    private router: Router,
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
    groupname: new FormControl('', Validators.required),
  });

  SaveGroupData() {
    if (!this.isEdit) {
      this.group.SaveGroupData(this.addgroup.value).subscribe((result) => {
        if (result != null) {
          this.message = 'data saves';
          this.messageclass = 'success';
          this.Cleardata();
          this.router.navigate(['/admin-group']); // router redirect
        }
      });
    } else if (this.isEdit) {
      this.updateRecord(this.groupid, this.editdata);
      this.router.navigate(['/admin-group']);
    } else {
      this.message = 'please enter valid data';
      this.messageclass = 'error';
    }
  }
  Cleardata() {
    this.addgroup = new FormGroup({
      groupname: new FormControl(''),
    });
  }

  Updatedata(Id: any) {
    this.group.LoadbyID(Id).subscribe((data) => {
      this.editdata = data;

      this.addgroup = new FormGroup({
        groupname: new FormControl(this.editdata.groupname),
      });
    });
  }

  updateRecord(Id: any, data: any) {
    this.group.update(Id, this.addgroup.value).subscribe((data) => {
      this.isEdit = false;
    });
  }
}
