import { Injectable } from '@angular/core';
import { HistoricoUsuario } from '../models/historico-usuario';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  private endereco: string = 'gerenciador_cinema-ts:historico@1.0.0';

  salvarDados(dados: HistoricoUsuario): void {
    const jsonString = JSON.stringify(dados);

    localStorage.setItem(this.endereco, jsonString);
  }

  carregarDados(): HistoricoUsuario {
    const dadosJson = localStorage.getItem(this.endereco);

    if (dadosJson)
      return JSON.parse(dadosJson) as HistoricoUsuario;

    return new HistoricoUsuario();
  }
}
