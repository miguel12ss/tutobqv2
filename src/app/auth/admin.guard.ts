import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('admin')==="miguel"){
    return true
  }
const router=new Router()
router.navigate(['auth/login'])
  return false
};
