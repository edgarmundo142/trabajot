import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargarArchivoProvider } from '../../providers/cargar-archivo/cargar-archivo';
import { ClienteProvider } from '../../providers/cliente/cliente';

@Component({
  selector: 'page-editar-foto',
  templateUrl: 'editar-foto.html',
})
export class EditarFotoPage {
  imagenPreview:string;
  imagen64: string;

  constructor(public navParams: NavParams, public viewController:ViewController, private camera: Camera,
    public cap:CargarArchivoProvider, private imagePicker: ImagePicker, public clienteProvider:ClienteProvider) {
    this.clienteProvider.inicializarCliente();
  }

  salir(){
    this.viewController.dismiss();
  }

  mostrarCamara(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64= imageData;
      }, (err) => {
        // Handle error
        console.log("ERROR",JSON.stringify(err));
      });


  }

  mostrarCamaralib(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: 0,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:0,
      allowEdit:true
    }

    this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64= imageData;
      }, (err) => {
        // Handle error
        console.log("ERROR",JSON.stringify(err));
      });


  }

  guardar(){
    let archivo={
      img: this.imagen64
    }

    this.cap.cargar_imagen_firebase(archivo,this.clienteProvider.correo).then(()=>{this.salir()});
  }

//código del imagePicker, no lo utilizamos por el momento

  mostrarGaleria(){
    let opciones:ImagePickerOptions ={
      quality:70,
      outputType:1,
      maximumImagesCount:1
    }

    this.imagePicker.getPictures(opciones).then((results) => {
      for (var i = 0; i < results.length; i++) {
      //console.log('Image URI: ' + results[i]);
      this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => {
      console.log("ERROR SELECTOR",JSON.stringify(err));
    });
  }


}
