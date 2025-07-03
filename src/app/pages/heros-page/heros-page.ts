import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HerosTable, SharedModule } from '../../shared';
import { Hero, Heros, Pagination } from '../../core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [
    SharedModule,
    RouterLink,
    FormsModule,
    HerosTable,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './heros-page.html',
  styleUrl: './heros-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerosPage {
  router = inject(Router);
  heros = inject(Heros);

  searchTerm = signal('');
  page = signal(1);
  perPage = signal(10);

  herosPagination = resource({
    params: () => ({
      page: this.page(),
      perPage: this.perPage(),
      searchTerm: this.searchTerm(),
    }),
    loader: ({ params: { page, perPage, searchTerm } }) =>
      firstValueFrom(this.heros.getHeros(page, perPage, searchTerm)),
  });

  isLoading = computed(() => this.herosPagination.isLoading());

  searchHeros(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  onPage(ev: PageEvent) {
    this.page.set(ev.pageIndex + 1);
    this.perPage.set(ev.pageSize);
  }

  resetSearch(): void {
    this.searchTerm.set('');
  }

  deleteHero(id: string): void {
    this.heros.deleteHero(id).subscribe({
      complete: () => this.herosPagination.reload(),
    });
  }

  editHero(id: string): void {
    this.router.navigate(['edit', id]);
  }
}
