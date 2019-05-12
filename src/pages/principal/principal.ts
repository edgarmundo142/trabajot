import { Component, ViewChild } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  usuario={};
  principal={};
  fecha:any;
  correo:any;
  private watch: Subscription;
  private watchdos: Subscription;

  constructor(private menuController:MenuController, public clienteProvider:ClienteProvider,
              private datePipe: DatePipe) {
    this.obtenerFecha();
    this.clienteProvider.inicializarCliente();
    this.clienteProvider.inicializarPrincipal();
    this.watch=this.clienteProvider.cliente.valueChanges()
    .subscribe(data => {
      this.usuario=data;
    });
    this.watchdos=this.clienteProvider.principal.valueChanges()
    .subscribe(data => {
      this.principal=data;
    });
  }

  ionViewWillEnter(){
    this.watch=this.clienteProvider.cliente.valueChanges()
    .subscribe(data => {
      this.usuario=data;
    });
    this.watchdos=this.clienteProvider.principal.valueChanges()
    .subscribe(data => {
      this.principal=data;
    });
  }

  ionViewWillLeave(){
    this.watch.unsubscribe();
    this.watchdos.unsubscribe();
  }

  obtenerFecha(){
    let fecha = new Date();
    this.fecha= this.datePipe.transform(fecha,"dd-MM-yyyy");
  }


  mostrar_menu(){
    this.menuController.toggle();
  }
}
