import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-specification',
  templateUrl: './equipment-specification.component.html',
  styleUrls: ['./equipment-specification.component.css']
})
export class EquipmentSpecificationComponent {

  constructor(private router:Router) {}

  ngOnInit(): void {}

  save(){
    this.router.navigate(['/pages/equipment-data']);
  }

  cancel(){
    this.router.navigate(['/pages/equipment-data']);
  }

}
