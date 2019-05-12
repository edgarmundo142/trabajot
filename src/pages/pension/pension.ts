import { Component} from '@angular/core';
import { Slides, ModalController, AlertController } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';

@Component({
  selector: 'page-pension',
  templateUrl: 'pension.html',
})
export class PensionPage {

  pension:any={};
  fecha_entrada:any;
  hora_entrada:any;
  fecha_salida:any;
  hora_salida:any;
  bano:any;
  comidas:any;
  racion:any;
  cuidados:any;

  constructor(public clienteProvider:ClienteProvider,
              public alertCtrl: AlertController) {

    this.clienteProvider.inicializarPension();
    this.clienteProvider.pension.valueChanges()
    .subscribe(data => {
      this.pension=data;
      if(this.pension.actividad==false){this.showAlert(); console.log("falso");}
      if(this.pension.actividad==true){console.log("verdad")}
    });

  }


  generarPension(){
    if(this.cuidados==null){this.cuidados='';}
    this.clienteProvider.inicializarPension();
    this.clienteProvider.pension.update({
      actividad : true,
      fechaEntrada : this.fecha_entrada,
      horaEntrada : this.hora_entrada,
      fechaSalida : this.fecha_salida,
      horaSalida : this.hora_salida,
      salidasBano : this.bano,
      comidas : this.comidas,
      racion : this.racion,
      cuidados : this.cuidados
      });
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Sin alguna estancia en pensión',
      subTitle: 'Por favor completa todo el formulario para crear una estancia en pensión.',
      buttons: ['OK']
    });
    alert.present();
  }

}
