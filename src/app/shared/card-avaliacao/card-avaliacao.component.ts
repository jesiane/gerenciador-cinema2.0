import { Component, Input } from '@angular/core';
import { Avaliacao } from 'src/app/models/filme-avaliacao';

@Component({
  selector: 'app-card-avaliacao',
  templateUrl: './card-avaliacao.component.html',
  styleUrls: ['./card-avaliacao.component.css']
})
export class CardAvaliacaoComponent {
  @Input() avaliacao: Avaliacao;

  constructor() {
    this.avaliacao = new Avaliacao('', '', '', 0, '');
  }
}
