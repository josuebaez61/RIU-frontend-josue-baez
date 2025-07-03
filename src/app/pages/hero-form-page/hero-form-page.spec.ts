import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormPage } from './hero-form-page';
import { provideZonelessChangeDetection } from '@angular/core';
import { Heros } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('HeroFormPage', () => {
  let component: HeroFormPage;
  let fixture: ComponentFixture<HeroFormPage>;
  let mockHeros: jasmine.SpyObj<Heros>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot'], {
      snapshot: {
        paramMap: {
          get: (key: string) => null,
        },
      },
    });
    mockHeros = jasmine.createSpyObj('Heros', [
      'getHeroById',
      'createHero',
      'patchHero',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HeroFormPage, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: Heros, useValue: mockHeros },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.heroForm.value).toEqual({
      name: null,
      alias: null,
      origin: null,
      powers: [],
    });
  });

  it('should load hero data when editing', async () => {
    mockActivatedRoute.snapshot.paramMap.get = jasmine
      .createSpy('get')
      .and.returnValue('123');

    const hero = {
      id: '123',
      name: 'Batman',
      alias: 'The Dark Knight',
      origin: 'Gotham City',
      powers: ['Super Intelligence', 'Martial Arts'],
    };
    mockHeros.getHeroById.and.returnValue(of(hero));

    component.ngOnInit();

    await fixture.whenStable();

    expect(mockHeros.getHeroById).toHaveBeenCalledWith('123');
    expect(component.editingHero()).toEqual(hero);
    expect(component.heroForm.value).toEqual({
      name: 'Batman',
      alias: 'The Dark Knight',
      origin: 'Gotham City',
      powers: ['Super Intelligence', 'Martial Arts'],
    });
  });

  it('should redirect to home if hero loading fails', async () => {
    mockActivatedRoute.snapshot.paramMap.get = jasmine
      .createSpy('get')
      .and.returnValue('123');
    mockHeros.getHeroById.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();
    await fixture.whenStable();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should create a new hero on form submission', () => {
    const newHero = {
      id: '456',
      name: 'Superman',
      alias: 'Man of Steel',
      origin: 'Krypton',
      powers: ['Flight', 'Super Strength'],
    };
    mockHeros.createHero.and.returnValue(of(newHero));

    component.heroForm.setValue({
      name: 'Superman',
      alias: 'Man of Steel',
      origin: 'Krypton',
      powers: ['Flight', 'Super Strength'],
    });

    component.onSubmit();

    expect(mockHeros.createHero).toHaveBeenCalledWith({
      name: 'Superman',
      alias: 'Man of Steel',
      origin: 'Krypton',
      powers: ['Flight', 'Super Strength'],
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should update an existing hero on form submission', () => {
    const updatedHero = {
      id: '123',
      name: 'Batman',
      alias: 'The Dark Knight',
      origin: 'Gotham City',
      powers: ['Super Intelligence', 'Martial Arts'],
    };
    component.editingHero.set(updatedHero);
    mockHeros.patchHero.and.returnValue(of(updatedHero));

    component.heroForm.setValue({
      name: 'Batman',
      alias: 'The Dark Knight',
      origin: 'Gotham City',
      powers: ['Super Intelligence', 'Martial Arts'],
    });

    component.onSubmit();

    expect(mockHeros.patchHero).toHaveBeenCalledWith('123', {
      name: 'Batman',
      alias: 'The Dark Knight',
      origin: 'Gotham City',
      powers: ['Super Intelligence', 'Martial Arts'],
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should mark all fields as touched if form is invalid on submission', () => {
    spyOn(component.heroForm, 'markAllAsTouched');

    component.heroForm.setValue({
      name: '',
      alias: '',
      origin: '',
      powers: [],
    });

    component.onSubmit();

    expect(component.heroForm.markAllAsTouched).toHaveBeenCalled();
  });
});
