import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '@app/components/toaster/toaster.service';
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
  loader: boolean = false;

  constructor(
    private utility: UtilityService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToasterService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.utilityid = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.loader = true;
        this.utility.FindbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.loader = false;
          this.addUtility.patchValue(resp);
        });
      }
    });
    this.addUtility = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addUtility.valid) {
        this.loader = true;
        this.utility.SaveData(this.addUtility.value).subscribe((result) => {
          this.loader = false;
          this.toastService.show('Utility created', {
            classname: 'bg-success text-light',
            delay: 10000,
          });
          this.router.navigate(['pages/utility-detail']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addUtility.valid) {
        this.loader = true;
        this.utility.update(this.utilityid, this.addUtility.value).subscribe((data) => {
            this.isEdit = false;
            this.loader = false;
            this.toastService.show('Utility updated', {
              classname: 'bg-success text-light',
              delay: 10000,
            });
            this.router.navigate(['pages/utility-detail']);
          });
      }
    }
  }
  change(e: any) {
    this.active = e.target.value;
  }
}
