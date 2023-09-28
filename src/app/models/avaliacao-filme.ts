export class Avaliacao {
  usuario: string;
  caminho_avatar: string;
  conteudo: string;
  nota: number;
  data_atualizacao: string;

  constructor(usuario: string, caminho_avatar: string, conteudo: string, nota: number, data_atualizacao: string) {
      this.usuario = usuario;
      this.caminho_avatar = caminho_avatar;
      this.conteudo = conteudo;
      this.nota = nota;
      this.data_atualizacao = data_atualizacao;
  }
}