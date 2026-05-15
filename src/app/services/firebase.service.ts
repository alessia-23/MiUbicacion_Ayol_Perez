import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "AIzaSyArsWtTxL3fLG0oARXZUC_pPTm8E45xo_E",
    authDomain: "miubicacionapp-b6bd6.firebaseapp.com",
    projectId: "miubicacionapp-b6bd6",
    storageBucket: "miubicacionapp-b6bd6.firebasestorage.app",
    messagingSenderId: "748007371226",
    appId: "1:748007371226:web:3862ee3d6d3f2badc550e3",
    measurementId: "G-51R3DHYCLS"
  };

  app = initializeApp(this.firebaseConfig);

  db = getFirestore(this.app);

  constructor() {}

  async guardarUbicacion(
    latitud: number,
    longitud: number,
    mapaUrl: string
  ) {

    try {

      const docRef = await addDoc(
        collection(this.db, 'ubicaciones'),
        {
          latitud,
          longitud,
          mapaUrl,
          fecha: new Date()
        }
      );

      console.log('Documento guardado:', docRef.id);

    } catch (error) {

      console.log('Error Firebase:', error);

    }
  }
}