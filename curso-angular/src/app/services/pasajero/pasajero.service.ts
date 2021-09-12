import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, retry } from 'rxjs/operators';
import { Pasajero } from 'src/app/shared/models/pasajero/pasajero';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {
  protected urlApi: string = environment.urlPasajero;

  constructor(
    protected http: HttpClient
  ) { }

  ObtenerPasajeroId(id: string): Observable<Pasajero | any> {
    //debugger;
    const url = `${this.urlApi}/${id}`;
    return this.http.get(url).pipe(
      retry(2),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  Guardar(pasajero: Pasajero): Observable<Pasajero | any> {
    //debugger;
    const url = `${this.urlApi}`;
    return this.http.post(url, pasajero).pipe(
      retry(2),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

}
