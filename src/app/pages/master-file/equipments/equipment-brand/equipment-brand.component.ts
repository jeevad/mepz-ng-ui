import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-brand',
  templateUrl: './equipment-brand.component.html',
  styleUrls: ['./equipment-brand.component.css'],
})

export class EquipmentBrandComponent implements OnInit{

  brandForm! : FormGroup;

  constructor(private router:Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      brands : this.fb.array([this.BrandFields()]),
      manufacturer_tac : [''],
      supplier_tac : [''],
      brand_tac : [''],
      model_tac : [''],
      country_origin_tac : [''],
      unit_price_tac : [''],
      spoc_tac : [''],
      contact_details_tac : [''],
    })
    this.loopFormFields();
  }

  loopFormFields(){
    for (let i = 1; i < 5; i++) {
      this.brandArray.push(this.BrandFields());
    }
  }

  private BrandFields(): FormGroup {
    return this.fb.group({
      supplier: [''],
      brand: [''],
      model: [''],
      country_origin: [''],
      unit_price: [''],
      spoc: [''],
      contact_details: [''],
    });
  }

  get brandArray(): FormArray {
    return <FormArray>this.brandForm.get('brands');
  }
  
  save(){
    if(this.brandForm.valid){
      console.log("brandForm",this.brandForm.value);
    }
    // this.router.navigate(['/pages/equipment-data']);
  }

  cancel(){
    this.router.navigate(['/pages/equipment-data']);
  }

}
