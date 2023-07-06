import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
contactForm!:FormGroup
showAlert=false
submitted=false
constructor(public fb:FormBuilder,private router:Router,private apiservice:ApiService){

  this.contactForm=fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.min(6)]]
  })

}
validarInput() {
  if (!this.contactForm.get('email')?.invalid) {
    this.showAlert = false;
  } else {
    this.showAlert = true;
  }

}

onSubmit(form:any):void{

  console.log(form);
  
 
  
  this.submitted=true

if(this.contactForm.valid){
 let token= this.apiservice.loginService(form.email,form.password)

 
  
 
}

 
  

  

  
  


}
}
