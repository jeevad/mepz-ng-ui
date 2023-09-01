import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tac',
  templateUrl: './tac.component.html',
  styleUrls: ['./tac.component.css']
})

export class TacComponent implements OnInit{

  page = 1;
  limit = 10;
  skip = 0;
  loader = false;
  projectId: any;
  projectType: string | null = 'individual';
  maxSize: number = 5;

  constructor(private route: ActivatedRoute, private http: HttpClient,private breakpointObserver: BreakpointObserver, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectType = this.route.snapshot.paramMap.get('projectType');
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

  uploadDocModal(upldoccontent:any) {
		this.modalService.open(upldoccontent, { size: 'xl', centered: true });
	}

  printReportModal(reportcontent:any) {
		this.modalService.open(reportcontent, { size: 'xl', centered: true, scrollable: true });
	}

}
