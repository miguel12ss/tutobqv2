import { Component,Input } from '@angular/core';


interface DataItem {
  id_programa:String
  programa:String
}

@Component({
  selector: 'app-tabla-programas',
  templateUrl: './tabla-programas.component.html',
  styleUrls: ['./tabla-programas.component.scss']
})
export class TablaProgramasComponent {
  @Input() programas!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_programa:"1",
      programa:"TECNICO PROFESIONAL EN MANTENIMIENTO DE SISTEMAS INFORMATICOS"
    },
    {
      id_programa:"2",
      programa:"TECNOLOGO EN GESTION DE SISTEMAS INFORMATICOS "
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.programa.indexOf(this.searchValue) !== -1);
  }
}
