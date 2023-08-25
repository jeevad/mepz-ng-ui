import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/service/master-company/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  departmentdata: any;
  isEdit: boolean = false;
  companyid: any;
  submitted: boolean = false;
  addCompany!: FormGroup;

  constructor(
    private service: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.companyid = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.service.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addCompany.patchValue(resp);
        });
      }
    });
    this.addCompany = this.formBuilder.group({
      code: ['', Validators.required],
      inactive: false,
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal: ['', Validators.required],
      country: ['', Validators.required],
      logo1: [''],
      show1: false,
      logo2: [''],
      show2: false,
      logo3: [''],
      show3: false,
      // contact: [
      //   '',
      //   Validators.compose([Validators.maxLength(10), Validators.required]),
      // ],
      // phone: [
      //   '',
      //   Validators.compose([Validators.maxLength(10), Validators.required]),
      // ],
      fax: ['', Validators.required],
      // mobile: [
      //   '',
      //   Validators.compose([Validators.maxLength(10), Validators.required]),
      // ],
      contact : ["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      mobile : ["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      phone : ["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      file1: [''],
      file2: [''],
      file3: [''], 
    });
  }

  SaveData() {
    this.submitted = true;
    if (this.addCompany.valid) {
      const data = {
        ...this.addCompany.value,
        inactive: this.addCompany.value.inactive.toString(),
        show1: this.addCompany.value.show1.toString(),
        show2: this.addCompany.value.show2.toString(),
        show3: this.addCompany.value.show3.toString(),
      };
      if (!this.isEdit) {
        this.service.SaveData(data).subscribe((result: any) => {
          // Handle file uploads
          this.uploadFiles(result._id);
        });
      } else {
        this.service.update(this.companyid, data).subscribe((data: any) => {
          // Handle file uploads
          this.uploadFiles(this.companyid);
          this.isEdit = false;
          this.router.navigate(['/company']);
        });
      }
    }
  }

  private uploadFiles(companyId: string) {
    // Upload file1 if selected
    if (this.addCompany.value.file1) {
      const file1: File = this.addCompany.value.file1;
      const formData1: FormData = new FormData();
      formData1.append('file', file1, file1.name);
      this.http
        // .post(`http://13.232.11.217/api1/upload/company/${companyId}/file1`, formData1)
        .post(`http://13.232.11.217/api1/upload/company/${companyId}/file1`, formData1)
        .subscribe((response) => {
          // File1 uploaded successfully
        });
    }

  //   // Upload file2 if selected
  //   if (this.addCompany.value.file2) {
  //     const file2: File = this.addCompany.value.file2;
  //     const formData2: FormData = new FormData();
  //     formData2.append('file', file2, file2.name);
  //     this.http
  //       .post(`http://13.232.11.217/api1/upload/company/${companyId}/file2`, formData2)
  //       .subscribe((response) => {
  //         // File2 uploaded successfully
  //       });
  //   }

  //   // Upload file3 if selected
  //   if (this.addCompany.value.file3) {
  //     const file3: File = this.addCompany.value.file3;
  //     const formData3: FormData = new FormData();
  //     formData3.append('file', file3, file3.name);
  //     this.http
  //       .post(`http://13.232.11.217/api1/upload/company/${companyId}/file3`, formData3)
  //       .subscribe((response) => {
  //         // File3 uploaded successfully
  //       });
  //   }


}
}
