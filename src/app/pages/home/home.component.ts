import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoricoUsuario } from 'src/app/models/historico-usuario';
import { Filme } from 'src/app/models/listagem-filme';
import { FilmesService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  filmes: Filme[] = [];
  historico: HistoricoUsuario;
  listagemTipo: string;

  constructor(
    private filmesService: FilmesService,
    private localStorageService: LocalStorageService,
    ) {
      this.historico = new HistoricoUsuario();
      this.listagemTipo = 'populares';
    }

  ngOnInit(): void {  
      this.historico = this.localStorageService.carregarDados();
  
      this.selecionarFilmesPopulares();
    }

  selecionarFavoritos() {
    this.listagemTipo = 'favoritos';

    if(this.historico.filmes_ids.length == 0) {
      this.filmes = [];
      return;
    }

    this.filmesService.selecionarFilmesPorIds(this.historico.filmes_ids).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  selecionarFilmesPopulares(pagina?:number) {
    pagina = pagina ? pagina : 1;

    this.listagemTipo = 'populares';

    this.filmesService.selecionarFilmesMaisPopulares(pagina).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  selecionarFilmesMelhoresAvaliados(pagina?:number) {
    pagina = pagina ? pagina : 1;

    this.listagemTipo = 'avaliados';

    this.filmesService.selecionarFilmesMelhoresAvaliados(pagina).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  paginaSelecionada(pagina: number) {
    if(this.listagemTipo == 'populares') {
      this.selecionarFilmesPopulares(pagina);
    }

    else if(this.listagemTipo == 'avaliados') {
      this.selecionarFilmesMelhoresAvaliados(pagina);
    }
  }
}
