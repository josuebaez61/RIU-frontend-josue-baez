import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../../core';
import { NoData } from '../no-data';
import Swal from 'sweetalert2';

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

  @Input()
  error: unknown = null;

  @Output()
  page = new EventEmitter<PageEvent>();

  @Output()
  deleteHero = new EventEmitter<string>();

  @Output()
  editHero = new EventEmitter<string>();

  onDeleteHero(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this hero!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteHero.emit(id);
      }
    });
  }
}
