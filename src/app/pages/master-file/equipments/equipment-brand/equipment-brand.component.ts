import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-brand',
  templateUrl: './equipment-brand.component.html',
  styleUrls: ['./equipment-brand.component.css'],
})
export class EquipmentBrandComponent implements OnInit{

  constructor(private router:Router) {}

  ngOnInit(): void {}

  save(){
    this.router.navigate(['/pages/equipment-data']);
  }

  cancel(){
    this.router.navigate(['/pages/equipment-data']);
  }

}
