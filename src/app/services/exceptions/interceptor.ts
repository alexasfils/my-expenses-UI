import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An Unexpected Error accured';

        // Controlliamo se l'errore arriva dal tuo backend col formato ErrorDTO
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage =
            'The server have not responded. Check your connection.';
        }

        // Mostra il toast con il messaggio d'errore (es. "ExpenseList name must be Unique")
        this.toast.error(errorMessage, 'Attention');

        // Rilancia l'errore così se il componente vuole gestirlo localmente può ancora farlo
        return throwError(() => error);
      })
    );
  }
}
