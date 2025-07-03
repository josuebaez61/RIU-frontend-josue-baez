import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Heros } from '../../core';
import { HerosPage } from './heros-page';
import { PageEvent } from '@angular/material/paginator';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HerosPage', () => {
  let component: HerosPage;
  let fixture: ComponentFixture<HerosPage>;
  let mockHeros: jasmine.SpyObj<Heros>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockHeros = jasmine.createSpyObj('Heros', ['getHeros', 'deleteHero']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = jasmine.createSpyObj(
      'ActivatedRoute',
      ['snapshot'],
      {}
    );

    await TestBed.configureTestingModule({
      imports: [HerosPage],
      providers: [
        provideZonelessChangeDetection(),
        { provide: Heros, useValue: mockHeros },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchTerm signal when searchHeros is called', () => {
    component.searchHeros('Batman');
    expect(component.searchTerm()).toBe('Batman');
  });

  it('should reset searchTerm signal when resetSearch is called', () => {
    component.searchTerm.set('Superman');
    component.resetSearch();
    expect(component.searchTerm()).toBe('');
  });

  it('should update page and perPage signals when onPage is called', () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 5, length: 50 };
    component.onPage(pageEvent);
    expect(component.page()).toBe(2);
    expect(component.perPage()).toBe(5);
  });

  it('should call deleteHero and reload herosPagination when deleteHero is called', () => {
    spyOn(component.herosPagination, 'reload');
    mockHeros.deleteHero.and.returnValue(of());

    component.deleteHero('svc33');
    expect(mockHeros.deleteHero).toHaveBeenCalledWith('svc33');
    expect(component.herosPagination.reload).toHaveBeenCalled();
  });

  it('should navigate to edit page when editHero is called', () => {
    component.editHero('svc33');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['edit', 'svc33']);
  });
});
