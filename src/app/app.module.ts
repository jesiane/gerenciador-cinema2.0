import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalhesFilmeComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { HomeComponent } from './pages/home/home.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { ListaFilmeComponent } from './shared/lista-filme/lista-filme.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PaginacaoComponent } from './shared/paginacao/paginacao.component';
import { PipesComponent } from './shared/pipes/pipes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DetalhesFilmeComponent,
    HomeComponent,
    CardFilmeComponent,
    ListaFilmeComponent,
    NavbarComponent,
    PaginacaoComponent,
    PipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
