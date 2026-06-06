import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokeapi.service';
@Component({
  selector: 'app-pokemon',
  imports: [NgIf, FormsModule],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon {
  searchText = '';
  pokemon: any;
  constructor(
    private pokemonService: PokemonService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}
  search() {
    const query = this.searchText.trim().toLowerCase();
    if (!query) {
      return;
    }
    this.pokemonService.getPokemon(query).subscribe(data => {
      this.ngZone.run(() => {
        this.pokemon = data;
        this.cdr.detectChanges();
      });
    });
  }
}