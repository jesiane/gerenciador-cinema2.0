import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmeDetalhesComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { HomeComponent } from './pages/home/home.component';
import { BuscaComponent } from './pages/busca/busca.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'home',
  component: HomeComponent,
},
{
  path: 'filme-detalhes/:id',
  component: FilmeDetalhesComponent,
},
{
  path: 'busca',
component: BuscaComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
