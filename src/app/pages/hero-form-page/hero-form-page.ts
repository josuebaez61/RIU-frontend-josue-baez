import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero, Heros } from '../../core';
import { UppercaseValue } from '../../shared';

@Component({
  selector: 'app-hero-form-page',
  imports: [
    CommonModule,
    UppercaseValue,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterLink,
    MatCardModule,
  ],
  templateUrl: './hero-form-page.html',
  styles: ``,
})
export class HeroFormPage implements OnInit {
  powerOptions: string[] = [
    'Flight',
    'Super Strength',
    'Invisibility',
    'Telepathy',
    'Telekinesis',
    'Shape-shifting',
    'Time Travel',
    'Super Speed',
    'Healing Factor',
    'Energy Projection',
    'Mind Control',
    'Weather Control',
    'Teleportation',
    'Enhanced Senses',
    'Immortality',
    'Super Intelligence',
    'Force Field Generation',
    'Animal Communication',
    'Elemental Manipulation',
    'Reality Warping',
    'Size Alteration',
    'Gravity Manipulation',
    'Sound Manipulation',
    'Light Manipulation',
    'Magnetism Control',
  ];
  heroForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    alias: new FormControl<string | null>(null, [Validators.required]),
    origin: new FormControl<string | null>(null, [Validators.required]),
    powers: new FormControl<string[]>([], Validators.required),
  });
  heros = inject(Heros);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  editingHero = signal<Hero | null>(null);

  isEditing = false;

  constructor() {
    effect(() => {
      const editingHero = this.editingHero();
      if (editingHero) {
        this.heroForm.patchValue({
          name: editingHero.name,
          alias: editingHero.alias,
          origin: editingHero.origin,
          powers: editingHero.powers,
        });
      } else {
        this.heroForm.reset({
          name: null,
          alias: null,
          origin: null,
          powers: [],
        });
      }
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.heros.getHeroById(id).subscribe({
        next: (hero) => {
          this.editingHero.set(hero);
        },
        error: () => {
          this.router.navigate(['/']);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
    } else {
      let obs$: Observable<Hero>;
      if (this.editingHero()) {
        obs$ = this.heros.patchHero(
          this.editingHero()!.id,
          this.heroForm.getRawValue()
        );
      } else {
        obs$ = this.heros.createHero(this.heroForm.getRawValue());
      }
      obs$.subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
    }
  }
}
