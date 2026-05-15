import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import { NgIf } from '@angular/common';

import { LocationService } from '../services/location';
import { SupabaseService } from '../services/supabase.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    NgIf
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit, OnDestroy {

  latitude = signal<number | null>(null);

  longitude = signal<number | null>(null);

  mapsUrl = signal<string | null>(null);

  watchId: string | null = null;

  errorMsg = signal<string | null>(null);

  constructor(
    private loc: LocationService,
    private firebaseService: FirebaseService,
    private supabaseService: SupabaseService
  ) { }
  async ngOnInit() {

    await this.loc.ensurePermissions();

    await this.obtenerUbicacionActual();

    await this.iniciarSeguimiento();
  }

  async obtenerUbicacionActual() {

    try {

      const pos = await this.loc.getCurrentPosition();

      const lat = pos.coords.latitude;

      const lng = pos.coords.longitude;

      this.latitude.set(lat);

      this.longitude.set(lng);

      this.generarLinkGoogleMaps(lat, lng);

      const url = `https://www.google.com/maps?q=${lat},${lng}`;

      await this.firebaseService.guardarUbicacion(
        lat,
        lng,
        url
      );
      await this.supabaseService.guardarUbicacion(
        lat,
        lng,
        url
      );

      this.errorMsg.set(null);

    } catch (e: any) {

      this.errorMsg.set(
        e?.message ?? 'Error al obtener la ubicación actual'
      );

    }
  }

  generarLinkGoogleMaps(lat: number, lng: number) {

    const url = `https://www.google.com/maps?q=${lat},${lng}`;

    this.mapsUrl.set(url);
  }

  abrirGoogleMaps() {

    const url = this.mapsUrl();

    if (url) {

      window.open(url, '_blank');

    }
  }

  async iniciarSeguimiento() {

    try {

      this.watchId = await this.loc.watchPosition(

        (pos) => {

          const lat = pos.coords.latitude;

          const lng = pos.coords.longitude;

          this.latitude.set(lat);

          this.longitude.set(lng);

          this.generarLinkGoogleMaps(lat, lng);

        },

        (err) => {

          this.errorMsg.set(
            err?.message ?? 'Error en seguimiento de ubicación'
          );

        }
      );

    } catch (e: any) {

      this.errorMsg.set(
        e?.message ?? 'No se pudo iniciar el seguimiento'
      );

    }
  }

  async detenerSeguimiento() {

    if (this.watchId) {

      await this.loc.clearWatch(this.watchId);

      this.watchId = null;

    }
  }

  ngOnDestroy() {

    if (this.watchId) {

      this.loc.clearWatch(this.watchId);

    }
  }
}