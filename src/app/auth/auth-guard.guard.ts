import { CanActivateFn, Router } from '@angular/router';



export const authGuardGuard: CanActivateFn = (route, state) => {

  
 if(sessionStorage.getItem('token')){
  return true
 }
 const router=new Router()
 router.navigate(['/auth/login'])
 return false
 
};
