// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable,finalize,tap } from 'rxjs';

// @Injectable()
// export class InterceptorInterceptor implements HttpInterceptor {

//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//   this.spinnerService.callSpinner()
//    return next.handle(request).pipe(
//     finalize(()=>{
//       this.spinnerService.stopSpinner()
//     })
//    )
//   }
// }
