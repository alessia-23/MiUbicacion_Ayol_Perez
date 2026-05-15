
<h1 align="center"> Mi Ubicación App 🌎</h1>

Aplicación móvil desarrollada con Ionic y Angular que permite obtener la ubicación actual del usuario, visualizar coordenadas en tiempo real y acceder directamente a Google Maps.

---

# Descripción

Mi Ubicación App es una aplicación móvil desarrollada con Ionic + Angular que utiliza la geolocalización del dispositivo para obtener coordenadas en tiempo real.

La aplicación permite:

- Obtener la ubicación actual  
-  Visualizar latitud y longitud  
-  Abrir la ubicación directamente en Google Maps  
-  Guardar datos en Firebase
- Guardar datos en Supabase  
- Seguimiento en tiempo real  
- Implementación de ícono personalizado

---

# Autoras

- Nayely Ayol
- Alessia Pérez

---

# Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Ionic | Desarrollo móvil |
| Angular | Framework principal |
| TypeScript | Lógica de programación |
| Capacitor | Funcionalidades nativas |
| Firebase | Base de datos |
| Supabase | Base de datos |
| Google Maps | Visualización de ubicación |

---

#  Funcionalidades

- Obtener ubicación actual
- Abrir ubicación en Google Maps
- Seguimiento en tiempo real
- Guardado de datos en Firebase
- Guardado de datos en Supabase
- Ícono personalizado

---

# Clonación del proyecto

```bash
git clone https://github.com/jzaldumbide/MiUbicacionAPP_ionic.git

cd MiUbicacionAPP_ionic

npm install

ionic serve
````

---

# Instalación de dependencias

```bash
npm install @capacitor/geolocation
npm install @angular/fire
npm install firebase
npm install @supabase/supabase-js

```

## Sincronización

```bash
npx cap sync
```

---

# Servicios implementados

Dentro de la carpeta:

```bash
src/app/services/
```

Se crearon los siguientes servicios:

* geolocation.service.ts
* firebase.service.ts
* supabase.service.ts

---

# Servicio de Geolocalización

```ts
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  async obtenerUbicacion() {

    await Geolocation.requestPermissions();

    const coordenadas = await Geolocation.getCurrentPosition();

    return {
      latitud: coordenadas.coords.latitude,
      longitud: coordenadas.coords.longitude
    };
  }
}
```

---

# Implementación de Firebase

```ts
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
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_ID",
    appId: "TU_APP_ID"
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
```

---

# Implementación de Supabase

```ts
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabaseUrl = 'TU_URL_SUPABASE';

  supabaseKey = 'TU_SUPABASE_KEY';

  supabase = createClient(
    this.supabaseUrl,
    this.supabaseKey
  );

  constructor() {}

  async guardarUbicacion(
    latitud: number,
    longitud: number,
    mapaUrl: string
  ) {

    const { data, error } = await this.supabase
      .from('ubicaciones')
      .insert([
        {
          latitud: latitud,
          longitud: longitud,
          mapa_url: mapaUrl,
          fecha: new Date().toISOString()
        }
      ]);

    if (error) {

      console.log('Error Supabase:', error);
      return;
    }

    console.log(
      'Ubicación guardada en Supabase:',
      data
    );
  }
}
```

---

# Interfaz principal

## home.page.html

```html
<ion-header>
  <ion-toolbar>
    <ion-title>
      Mi Ubicación GPS
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <ion-card
    *ngIf="latitude() !== null && longitude() !== null">

    <ion-card-header>
      <ion-card-title>
        Coordenadas actuales
      </ion-card-title>
    </ion-card-header>

    <ion-card-content>

      <p>
        <strong>Latitud:</strong>
        {{ latitude() }}
      </p>

      <p>
        <strong>Longitud:</strong>
        {{ longitude() }}
      </p>

      <ion-button
        expand="block"
        color="success"
        (click)="abrirGoogleMaps()"
        *ngIf="mapsUrl()">

        Abrir en Google Maps

      </ion-button>

    </ion-card-content>

  </ion-card>

</ion-content>
```

---

# Implementación de ícono
## Crear carpeta resources

```bash
resources/
```

---

## Agregar ícono

Guardar una imagen:

```bash
icon.png
```

Con tamaño:

```bash
1024 x 1024
```

---

## Instalar herramienta

```bash
npm install @capacitor/assets
```

---

## Generar Android

```bash
ionic build

ionic cap add android

npx cap sync android
```

---

## Generar assets

```bash
npx capacitor-assets generate
```

---

## Volver a sincronizar

```bash
npx cap sync android
```

---

## Abrir Android Studio

```bash
ionic cap open android
```

---

# Almacenamiento en Supabase

<p align="center">
  <img src="https://github.com/user-attachments/assets/b6865a1e-8e2f-489f-8e40-e4b94308c49e" width="700"/>
</p>

---

# Almacenamiento en Firebase

<p align="center">
  <img src="https://github.com/user-attachments/assets/29126f13-0860-4323-97dc-a60aed35bb7e" width="700"/>
</p>

---

# Ejecución en Android

## Abrir Android Studio

```bash
npx cap open android
```

---

# Generación del APK

<p align="center">
  <img src="https://github.com/user-attachments/assets/d6ec1fab-4659-4431-807c-efab567dd40f" width="700"/>
</p>

---

# Capturas de funcionamiento

##  App

<p align="center">
  <img src="https://github.com/user-attachments/assets/07c23b43-49f0-4b7b-a6c4-d106b43d8451" width="300"/>
</p>

---

##  Obtención de coordenadas

| Ubicación actual                                                                                         | Resultado                                                                                                |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/9c750eaf-a80a-4528-aa73-d20e1cbde371" width="250"/> | <img src="https://github.com/user-attachments/assets/486df053-f52f-4281-a592-3dfe6536b9b0" width="250"/> |

