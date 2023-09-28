import { Component, Input } from '@angular/core';
import { Avaliacao } from 'src/app/models/avaliacao-filme';

@Component({
  selector: 'app-card-filmeA',
  templateUrl: './card-filmeA.component.html',
  styleUrls: ['./card-filmeA.component.css']
})
export class CardFilmeAComponent {
  @Input() avaliacao: Avaliacao;

  constructor() {
    this.avaliacao = new Avaliacao('', '', '', 0, '');
  }
}
