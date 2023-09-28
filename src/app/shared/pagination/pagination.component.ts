import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  @Input() page: number;
  tamanho_tela: number;
  
  @Output() onPaginaSelecionada: EventEmitter<number>;

  constructor() {
    this.onPaginaSelecionada = new EventEmitter();
    this.page = 1;
    this.tamanho_tela = 1024;
  }

  ngOnInit(): void {
      this.tamanho_tela = window.innerWidth;
  }
  paginaSelecionada(pagina: number): void {
    this.onPaginaSelecionada.emit(pagina);
  }

  @HostListener('window:resize', ['$event'])
  onResize(evento: Event) {
    this.tamanho_tela = window.innerWidth;
  }
}

