import { Component,OnInit,ViewChild, inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from '../../services/admin.service';
import { tap } from 'rxjs';
interface MesesData {
  [key: string]: string;
}

@Component({
  selector: 'app-charts-bar',
  templateUrl: './charts-bar.component.html',
  styleUrls: ['./charts-bar.component.scss']
})
export class ChartsBarComponent implements OnInit {
  private adminservice=inject(AdminService)
  private meses:MesesData={
  
    "1": "enero",
    "2": "febrero",
    "3": "marzo",
    "4": "abril",
    "5": "mayo",
    "6": "junio",
    "7": "julio",
    "8": "agosto",
    "9": "septiembre",
    "10": "octubre",
    "11": "noviembre",
    "12": "diciembre"
  

}
  data=[]
  ngOnInit(): void {
this.adminservice.getTutorias().subscribe(
  
  (res:any)=>{
    console.log(res);
    
    let data=res
    this.barChartData = {
      labels: data.map((item:any) => `${this.getNameForMonth(item.mes)}/${item.año}`), 
      datasets: [
        { data: data.map((item:any) => item.tutorias_terminadas), label: 'Tutorías realizadas' },
        { data: data.map((item:any) => item.tutorias_eliminadas), label: 'Tutorías eliminadas' }
      ]
    };
  })

}

private getNameForMonth(mes:number):any{
return this.meses[mes.toString()]
}

    
  
   // Convierte los datos y estructúralos para el gráfico


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max:10
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData!: ChartData<'bar'> 

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData.datasets[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     Math.round(Math.random() * 100),
  //     56,
  //     Math.round(Math.random() * 100),
  //     40,
  //   ];

  //   this.chart?.update();
  // }
}
