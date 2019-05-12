import { Component, ViewChild } from '@angular/core';
import { Slides, AlertController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';

@Component({
  selector: 'page-paseo',
  templateUrl: 'paseo.html',
})
export class PaseoPage {

  usuario:any={};

  nombre_pagina='en_curso';
  @ViewChild('slider') slider:Slides;

  constructor(public ubicacionProvider:UbicacionProvider, public alertCtrl: AlertController) {
    this.ubicacionProvider.inicializarPaseador();
    this.ubicacionProvider.paseador.valueChanges()
    .subscribe(data => {
      this.usuario=data;
    });
    if(this.usuario.paseo==true){
      this.showAlert(this.usuario.paseo);}
    else{
      this.showAlert(!(this.usuario.paseo))
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PaseoPage');
  }
  pagina_seleccionada(index){
    this.slider.slideTo(index);
  }

  segmentChanged(event){
    //console.log(event);
  }

  slideChanged(){
    let currentIndex = this.slider.getActiveIndex();
    //console.log('Current index is', currentIndex);
    if(currentIndex==0){this.nombre_pagina='en_curso'}
    if(currentIndex==1){this.nombre_pagina='historial'}
  }

  showAlert(valor:boolean) {
    if(valor){
    const alert = this.alertCtrl.create({
      title: '¡Paseo en curso!',
      subTitle: 'Puedes mantenerte informado de la ubicación en tiempo real de tu paseador.',
      buttons: ['OK']
    });
    alert.present();
  }
  else{
    const alert = this.alertCtrl.create({
      title: 'No hay paseo disponible',
      subTitle: 'No es momento de paseo, por favor regresa más tarde.',
      buttons: ['OK']
    });
    alert.present();
  }
}

}
