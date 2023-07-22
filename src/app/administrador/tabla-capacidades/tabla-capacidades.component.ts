import { Component,Input } from '@angular/core';

interface DataItem {
  id_capacidad:String
  capacidad:String
}

@Component({
  selector: 'app-tabla-capacidades',
  templateUrl: './tabla-capacidades.component.html',
  styleUrls: ['./tabla-capacidades.component.scss']
})
export class TablaCapacidadesComponent {
  @Input() capacidades!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_capacidad:"1",
      capacidad:"25"
    },
    {
      id_capacidad:"2",
      capacidad:"35 "
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.capacidad.indexOf(this.searchValue) !== -1);
  }
}
