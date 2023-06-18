import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
})
export class EquipmentListComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  equipmentData: any[] = [];
  animal!: string;
  name!: string;
  searchText: string = ''; // For search bar
  filteredEquipmentData: any[] = []; // For search bar
  projectId: any;

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.loadEquipments();
  }

  loadEquipments() {
    this.skip = this.limit * (this.page - 1);
    this.projectService
      .getEquipments(this.projectId, this.skip, this.limit)
      .subscribe((data: any) => {
        this.equipmentData = data.results[0].data;
        this.count = data.results[0].metadata[0].total;
        this.filteredEquipmentData = this.equipmentData.slice(); //For search bar
      });
  }

  //Search Bar function
  searchProjectList(): void {
    if (this.searchText.trim() !== '') {
      this.filteredEquipmentData = this.equipmentData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.company.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEquipmentData = this.equipmentData.slice();
    }
  }

  // Deletes an item
  delete(id: any) {
    if (confirm('delete?')) {
      this.projectService.Removedata(id).subscribe((data) => {
        this.loadEquipments();
      });
    }
  }
}
