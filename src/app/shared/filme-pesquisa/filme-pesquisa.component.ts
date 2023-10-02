import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filme-pesquisa',
  templateUrl: './filme-pesquisa.component.html',
  styleUrls: ['./filme-pesquisa.component.css']
})
export class FilmePesquisaComponent {
  @Output() onTituloSelecionado: EventEmitter<string>;
  titulo: string;

  constructor() {
    this.titulo = '';
    this.onTituloSelecionado = new EventEmitter();
  }

  tituloSelecionado(): void {
    this.onTituloSelecionado.emit(this.titulo);
    this.titulo = '';
  }
}
