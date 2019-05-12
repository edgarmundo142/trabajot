import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { PrincipalPage } from '../index.paginas';
import { LoadingController, AlertController} from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string;
  contrasena:string;

  constructor(public navCtrl: NavController, private menuCtrl:MenuController,
              public loadingCtrl: LoadingController, public clienteProvider:ClienteProvider, public alertCtrl: AlertController) {
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
  }

  cambiar_root(){
    this.navCtrl.setRoot(PrincipalPage);
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '¡Oh no!',
      subTitle: 'Credenciales de usuario no válidas. Inténtalo de nuevo.',
      buttons: ['OK']
    });
    alert.present();
  }

  verificarUsuario (correo:string,clave:string){
  let loading = this.loadingCtrl.create({
        content: "Verificando",
        duration: 1000
      });
  loading.present();
  this.clienteProvider.verificarUsuario(this.correo,this.contrasena).then( existe => {
    if(existe){
      this.cambiar_root();
      this.menuCtrl.enable(true, 'myMenu');}
    else {
      this.showAlert();
    }
    })
  }



}
