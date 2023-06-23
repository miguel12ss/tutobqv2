import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable()
export class NavbarServices{
    constructor(private router:Router){

    }

    serviceNavbar(showNavbar:boolean):boolean{
    return showNavbar
    }
}