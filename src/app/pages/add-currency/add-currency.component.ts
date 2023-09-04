import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/service/currency/currency.service';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from '@app/components/toaster/toaster.service';
@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.css'],
})
export class AddCurrencyComponent implements OnInit {
  currencyData: any;
  isEdit: boolean = false;
  currencyid: any;
  submitted: boolean = false;
  addCurrency!: FormGroup;
  loader: boolean = false;

  constructor(
    private service: CurrencyService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToasterService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currencyid = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.loader = true;
        this.service.FindbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.loader = false;
          this.addCurrency.patchValue(resp);
        });
      }
    });
    this.addCurrency = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      symbol: ['', Validators.required],
    });
  }

  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addCurrency.valid) {
        this.loader = true;
        this.service.SaveData(this.addCurrency.value).subscribe((result) => {
          this.loader = false;
          this.toastService.show('Currency created', {
            classname: 'bg-success text-light',
            delay: 10000,
          });
          this.router.navigate(['pages/currency']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addCurrency.valid) {
        this.loader = true;
        this.service.update(this.currencyid, this.addCurrency.value).subscribe((currencyData) => {
            this.isEdit = false;
            this.loader = false;
            this.toastService.show('Currency updated', {
              classname: 'bg-success text-light',
              delay: 10000,
            });
            this.router.navigate(['pages/currency']);
          });
      }
    }
  }
}
