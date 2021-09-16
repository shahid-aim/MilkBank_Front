import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tableHeaders : any
  donorAppointmentNative : any

  constructor(private _dashboardService : DashboardService) { }

  ngOnInit(): void {
    this._dashboardService.getLatestDonorAppointment().subscribe(response => {
      this.donorAppointmentNative = response.donor_appointment
      this.tableHeaders = response.table_headers
      console.log(this.tableHeaders)
      console.log(this.donorAppointmentNative)
    })
  }

}
