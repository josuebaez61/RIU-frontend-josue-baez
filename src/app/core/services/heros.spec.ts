import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Heros } from './heros';
import { Messages } from './messages';
import { environment } from '../../../environments/environment';
import { CreateHeroPayload, Hero, Pagination } from '../models';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Heros', () => {
  let service: Heros;
  let httpMock: HttpTestingController;
  let messagesSpy: jasmine.SpyObj<Messages>;

  beforeEach(() => {
    messagesSpy = jasmine.createSpyObj('Messages', ['showMessage']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Heros,
        provideZonelessChangeDetection(),
        { provide: Messages, useValue: messagesSpy },
      ],
    });
    service = TestBed.inject(Heros);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch heroes with pagination', () => {
    const mockResponse: Hero[] = [
      {
        id: '1',
        name: 'Hero1',
        alias: 'Alias1',
        origin: 'Origin1',
        powers: ['Power1'],
      },
    ];
    const headers = { 'X-Total-Count': '1' };

    service.getHeros(1, 10).subscribe((pagination: Pagination<Hero>) => {
      expect(pagination.data).toEqual(mockResponse);
      expect(pagination.items).toBe(1);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/heros?_start=0&_limit=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse, { headers });
  });

  it('should create a hero', () => {
    const newHero: CreateHeroPayload = {
      name: 'Hero1',
      alias: 'Alias1',
      origin: 'Origin1',
      powers: ['Power1'],
    };
    const createdHero: Hero = {
      id: '1',
      name: 'Hero1',
      alias: 'Alias1',
      origin: 'Origin1',
      powers: ['Power1'],
    };

    service.createHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(createdHero);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/heros`);
    expect(req.request.method).toBe('POST');
    req.flush(createdHero);
    expect(messagesSpy.showMessage).toHaveBeenCalledWith(
      'Hero created successfully'
    );
  });

  it('should delete a hero', () => {
    const heroId = '1';

    service.deleteHero(heroId).subscribe((hero) => {
      expect(hero).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/heros/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    expect(messagesSpy.showMessage).toHaveBeenCalledWith(
      'Hero deleted successfully'
    );
  });

  it('should fetch a hero by id', () => {
    const heroId = '1';
    const hero: Hero = {
      id: '1',
      name: 'Hero1',
      alias: 'Alias1',
      origin: 'Origin1',
      powers: ['Power1'],
    };

    service.getHeroById(heroId).subscribe((result) => {
      expect(result).toEqual(hero);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/heros/1`);
    expect(req.request.method).toBe('GET');
    req.flush(hero);
  });

  it('should handle 404 error when fetching a hero by id', () => {
    const heroId = '1';

    service.getHeroById(heroId).subscribe({
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/heros/1`);
    req.flush({}, { status: 404, statusText: 'Not Found' });
    expect(messagesSpy.showMessage).toHaveBeenCalledWith('Hero not found');
  });

  it('should update a hero', () => {
    const heroId = '1';
    const changes: Partial<CreateHeroPayload> = { name: 'Updated Hero' };
    const updatedHero: Hero = {
      id: '1',
      name: 'Updated Hero',
      alias: 'Alias1',
      origin: 'Origin1',
      powers: ['Power1'],
    };

    service.patchHero(heroId, changes).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/heros/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedHero);
    expect(messagesSpy.showMessage).toHaveBeenCalledWith(
      'Hero updated successfully'
    );
  });

  it('should handle error when updating hero', () => {
    const heroId = '1';
    const changes: Partial<CreateHeroPayload> = { name: 'Updated Hero' };

    service.patchHero(heroId, changes).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/heros/1`);
    expect(req.request.method).toBe('PATCH');
    req.error(new ProgressEvent('Network error'));
    expect(messagesSpy.showMessage).toHaveBeenCalledWith(
      'Failed to update hero'
    );
  });

  it('should handle error when deleting hero', () => {
    const heroId = '1';

    service.deleteHero(heroId).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/heros/1`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ProgressEvent('Network error'));
    expect(messagesSpy.showMessage).toHaveBeenCalledWith(
      'Failed to delete hero'
    );
  });
});
