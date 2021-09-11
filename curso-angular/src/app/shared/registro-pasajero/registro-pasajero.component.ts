import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises/paises.service';
import { PasajeroService } from 'src/app/services/pasajero/pasajero.service';
import { Paises } from '../models/paises/paises';
import { Pasajero } from '../models/pasajero/pasajero';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-pasajero',
  templateUrl: './registro-pasajero.component.html',
  styleUrls: ['./registro-pasajero.component.scss']
})
export class RegistroPasajeroComponent implements OnInit {
  public pais: Paises[] = [];

  @Input('formulario') formulario: FormGroup;

  constructor(
    private paisService: PaisesService,
    private pasajeroService: PasajeroService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.ObtenerListaPaises();
  }

  ObtenerListaPaises() {
    //debugger;
    let exito: Paises[];
    this.paisService.ObtenerListaPaises().subscribe({
      next: (d) => {
        if (d) {
          exito = d;
        }
      },
      error: (e: HttpErrorResponse) => { console.error('error', e.message) },
      complete: () => {
        if (exito) {
          this.pais = exito;
        }
      }
    })
  }

  Guardar() {
    //debugger;
    let exito: Pasajero;
    let objeto = this.formulario.getRawValue();
    objeto.fechaNacimiento = this.FormatearFecha(objeto.fechaNacimiento)
    //console.log('form', objeto);
    this.pasajeroService.Guardar(objeto).subscribe({
      next: (d) => {
        if (d) {
          exito = d
        }
      },
      error: (e: HttpErrorResponse) => {
        console.error('error', e.message);
        Swal.fire({
          title: 'Error',
          text: 'Ah ocurrido un error al guardar los datos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      },
      complete: () => {
        if (exito) {
          Swal.fire({
            title: 'Exito',
            text: 'Registro guardado sastifactoriamente...!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.LimpiarFormulario();
        }
      }
    })

  }

  FormatearFecha(valor: Date) {
    return this.datepipe.transform(valor, 'yyyy-MM-dd');
  }

  LimpiarFormulario() {
    this.formulario.reset();
    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
  }

}
