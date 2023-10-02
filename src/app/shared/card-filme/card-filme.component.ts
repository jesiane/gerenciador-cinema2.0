import { Component, Input, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/listagem-filme';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css']
})
export class CardFilmeComponent implements OnInit{
  @Input({required: true}) filme: Filme;
  imagem_url: string;

  constructor() {
    this.filme = {
      id: 0,
      titulo: '',
      poster: ''
    }

    this.imagem_url = "https://image.tmdb.org/t/p/original"
  }

  ngOnInit(): void {
    this.imagem_url = `https://image.tmdb.org/t/p/original${this.filme.poster}`;
  }
}
