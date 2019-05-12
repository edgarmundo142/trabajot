import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { PensionPage } from '../../pages/index.paginas';
import { ClienteProvider } from '../../providers/cliente/cliente';
/**
 * Generated class for the EsteticaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-estetica',
  templateUrl: 'estetica.html',
})
export class EsteticaPage {

  estetica:any={};
  fecha_cita:any;
  hora_cita:any;
  tipo_servicio:any;
  longitud_corte:any;
  tamano:any;
  comentarios:any;

  constructor(public clienteProvider:ClienteProvider,
              public alertCtrl: AlertController) {

                this.clienteProvider.inicializarEstetica();
                this.clienteProvider.estetica.valueChanges()
                .subscribe(data => {
                  this.estetica=data;
                  if(this.estetica.actividad==false){this.showAlert(); console.log("falso");}
                  if(this.estetica.actividad==true){console.log("verdad")}
                });
  }

  generarEstetica(){
    if(this.comentarios==null){this.comentarios='';}
    this.clienteProvider.inicializarEstetica();
    this.clienteProvider.estetica.update({
      actividad : true,
      fechaCita : this.fecha_cita,
      horaCita : this.hora_cita,
      tipoServicio : this.tipo_servicio,
      longitudCorte : this.longitud_corte,
      tamano : this.tamano,
      comentarios : this.comentarios
      });
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'No tienes servicios de estética',
      subTitle: 'Por favor completa todo el formulario para agendar una cita.',
      buttons: ['OK']
    });
    alert.present();
  }


}
