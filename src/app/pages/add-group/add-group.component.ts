import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from 'src/app/service/groups/groups.service';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
})
export class AddGroupComponent implements OnInit {
  groupsdata: any;
  active: any = ['Active', 'Inactive'];
  error: boolean = false;
  isEdit: boolean = false;
  groupid: any;
  editdata: any;
  submitted: boolean = false;
  addGroups!: FormGroup;

  constructor(
    private groups: GroupsService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.groupid = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.groups.FindbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addGroups.patchValue(resp);
        });
      }
    });
    this.addGroups = this.formBuilder.group({
      groupcode: ['', Validators.required],
      groupname: ['', Validators.required],
    });
  }
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addGroups.valid) {
        this.groups.SaveData(this.addGroups.value).subscribe((result) => {
          this.router.navigate(['/group-detail']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addGroups.valid) {
        this.groups
          .update(this.groupid, this.addGroups.value)
          .subscribe((data) => {
            this.isEdit = false;
            this.router.navigate(['/group-detail']);
          });
      }
    }
  }
  change(e: any) {
    this.active = e.target.value;
  }
}
