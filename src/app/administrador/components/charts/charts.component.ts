import { Component,OnInit,ViewChild, inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from '../../services/admin.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  adminservice=inject(AdminService)

  ngOnInit(): void {
this.adminservice.getEstadisticas().pipe(

tap((res:any)=>{
  console.log(res)
  this.pieChartData={ labels: ['Estudiantes registrados', 'Docentes registrados'],
  datasets: [
    {
      data: [res.estudiante,res.docente],
    },
  ],
 } 
})

).subscribe()
 
  
 
  }
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      
    },
  };
  public pieChartData!: ChartData<'pie', number[], string | string[]> 
  
  public pieChartType: ChartType = 'pie';
  
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
  
  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
