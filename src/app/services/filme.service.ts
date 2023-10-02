import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Filme } from '../models/listagem-filme';
import { FilmeDetalhes } from '../models/filme-detalhes';
import { FilmeCreditos } from '../models/filme-creditos';
import { FilmeTrailer } from '../models/filme-trailer';


@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) {}

  public selecionarFilmePorId(id: number): Observable<Filme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    return this.http.get<Filme>(url, this.obterHeaderAutorizacao()).pipe(
      map(filme => this.mapearFilme(filme))
      );
}

public selecionarDetalhesFilmePorId(id: number): Observable<FilmeDetalhes> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    return this.http.get<FilmeDetalhes>(url, this.obterHeaderAutorizacao()).pipe(
      map(detalhesFilme => this.mapearDetalhesFilme(detalhesFilme))
      );
}


public selecionarCreditosFilmePorId(id: number): Observable<FilmeCreditos>{
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

    return this.http.get<FilmeCreditos>(url, this.obterHeaderAutorizacao()).pipe(
      map(creditosFilme => this.mapearCreditosFilme(creditosFilme))
    );
}


public selecionarFilmesMaisPopulares(pagina?:number): Observable<Filme[]> {
        pagina = pagina ? pagina : 1;
        const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=" + pagina;

        return this.http.get<Filme[]>(url, this.obterHeaderAutorizacao()).pipe(
          map(filme => this.mapearFilmes(filme))
        );
}

public selecionarFilmesMelhoresAvaliados(pagina?:number): Observable<Filme[]> {
  pagina = pagina ? pagina : 1;

  const url = "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=" + pagina;

  return this.http.get<Filme[]>(url, this.obterHeaderAutorizacao()).pipe(
    map(filme => this.mapearFilmes(filme))
  );
}

public selecionarFilmesPorIds(ids: number[]): Observable<Filme[]> {
  const observables = ids.map(id => this.selecionarFilmePorId(id));

  return forkJoin(observables);
}

public selecionarTrailerPorId(id: number): Observable<FilmeTrailer> {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`;

    return this.http.get<FilmeTrailer[]>(url, this.obterHeaderAutorizacao()).pipe(
      map(filme => this.mapearFilmeTrailer(filme))
    );
}

private obterHeaderAutorizacao() {
  return {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': environment.API_KEY,
      })
    };
  }

private processarResposta(resposta: Response): any {
    if (resposta.ok) {
        return resposta.json();
    }

    throw new Error('Filme não encontrado');
}

private mapearFilme(obj: any): Filme {
    return {
        id: obj.id,
        titulo: obj.title,
        poster: obj.poster_path
    }
}

private mapearDetalhesFilme(obj: any): FilmeDetalhes {
    const apiGeneros: any[] = obj.genres;

    return {
        id: obj.id,
        titulo: obj.title,
        poster: obj.poster_path,
        votos: obj.vote_count,
        nota: Math.round(obj.vote_average * 100) / 100,
        data: obj.release_date,
        descricao: obj.overview,
        generos: apiGeneros.map(g => g.name)
    }
}

private mapearCreditosFilme(obj: any): FilmeCreditos {
    let creditos = {
        diretores: [...(obj.crew)].filter(c => c.known_for_department == "Directing")?.map(c => c.name),
        escritores: [...(obj.crew)].filter(c => c.known_for_department == "Writing")?.map(c => c.name),
        atores: [...(obj.crew)].filter(c => c.known_for_department == "Acting")?.map(c => c.name)
    }

    let valores = Object.values(creditos);

    creditos.diretores = valores[0].filter((v, indice) => valores[0].indexOf(v) == indice);
    creditos.escritores = valores[1].filter((v, indice) => valores[1].indexOf(v) == indice);
    creditos.atores = valores[2].filter((v, indice) => valores[2].indexOf(v) == indice);
    
    return creditos;
}

private mapearFilmeTrailer(obj: any): FilmeTrailer {
    const trailer = obj.results[obj.results.length - 1]?.key; 
    return {
        trailer: trailer == null ? "" : trailer
    };
}

private mapearFilmes(obj: any): Filme[] {
  const filmes: any[] = obj.results;

  const filmesMapeados = filmes.map(filme => this.mapearFilme(filme));
  return filmesMapeados;
}
}
