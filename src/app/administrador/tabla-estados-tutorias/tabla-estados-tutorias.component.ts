import { Component,Input } from '@angular/core';

interface DataItem {
  id_estado_tutoria:String
  estado_tutoria:String
}

@Component({
  selector: 'app-tabla-estados-tutorias',
  templateUrl: './tabla-estados-tutorias.component.html',
  styleUrls: ['./tabla-estados-tutorias.component.scss']
})
export class TablaEstadosTutoriasComponent {
  @Input() estados_tutorias!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_estado_tutoria:"1",
      estado_tutoria:"Pendiente"
    },
    {
      id_estado_tutoria:"2",
      estado_tutoria:"Finalizado "
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.estado_tutoria.indexOf(this.searchValue) !== -1);
  }
}
