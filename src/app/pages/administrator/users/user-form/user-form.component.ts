import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '@app/components/toaster/toaster.service';
import { UserAdminService } from 'src/app/service/user-admin/user-admin.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  groupNames: string[] = [];
  formData: any;
  active: any = ['Active', 'Inactive'];
  message = '';
  messageclass = '';
  error: boolean = false;
  isEdit: boolean = false;
  roomid: any;
  editdata: any;
  submitted: boolean = false;
  userForm!: FormGroup;
  name: string[] = [];
  loader: boolean = false;

  constructor(
    private group: UserAdminService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToasterService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.group.fetchGroupNames().subscribe(
      (groupNames: string[]) => {
        this.groupNames = groupNames;
      },
      (error) => {
        console.error('Error fetching group names:', error);
      }
    );
    this.roomid = this.route.snapshot.paramMap.get('id');

    this.userForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        staffId: [0, Validators.required],
        admin: ['', Validators.required],
        active: [true, Validators.required],
        group: ['', Validators.required],
        valid: ['', Validators.required],
        remarks: ['', Validators.required],
        password: ['', Validators.required],
        reEnterPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
    this.name = this.group.name;
    // patch value on update
    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.loader = true;
        this.group.LoadbyID(param['id']).subscribe((resp: any) => {
          this.isEdit = true;
          this.loader = false;
          delete resp.password;
          this.userForm.patchValue(resp);
        });
      }
    });
  }

  admin1 = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  active1 = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  updategroupname(names: string[]) {
    this.name = names;
  }

  SaveUserData() {
    this.userForm.value.valid = new Date(
      this.userForm.value.valid.year,
      this.userForm.value.valid.month,
      this.userForm.value.valid.day
    );
    if (!this.isEdit) {
      this.submitted = true;
      if (this.userForm.valid) {
        this.loader = true;
        this.group.SaveUserData(this.userForm.value).subscribe((result) => {
          this.loader = false;
          this.toastService.show('User created', {
            classname: 'bg-success text-light',
            delay: 10000,
          });
          this.router.navigate(['/pages/admin-user']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.userForm.valid) {
        this.loader = true;
        this.group.update(this.roomid, this.userForm.value).subscribe((data) => {
            this.isEdit = false;
            this.loader = false;
            this.toastService.show('User updated', {
              classname: 'bg-success text-light',
              delay: 10000,
            });
            this.router.navigate(['/pages/admin-user']);
          });
      }
    }
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.get('password');
    const reEnterPassword = control.get('reEnterPassword');
    if (
      password &&
      reEnterPassword &&
      password.value !== reEnterPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  Cleardata() {
    this.userForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  Updatedata(Id: any) {
    this.group.LoadbyID(Id).subscribe((data) => {
      this.editdata = data;

      this.userForm = new FormGroup({
        name: new FormControl(this.editdata.name),
      });
    });
  }

  updateRecord(Id: any, data: any) {
    this.group.update(Id, this.userForm.value).subscribe((data) => {
      this.isEdit = false;
    });
  }
}
