import { Component,Input } from '@angular/core';
interface DataItem {
  id_materia:String
  materia:String
}
@Component({
  selector: 'app-tabla-materias',
  templateUrl: './tabla-materias.component.html',
  styleUrls: ['./tabla-materias.component.scss']
})
export class TablaMateriasComponent {
  @Input() materias!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_materia:"1",
      materia:"Calculo 1"
    },
    {
      id_materia:"2",
      materia:"Globalización"
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.materia.indexOf(this.searchValue) !== -1);
  }
}
