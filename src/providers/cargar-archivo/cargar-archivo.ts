import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { ClienteProvider } from '../cliente/cliente';


@Injectable()
export class CargarArchivoProvider {
  url:any;

  constructor(public toastCtrl: ToastController, public clienteProvider:ClienteProvider) {
    console.log('Hello CargarArchivoProvider Provider');
    this.clienteProvider.inicializarCliente();
  }

  cargar_imagen_firebase(archivo, nombreArchivo:string){
    let promesa= new Promise((resolve, reject)=>{
      this.mostrar_toast('Cargando...');
      let storeRef=firebase.storage().ref();
    //  let nombreArchivo:string="imagen_perfil"; //nombre del archivo

      let uploadTask: firebase.storage.UploadTask =
          storeRef.child('img/'+nombreArchivo) //nombre de la carpeta en donde se guarda el archivo
          .putString(archivo.img, 'base64', {contentType:'image/jpeg'} );
          uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
            ()=>{},//saber porcentaje de Mbs se han subido
            (error)=>{
              console.log("ERROR EN LA CARGA");
              console.log(JSON.stringify(error));
              this.mostrar_toast(JSON.stringify(error));
              reject();
            },
            ()=>{
              //todo bien
              // Create a reference to the file we want to download
              uploadTask.snapshot.ref.getDownloadURL().then(urlImage => {

                this.url=urlImage;
                this.clienteProvider.inicializarCliente();
                this.clienteProvider.cliente.update({
                  foto : this.url
                  });
                this.mostrar_toast('Foto Actualizada');
                  }).catch((error) => {
                    console.log(error);
              });
              resolve();
            }
            )
         });

    return promesa;
  }


  mostrar_toast(mensaje:any) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    }).present();
  }

}
