import { Component,Input } from '@angular/core';

interface DataItem {
  id_sede:String
  sede:String
}

@Component({
  selector: 'app-tabla-sedes',
  templateUrl: './tabla-sedes.component.html',
  styleUrls: ['./tabla-sedes.component.scss']
})
export class TablaSedesComponent {
  @Input() sedes!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_sede:"1",
      sede:"Barranquilla"
    },
    {
      id_sede:"2",
      sede:"Soledad"
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.sede.indexOf(this.searchValue) !== -1);
  }
}
