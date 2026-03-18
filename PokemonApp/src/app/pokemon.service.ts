import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiurl = 'http://localhost:3000/api/pokemon';
  pokemonList = signal<any[]>([]);

  constructor() {
    this.fetchPokemon();
  }

  fetchPokemon() {
    this.http.get<any[]>(this.apiurl).subscribe({
      next: (data) => this.pokemonList.set(data),
      error: (err) => console.error('Failed to fetch Gary’s team:', err)
    });
  }

  savePokemon(data: any) {
    return this.http.post(this.apiurl, data);
  }
}
