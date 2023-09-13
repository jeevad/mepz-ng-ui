import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryService } from 'src/app/service/summary/summary.service';
import { ProjectService } from 'src/app/service/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-equipment-summary',
  templateUrl: './equipment-summary.component.html',
  styleUrls: ['./equipment-summary.component.css'],
})

export class EquipmentSummaryComponent {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  summaryData: any[] = [];
  loader = false;
  projectId: any;
  equipmentData: any[] = [];
  filteredEquipmentData: any[] = [];
  loadFromMasterData: any[] = [];
  projectType: string | null = 'individual';
  maxSize: number = 5;

  constructor(
    private service: SummaryService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectType = this.route.snapshot.paramMap.get('projectType');
    this.loadEquipments();
    this.reponsivePagination();
  }

  reponsivePagination(){
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.maxSize = 1;
      } else {
        this.maxSize = 5;
      }
    });
  }

  loadFromMaster() {
    this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
      this.loadFromMasterData = data.results;
      // console.log(data.results, 'data results');

      const groupNames = this.loadFromMasterData
        .filter(
          (equipment: any) =>
            equipment.equipmentPower && equipment.equipmentPower.group
        )
        .map((equipment: any) => equipment.equipmentPower.group);

      console.log('Group Names:', groupNames);
    });
  }

  loadEquipments() {
    this.skip = this.limit * (this.page - 1);
    this.loader = true;
    this.projectService
      .getEquipments(this.projectId, this.skip, this.limit)
      .subscribe((data: any) => {
        this.equipmentData = data.results;
        this.count = data.count;
        console.log('data.count', data.count);
        console.log('data.results', data.results);

        // this.filteredEquipmentData = this.equipmentData.slice();
        this.loader = false;
        this.loadFromMaster();
      });
  }

  buttonInRowClick(event: any): void {
    event.stopPropagation();
  }

  wholeRowClick(): void {}

  nextButtonClickEvent(): void {}
  previousButtonClickEvent(): void {}
}
