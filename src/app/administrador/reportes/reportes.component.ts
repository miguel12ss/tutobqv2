import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  private fb=inject(FormBuilder)
    
  public reportForm!:FormGroup
  private adminService=inject(AdminService)

  public reports:any[]=[
    'usuarios','tutorias eliminadas','tutorias creadas',
    'tutorias finalizadas','usuarios deshabilitados'
  ]
  constructor(){
    this.reportForm=this.initForm()
  }
  ngOnInit(): void {
  }

  initForm():FormGroup{
    return this.fb.group({
      start_date:[null,Validators.required],
      end_date:[null,Validators.required],
      type_report:[null,Validators.required]
    })
    
  }
  generarInforme(){
    console.log(this.reportForm.value)
  }
}
