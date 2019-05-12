import { Component,ViewChild} from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClienteProvider } from '../providers/cliente/cliente';
import { Subscription } from 'rxjs/Subscription';

import { LoginPage, PrincipalPage, MisServiciosPage, PaseoPage, PensionPage, EsteticaPage, CuentaPage } from '../pages/index.paginas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  principal= PrincipalPage;
  mis_servicios= MisServiciosPage;
  paseo= PaseoPage;
  pension:any= PensionPage;
  estetica= EsteticaPage;
  cuenta=CuentaPage;
  private watch:Subscription;
  usuario={};
@ViewChild('content') navCtrl:NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuController:MenuController, public clienteProvider:ClienteProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.clienteProvider.inicializarCliente();
      this.watch=this.clienteProvider.cliente.valueChanges()
      .subscribe(data => {
        this.usuarioPreview(data);
      });
    });
  }

  ionViewDidLoad(){
  }

  abrirPagina(pagina:any){
    //this.rootPage=pagina;
    this.menuController.close();
    this.navCtrl.push(pagina);

  }

  usuarioPreview(objeto:any){
    let nombreInicial=objeto.nombre;
    let nombrePreview=nombreInicial.split(" ");
    let apellidoInicial=objeto.apellidos;
    let apellidoPreview=apellidoInicial.split(" ");
    let foto=objeto.foto;
    this.usuario={
      nombre: nombrePreview[0],
      apellidos: apellidoPreview[0],
      foto: foto
    };
  }

  cerrarSesion(){
    this.menuController.close();
    this.menuController.enable(false, 'myMenu');
    this.navCtrl.setRoot(LoginPage);

  }

}
