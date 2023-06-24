import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryService } from 'src/app/service/summary/summary.service';
import { ProjectService } from 'src/app/service/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';

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

  constructor(private service: SummaryService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private http: HttpClient) {

  }

  ngOnInit() {
    // let table = $('#example').DataTable({
    //   drawCallback: () => {
    //     $('.paginate_button.next').on('click', () => {
    //       this.nextButtonClickEvent();
    //     });
    //   },
    // });
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.loadEquipments();

  }

  loadFromMaster() {
    this.equipmentService.Load(this.skip, this.limit).subscribe((data: any) => {
      this.loadFromMasterData = data.results;
    });
  }

  loadEquipments() {
    this.skip = this.limit * (this.page - 1);
    this.loader = true;
    this.projectService
      .getEquipments(this.projectId, this.skip, this.limit)
      .subscribe((data: any) => {
        this.equipmentData = data.results[0].data;
        this.count = data.results[0].metadata[0].total;
        this.filteredEquipmentData = this.equipmentData.slice();
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
