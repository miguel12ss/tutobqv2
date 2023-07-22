import { Component,Input } from '@angular/core';


interface DataItem {
  id_salon:String
  id_capacidad:String
  salon:String
  id_sede:String
}
@Component({
  selector: 'app-tabla-salones',
  templateUrl: './tabla-salones.component.html',
  styleUrls: ['./tabla-salones.component.scss']
})
export class TablaSalonesComponent {
  @Input() salones!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_salon:"1",
      id_capacidad:"25",
      salon:"Sala Computo 18",
      id_sede:"Barranquilla"
    },
    {
      id_salon:"2",
      id_capacidad:"35 ",
      salon:"Sala computo 2",
      id_sede:"Barranquilla"
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.salon.indexOf(this.searchValue) !== -1);
  }
}
