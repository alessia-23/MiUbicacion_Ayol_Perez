import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabaseUrl = 'https://ykbdcqfiijzxbjrhkqmw.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYmRjcWZpaWp6eGJqcmhrcW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3ODE4NzYsImV4cCI6MjA5NDM1Nzg3Nn0.9rXFjs1QjzTW2TFatHrG6_TODyWGE6tXYeLJh1d4mD4';

  supabase = createClient(this.supabaseUrl, this.supabaseKey);

  constructor() {}

  async guardarUbicacion(latitud: number, longitud: number, mapaUrl: string) {
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

    console.log('Ubicación guardada en Supabase:', data);
  }
}