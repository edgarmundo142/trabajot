import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from '@angular/common';
/**
 * Generated class for the MisServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mis-servicios',
  templateUrl: 'mis-servicios.html',
})
export class MisServiciosPage {

  servicio={};
  paquete:any={};
  cliente:any={};
  pagos:any[]=[];
  fecha:any;
  dia:any;
  private watch: Subscription;
  private watchdos: Subscription;
  private watchtres: Subscription;

  @ViewChild('slider') slider:Slides;
  nombre_pagina='paquete';

  constructor(public clienteProvider:ClienteProvider, private datePipe: DatePipe) {
    this.clienteProvider.inicializarPaquete();
    this.watch=this.clienteProvider.paquete.valueChanges().subscribe(data =>{
      this.paquete=data;
    });

    this.clienteProvider.inicializarCliente();
    this.watchdos=this.clienteProvider.cliente.collection('pagos').valueChanges().subscribe(data =>{
      this.pagos=data;
    });

    this.watchtres=this.clienteProvider.cliente.valueChanges().subscribe(data=>{
      this.cliente=data;
    });
  }

  ionViewWillLeave(){
      this.watch.unsubscribe();
      this.watchdos.unsubscribe();
      this.watchtres.unsubscribe();
  }

  pagina_seleccionada(index){
    this.slider.slideTo(index);
  }

  segmentChanged(event){
    //console.log(event);
  }

  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    //console.log('Current index is', currentIndex);
    if(currentIndex==0){this.nombre_pagina='paquete';}

    if(currentIndex==1){ this.nombre_pagina='pagos';
        this.obtenerFecha();
        let numero= parseInt(this.paquete.diaPago);
        if(this.dia == numero){
        if(this.cliente.pagoCreado == false && this.paquete.pago == 'mensual'){
          this.clienteProvider.cliente.collection('pagos').doc(this.fecha).set({
            fecha: this.fecha,
            confirmaCliente: false,
            confirmaPaseador: false,
            monto: this.paquete.monto,
            restante: this.paquete.monto
          });
          this.clienteProvider.cliente.update({
            pagoCreado : true });
        }
      }
      else if(this.dia != numero){
          this.clienteProvider.cliente.update({
          pagoCreado : false });
      }
    }

  }

  obtenerFecha(){
    let fecha = new Date();
    this.fecha= this.datePipe.transform(fecha,"dd-MM-yyyy");
    let diaPreview=this.fecha.split("-");
    let numero= parseInt(diaPreview[0]);
    this.dia=numero-1;
  }

}
