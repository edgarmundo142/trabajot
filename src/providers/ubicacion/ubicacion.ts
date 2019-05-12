import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class UbicacionProvider {
paseador:AngularFirestoreDocument<any>;
  constructor(private afDB: AngularFirestore) {
    console.log('Hello UbicacionProvider Provider');
      this.paseador=afDB.doc('/paseador/'+'Ale-Mundo');
  }

  inicializarPaseador(){
    this.paseador=this.afDB.doc('/paseador/'+'Ale-Mundo');
  }

}
