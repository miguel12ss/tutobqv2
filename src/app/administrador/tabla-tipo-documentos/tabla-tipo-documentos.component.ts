import { Component,Input } from '@angular/core';

interface DataItem {
  id_tipo_documento:String
  tipo_documento:String
}

@Component({
  selector: 'app-tabla-tipo-documentos',
  templateUrl: './tabla-tipo-documentos.component.html',
  styleUrls: ['./tabla-tipo-documentos.component.scss']
})
export class TablaTipoDocumentosComponent {
  @Input() tipos_documento!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      id_tipo_documento:"1",
      tipo_documento:"T.I."
    },
    {
      id_tipo_documento:"2",
      tipo_documento:"C.C. "
    }
  ];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.tipo_documento.indexOf(this.searchValue) !== -1);
  }
}
