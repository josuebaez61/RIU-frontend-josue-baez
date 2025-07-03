import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../../core';
import { NoData } from '../no-data';

export type HeroTableColumns = (
  | 'name'
  | 'powers'
  | 'origin'
  | 'alias'
  | 'id'
  | 'actions'
)[];

@Component({
  selector: 'app-heros-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatChipsModule,
    NoData,
  ],
  templateUrl: './heros-table.html',
  styleUrl: './heros-table.scss',
})
export class HerosTable {
  @Input()
  displayedColumns: HeroTableColumns = [
    'name',
    'alias',
    'origin',
    'powers',
    'actions',
  ];

  @Input()
  loading = false;

  @Input()
  dataSource: Hero[] = [];

  @Input()
  length = 0;

  @Input()
  pageSize = 10;

  @Output()
  page = new EventEmitter<PageEvent>();

  @Output()
  deleteHero = new EventEmitter<string>();

  @Output()
  editHero = new EventEmitter<string>();

  onDeleteHero(id: string): void {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.deleteHero.emit(id);
    }
  }
}
