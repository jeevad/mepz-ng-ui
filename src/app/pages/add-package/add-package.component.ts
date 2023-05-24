import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { PackageService } from 'src/app/service/package/package.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
})
export class AddPackageComponent implements OnInit {
  packagedata: any;
  active: any = ['Active', 'Inactive'];
  isEdit: boolean = false;
  packageid: any;
  submitted: boolean = false;
  addPackage!: FormGroup;

  constructor(
    private service: PackageService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.packageid = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.service.FindbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addPackage.patchValue(resp);
        });
      }
    });
    this.addPackage = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      active: [''],
    });
  }
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addPackage.valid) {
        this.service.SaveData(this.addPackage.value).subscribe((result) => {
          this.router.navigate(['/package']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addPackage.valid) {
        this.service
          .update(this.packageid, this.addPackage.value)
          .subscribe((data) => {
            this.isEdit = false;
            this.router.navigate(['/package']);
          });
      }
    }
  }

  change(e: any) {
    this.active = e.target.value;
  }
}
