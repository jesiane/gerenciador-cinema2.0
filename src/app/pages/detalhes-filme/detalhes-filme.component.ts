import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilmeCreditos } from 'src/app/models/creditos-filme';
import { FilmeDetalhes } from 'src/app/models/detalhes-filme';
import { FilmeTrailler } from 'src/app/models/trailer-filme';
import { FilmesService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HistoricoUsuario } from 'src/app/models/historico-usuario';
import { ToastrService } from 'ngx-toastr';
import { Avaliacao } from 'src/app/models/avaliacao-filme';

@Component({
  selector: 'app-filme-detalhes',
  templateUrl: './detalhes-filme.component.css',
  styleUrls: ['./detalhes-filme.component.css']
})
export class FilmeDetalhesComponent {
  filmeDetalhes: FilmeDetalhes;
  filmeTrailer: FilmeTrailler;
  filmeCreditos: FilmeCreditos;
  filmeAvaliacoes: Avaliacao[];
  avaliacaoVisivel: boolean;
  imagem_url: string;
  video_url: string;
  ehFavorito: boolean;
  historico: HistoricoUsuario;

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private filmeService: FilmesService,
    private toastService: ToastrService,
    private sanitizer: DomSanitizer
    ) {
    this.filmeDetalhes = {
      id: 0,
      titulo: '',
      poster: '',
      votos: 0,
      nota: 0,
      data: '',
      descricao: '',
      generos: []
    };

    this.filmeTrailer = {
      trailler: ''
    };

    this.filmeCreditos = {
      diretores: [],
      escritores: [],
      atores: [],
    };

    this.filmeAvaliacoes = [];

    this.historico = new HistoricoUsuario();

    this.imagem_url = "";
    this.video_url = "";
    this.avaliacaoVisivel = false;
    this.ehFavorito = false;
  }

  ngOnInit() {
    this.historico = this.localStorageService.carregarDados();

    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.filmeService.selecionarDetalhesFilmePorId(id).subscribe(filmeDetalhes => {
      this.filmeDetalhes = filmeDetalhes;
      this.imagem_url = `https://image.tmdb.org/t/p/original${this.filmeDetalhes.poster}`;
      this.ehFavorito = this.historico.filmes_ids.includes(this.filmeDetalhes.id);
    });

    this.filmeService.selecionarTrailerPorId(id).subscribe(filmeTrailler => {
      this.filmeTrailer = filmeTrailler;
      this.video_url = `https://www.youtube.com/embed/${this.filmeTrailer.trailer}/`;
    });

    this.filmeService.selecionarCreditosFilmePorId(id).subscribe(filmeCreditos => {
      this.filmeCreditos = filmeCreditos;
    });

    this.filmeService.selecionarAvaliacoesPorId(id).subscribe(filmeAvaliacoes => {
      this.filmeAvaliacoes = filmeAvaliacoes;
    });
  }

  formatarListaCreditos(lista: string[]): string {
    return lista.map((c, i) => i == 0 ? c : ' º ' + c ).join('');
  }

  atualizarFavoritos(): void {
    if(this.historico.filmes_ids.includes(this.filmeDetalhes.id)) {
      this.toastService.success('Filme retirado da lista de favoritos', 'Success');
      this.historico.filmes_ids = this.historico.filmes_ids
        .filter(f => f != this.filmeDetalhes.id);
        this.ehFavorito = false;
    }

    else {
      this.toastService.success('Filme adicionado a lista de favoritos', 'Success');
      this.historico.filmes_ids.push(this.filmeDetalhes.id);
      this.ehFavorito = true;
    }

    this.localStorageService.salvarDados(this.historico);
  }

  alterarVisualizacaoAvaliacoes() {
    this.avaliacaoVisivel = !this.avaliacaoVisivel;
  }
}
