import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.css'
})
export class PokemonFormComponent {
  private formBuilder = inject(FormBuilder);
  public pokemonservice = inject(PokemonService);

  hasEnteredValue = signal(false);

  pokemonForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    level: ['', Validators.required],
    nature: ['', Validators.required],
  });

  onSubmit() {
    if (this.pokemonForm.valid) {
      this.pokemonservice.savePokemon(this.pokemonForm.getRawValue()).subscribe({
        next: () => {
          this.hasEnteredValue.set(true); 
          this.pokemonservice.fetchPokemon();
          this.pokemonForm.reset();
        },
        error: (err) => console.error('Error saving Pokemon:', err)
      });
    }
  }
}
