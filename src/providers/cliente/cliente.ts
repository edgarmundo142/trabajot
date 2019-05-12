import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class ClienteProvider {
  cliente:AngularFirestoreDocument<any>;
  principal:AngularFirestoreDocument<any>;
  pension:AngularFirestoreDocument<any>;
  estetica:AngularFirestoreDocument<any>;
  paquete:AngularFirestoreDocument<any>;
  pagos:AngularFirestoreDocument<any>;

  correo:any;
  clave:string;
  usuario:Usuario;
  recuerdo:any;

  constructor( private afDB: AngularFirestore, private storage: Storage, private platform:Platform) {
    //this.cliente=afDB.doc('/cliente/'+'edgarmundo142@gmail.com');
    this.inicializarCliente();
  }

  guardarCorreo(correo){
    if(this.platform.is("Cordova")){
    this.storage.set('correo', correo);}
    else{
      localStorage.setItem('correo', correo);
    }
  }

  cargarCorreo(){
    if(this.platform.is("Cordova")){
    }
    else{
      if(localStorage.getItem("correo"))
      this.correo= localStorage.getItem("correo");
    }
  }

  cargarRecuerdo(){
    let promesa = new Promise((resolve, reject)=>{
      if(this.platform.is("Cordova")){
        this.storage.ready().then(()=>{
          this.storage.get("recuerdo").then(recuerdo=>{
            this.recuerdo=recuerdo;
            resolve();
          });
        });
        }
      else {
        if(localStorage.getItem("recuerdo")){
          this.recuerdo= JSON.parse(localStorage.getItem("recuerdo"));
        }
        resolve();
      }
    });
    return promesa;
  }

  inicializarCliente(){
    this.cargarCorreo();
    //this.correo="edgarmundo142@gmail.com";
    this.cliente=this.afDB.doc('/cliente/'+this.correo);
  }

  verificarUsuario(correo:string, contrasena:string){
    return new Promise ((resolve, reject) => {
      this.afDB.doc('/cliente/'+correo).valueChanges().subscribe((data:Usuario)=>{
        if(data){
          //correcto
          this.usuario=data;
          if(this.usuario.contrasena==contrasena) {
            this.guardarCorreo(correo);
          resolve(true);}
          else{
            //console.log("incorrectaContrasena"+correo+contrasena);
            resolve(false);
          }
        }
        else{
          //incorrecto
          //console.log("incorrectoambos"+correo+contrasena);
          resolve(false);
        }
      })
    });
}

  inicializarPrincipal(){
    this.principal=this.afDB.doc('/principal/'+'contenido');
  }

  inicializarPension(){
    this.cargarCorreo();
    this.pension=this.afDB.doc('/cliente/'+this.correo+'/servicio/pension');
  }

  inicializarEstetica(){
    this.cargarCorreo();
    this.estetica=this.afDB.doc('/cliente/'+this.correo+'/servicio/estetica');
  }

  inicializarPaquete(){
    this.cargarCorreo();
    this.paquete=this.afDB.doc('/cliente/'+this.correo+'/servicio/paquete');
  }

  inicializarPagos(){
    this.cargarCorreo();
    this.pagos=this.afDB.doc('/cliente/'+this.correo+'/servicio/pagos');
  }

}

interface Usuario{
  apellidos:string;
  celular:string;
  contrasena:string;
  correo:string;
  foto:string;
  nombre:string;
}
