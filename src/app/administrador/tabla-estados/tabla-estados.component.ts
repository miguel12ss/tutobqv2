import { Component,Input } from '@angular/core';

interface DataItem {
  id_estado:String
  estado:String
}

@Component({
  selector: 'app-tabla-estados',
  templateUrl: './tabla-estados.component.html',
  styleUrls: ['./tabla-estados.component.scss']
})
export class TablaEstadosComponent {
  @Input() estados!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_estado:"1",
      estado:"Pendiente"
    },
    {
      id_estado:"2",
      estado:"Finalizado "
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.estado.indexOf(this.searchValue) !== -1);
  }
}
