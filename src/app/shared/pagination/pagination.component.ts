import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  page: number = 1;
  @Output() onPaginaSelecionada: EventEmitter<number>;

  constructor() {
    this.onPaginaSelecionada = new EventEmitter();
  }

  paginaSelecionada(pagina: number): void {
    this.onPaginaSelecionada.emit(pagina);
  }


}
