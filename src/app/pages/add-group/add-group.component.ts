import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
    // Get group ID from the route parameter
    this.groupid = this.route.snapshot.paramMap.get('id');

    // Check if group ID exists in the route params for edit mode
    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        // Load group data by ID for editing
        this.groups.FindbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addGroups.patchValue(resp);
        });
      }
    });

    // Initialize the form with form controls and validators
    this.addGroups = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  // Save group data
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addGroups.valid) {
        // Save new group data
        this.groups.SaveData(this.addGroups.value).subscribe((result) => {
          this.router.navigate(['pages/group-detail']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addGroups.valid) {
        // Update existing group data
        this.groups.update(this.groupid, this.addGroups.value).subscribe((data) => {
          this.isEdit = false;
          this.router.navigate(['pages/group-detail']);
        });
      }
    }
  }

  // Handle change event for the active dropdown
  change(e: any) {
    this.active = e.target.value;
  }
}
