import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/service/utility/utility.service';
@Component({
  selector: 'app-add-utility',
  templateUrl: './add-utility.component.html',
  styleUrls: ['./add-utility.component.css'],
})
export class AddUtilityComponent implements OnInit {
  utilitydata: any;
  active: any = ['Active', 'Inactive'];
  isEdit: boolean = false;
  utilityid: any;
  editdata: any;
  submitted: boolean = false;
  addUtility!: FormGroup;

  constructor(
    private utility: UtilityService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.utilityid = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.utility.FindbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addUtility.patchValue(resp);
        });
      }
    });
    this.addUtility = this.formBuilder.group({
      utilitycode: ['', Validators.required],
      utilityname: ['', Validators.required],
    });
  }
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addUtility.valid) {
        this.utility.SaveData(this.addUtility.value).subscribe((result) => {
          this.router.navigate(['/utility-detail']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addUtility.valid) {
        this.utility
          .update(this.utilityid, this.addUtility.value)
          .subscribe((data) => {
            this.isEdit = false;
            this.router.navigate(['/utility-detail']);
          });
      }
    }
  }
  change(e: any) {
    this.active = e.target.value;
  }
}
