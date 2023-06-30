import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid"
interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
  horaInicio:string
  horaFin:string
}
@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})



export class HorarioComponent  {
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      horaInicio:'7:00am',
      horaFin:'9:00am'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      horaInicio:'7:00am',
      horaFin:'9:00am'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',horaInicio:'7:00am',
      horaFin:'9:00am'
    }
  ];
}


