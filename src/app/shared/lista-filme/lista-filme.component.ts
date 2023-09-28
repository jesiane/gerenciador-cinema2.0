import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lista-filme',
  templateUrl: './lista-filme.component.html',
  styleUrls: ['./lista-filme.component.css']
})
export class ListaFilmeComponent {
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
