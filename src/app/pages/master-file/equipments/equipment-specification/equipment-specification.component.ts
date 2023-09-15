import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-specification',
  templateUrl: './equipment-specification.component.html',
  styleUrls: ['./equipment-specification.component.css']
})

export class EquipmentSpecificationComponent {

  specForm! : FormGroup;

  constructor(private router:Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.specForm = this.formBuilder.group({
      rev_no : [''],
      brands : this.formBuilder.array([this.brandFields()]),
      models : this.formBuilder.array([this.modelFields()]),
      country_origins : this.formBuilder.array([this.countryOriginFields()]),
      description : [''],
      component : [''],
      tech_spec : [''],
      dim_weight : [''],
      standard : [''],
      accessories : [''],
      startup_consume : [''],
      software_license : [''],
      others : [''],
      no_outlet_1 : [''],
      no_outlet_2 : [''],
      hot_water : [''],
      exhaust : [''],
      medgas : [''],
      lpg : [''],
      steam : [''],
      cold_water : [''],
      air_cond : [''],
      drainage : [''],
      it : [''],
      room_req : [''],
      delivery_req : [''],
      catalogues : [''],
      shop_drawing : [''],
      installed_list : [''],
      company_profile : [''],
      tentative_ppm : [''],
      authorization_letter : [''],
      remarks : [''],
    })
    this.loopFormFields();
  }

  loopFormFields(){
    for(let i = 0; i < 3; i++){
      this.brandArray.push(this.brandFields());
      this.modelArray.push(this.modelFields());
      this.countryOriginArray.push(this.countryOriginFields());
    }
  }

  private brandFields():FormGroup{
    return this.formBuilder.group({
      brand:['']
    })
  }

  private modelFields():FormGroup{
    return this.formBuilder.group({
      model:['']
    })
  }

  private countryOriginFields():FormGroup{
    return this.formBuilder.group({
      country_origin:['']
    })
  }

  get brandArray():FormArray{
    return <FormArray>this.specForm.get('brands');
  }

  get modelArray():FormArray{
    return <FormArray>this.specForm.get('models');
  }

  get countryOriginArray():FormArray{
    return <FormArray>this.specForm.get('country_origins');
  }

  save(){
    if(this.specForm.valid){
      this.specForm.value;
      this.specForm.value.outlets = [];
      this.specForm.value.attachments = [];
      for (const key in this.specForm.value) {
        if (key.startsWith('no_outlet_') || key === 'hot_water' || key === 'exhaust' || key === 'medgas' ||
            key === 'lpg' || key === 'steam' || key === 'cold_water' || key === 'air_cond' ||
            key === 'drainage' || key === 'it') {
            this.specForm.value.outlets.push({ [key]: this.specForm.value[key] });
          delete this.specForm.value[key];
        }
      }
      for (const key in this.specForm.value) {
        if (key.startsWith('catalogues') || key === 'shop_drawing' || key === 'installed_list' || key === 'company_profile' ||
            key === 'tentative_ppm' || key === 'authorization_letter') {
            this.specForm.value.attachments.push({ [key]: this.specForm.value[key] });
          delete this.specForm.value[key];
        }
      }
      console.log("this.specForm.value : ",this.specForm.value);
    }
    this.router.navigate(['/pages/equipment-data']);
  }

  cancel(){
    this.router.navigate(['/pages/equipment-data']);
  }

}
