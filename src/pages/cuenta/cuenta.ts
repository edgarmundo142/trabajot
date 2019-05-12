import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EditarDatosPage } from '../editar-datos/editar-datos';
import { EditarFotoPage } from '../editar-foto/editar-foto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

  nombre="nombre";
  apellido="apellidos";
  celular="celular";
  correo="correo";
  contra="contrasena";
  fotoCuenta="foto";
  private watch: Subscription;
  usuario={};
  usuariodata={};
  usuariofinal={};
  name:any;
  constructor(public modalCtrl:ModalController, public clienteProvider:ClienteProvider ) {
    this.clienteProvider.inicializarCliente();
    this.watch = this.clienteProvider.cliente.valueChanges()
    .subscribe(data => {
      this.usuario=data;
    });
  }

  ionViewWillUnload(){
      this.watch.unsubscribe();
    }

editarDato(tipoDato){
  let modal=this.modalCtrl.create(EditarDatosPage,{
    tipo:tipoDato
  });
  modal.present();
}

editarFoto(tipoDato){
  let modal=this.modalCtrl.create(EditarFotoPage,{
    tipo:tipoDato
  });
  modal.present();
}

}
