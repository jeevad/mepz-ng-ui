import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit{

  departmentdata: any;
  active: any = ['Active', 'Inactive'];
  message = '';
  messageclass = '';
  error: boolean = false;
  isEdit: boolean = false;
  deptid: any;
  editdata: any;
  submitted: boolean = false;
  addDepartment!: FormGroup;
  projectType: string | null = 'individual';
  showModal: boolean = false;
  // currencies: any[] = [];
  selectedCurrency: string | null = '';
  currencies: any[] = []; // Array to hold added currencies

  loader: boolean = false;

  constructor(
    private department: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.deptid = this.route.snapshot.paramMap.get('id');
    this.projectType = this.route.snapshot.paramMap.get('projectType');
    this.route.params.subscribe((param) => {
      this.loader = true;
      if (param && param['id']) {
        this.department.LoadbyID(param['id']).subscribe((resp: any) => {
          this.isEdit = true;
          this.addDepartment.patchValue(resp);
          // this.currencies = resp.currencies || [];
          this.currencies = resp.currencies.filter((currency: any) => currency.currencyCode && currency.currencyDescription && currency.currencySymbol);
          console.log('Selected Projects Currencies:', this.currencies);
          this.loader = false;
          // this.currencies = resp.currencies.filter((currency: any) => currency.projectId === param['id']) || [];
        });
      }
    });
    this.addDepartment = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      fullName: ['', Validators.required],
      clientOwner: ['', Validators.required],
      contractNo: ['', Validators.required],
      noOfBeds: ['',Validators.required],
      classification: ['', Validators.required],
      type: ['', Validators.required],
      // company: ['', Validators.required],
      comp: ['', Validators.required],
      dateInitiatedProposal: ['',Validators.required],
      proposedFacilityCompletionDate: ['',Validators.required],
      signature1: ['',Validators.required],
      signature2: ['',Validators.required],
      address1: ['',Validators.required],
      address2: ['',Validators.required],
      city: ['',Validators.required],
      postalZip: ['',Validators.required],
      state: ['',Validators.required],
      country: ['',Validators.required],
      // currencyDescription: [''],
      // currencyCode: [''],
      // currencySymbol: ['']
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' });
  }

  addCurrency() {
    console.log('Add button clicked');
    console.log(this.selectedCurrency);
    console.log('Adding currency:', this.selectedCurrency);
    if (this.selectedCurrency) {
      const currencyCode = this.selectedCurrency;
      let currencyDescription = '';
      let currencySymbol = '';

      switch (currencyCode) {
        case 'BAHT':
          currencyDescription = 'THAI BAHT';
          currencySymbol = 'B';
          break;
        case 'HK$':
          currencyDescription = 'HONGKONG DOLLAR';
          currencySymbol = '$';
          break;
        case 'MYR':
          currencyDescription = 'MALAYSIA RINGGIT';
          currencySymbol = '$';
          break;
        case 'PHP':
          currencyDescription = 'PHILIPPINE PESO';
          currencySymbol = 'P';
          break;
        case 'RIAL':
          currencyDescription = 'SAUDI RIAL';
          currencySymbol = 'R';
          break;
        case 'RUPE':
          currencyDescription = 'INDIAN RUPEE';
          currencySymbol = 'R';
          break;
        case 'US$':
          currencyDescription = 'US DOLLAR';
          currencySymbol = '$';
          break;
        default:
          break;
      }

      // Add the selected currency to the currencies array
      const newCurrency = {
        code: currencyCode,
        description: currencyDescription,
        symbol: currencySymbol
      };
      this.currencies.push(newCurrency);
      console.log('Currencies:', this.currencies);
    }
  }

  SaveData() {
    this.submitted = true;
    if (this.addDepartment.valid) {
      this.submitted = false;
      const currencies = this.currencies.map(currency => {
        return {
          currencyCode: currency.code,
          currencyDescription: currency.description,
          currencySymbol: currency.symbol
        };
      });

      if (!this.isEdit) {
        const formData = {
          ...this.addDepartment.value,
          currencies: currencies
        };

        this.department.SaveData(formData).subscribe((result) => {
          this.router.navigate(['pages/projects', this.projectType, 'list']);
        });
      } else {
        this.department.LoadbyID(this.deptid).subscribe((resp: any) => {
          const existingCurrencies = resp.currencies || [];
          const updatedCurrencies = [...existingCurrencies, ...currencies];
          const formData = {
            ...this.addDepartment.value,
            currencies: updatedCurrencies
          };

          this.department.update(this.deptid, formData).subscribe((data) => {
            this.isEdit = false;
            this.router.navigate(['pages/projects', this.projectType, 'list']);
          });
        });
      }
    }
  }



  change(e: any) {
    this.active = e.target.value;
  }
}
