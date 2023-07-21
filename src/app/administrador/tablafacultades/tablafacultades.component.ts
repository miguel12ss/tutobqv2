import { Component,Input } from '@angular/core';
import Swal from 'sweetalert2';
interface DataItem {
  id_facultad:String
  facultad:String
}
@Component({
  selector: 'app-tablafacultades',
  templateUrl: './tablafacultades.component.html',
  styleUrls: ['./tablafacultades.component.scss']
})
export class TablafacultadesComponent {
  @Input() tablafacultades!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_facultad:"1",
      facultad:"Ingenieria"
    },
    {
      id_facultad:"2",
      facultad:"contaduria"
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.facultad.indexOf(this.searchValue) !== -1);
  }
  
}