import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage, PrincipalPage, MisServiciosPage, PaseoPage, PensionPage, EsteticaPage, CuentaPage, EditarDatosPage, EditarFotoPage } from '../pages/index.paginas';

import { firebaseConfig } from '../config/firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AgmCoreModule } from '@agm/core';

import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { ClienteProvider } from '../providers/cliente/cliente';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { DatePipe } from '@angular/common';
import { CargarArchivoProvider } from '../providers/cargar-archivo/cargar-archivo';

import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PrincipalPage,
    MisServiciosPage,
    PaseoPage,
    PensionPage,
    EsteticaPage,
    CuentaPage,
    EditarDatosPage,
    EditarFotoPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthShortNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado'],
      dayShortNames: ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sa'],
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDynJyac8paYXM_j9rSyGdDS6LWEQqrYGI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PrincipalPage,
    MisServiciosPage,
    PaseoPage,
    PensionPage,
    EsteticaPage,
    CuentaPage,
    EditarDatosPage,
    EditarFotoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UbicacionProvider,
    ClienteProvider,
    Camera,
    ImagePicker,
    DatePipe,
    CargarArchivoProvider
  ]
})
export class AppModule {}
