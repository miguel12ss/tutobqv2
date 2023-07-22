import { Component,Input } from '@angular/core';

interface DataItem {
  id_rol:String
  rol:String
}

@Component({
  selector: 'app-tabla-roles',
  templateUrl: './tabla-roles.component.html',
  styleUrls: ['./tabla-roles.component.scss']
})
export class TablaRolesComponent {
  @Input() roles!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_rol:"1",
      rol:"Docente"
    },
    {
      id_rol:"2",
      rol:"Estudiante "
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.rol.indexOf(this.searchValue) !== -1);
  }
}
