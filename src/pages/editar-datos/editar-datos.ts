import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';


@Component({
  selector: 'page-editar-datos',
  templateUrl: 'editar-datos.html',
})
export class EditarDatosPage {
  tipo:any;
  info:string;
  actualizacion:any;
  constructor(public navParams: NavParams, public viewController:ViewController, public clienteProvider:ClienteProvider) {
    this.tipo = navParams.get('tipo');
    this.obtenerInfo();
  }

  salir(){
    this.viewController.dismiss();
  }

  obtenerInfo(){
    if(this.tipo=="nombre"){this.info="Nombre"}
    else if(this.tipo=="apellidos"){this.info="Apellido"}
    else if(this.tipo=="celular"){this.info="Celular"}
    else if(this.tipo=="correo"){this.info="Correo"}
    else if(this.tipo=="contrasena"){this.info="Contraseña"}
  }

  actualizar(){
    console.log(this.actualizacion);
    if(this.actualizacion!=null){
    this.clienteProvider.inicializarCliente();
    if(this.tipo=="nombre"){this.clienteProvider.cliente.update({
      nombre : this.actualizacion
      });}
    else if(this.tipo=="apellidos"){this.clienteProvider.cliente.update({
              apellidos : this.actualizacion
          });}
    else if(this.tipo=="celular"){this.clienteProvider.cliente.update({
            celular : this.actualizacion
          });}
    else if(this.tipo=="correo"){this.clienteProvider.cliente.update({
            correo : this.actualizacion
          });}
    else if(this.tipo=="contrasena"){this.clienteProvider.cliente.update({
            contrasena : this.actualizacion
          });}
    this.viewController.dismiss();
  }}

}
