import { Routes } from '@angular/router';
import { AutoresComponent } from './components/autores/autores';
import { LibrosComponent } from './components/libros/libros';
import { DetalleAutorComponent } from './components/detalle-autor/detalle-autor';

export const routes: Routes = [
  { path: '', redirectTo: 'autores', pathMatch: 'full' },
  { path: 'autores', component: AutoresComponent },
  { path: 'autores/:nombre/libros', component: DetalleAutorComponent },
  { path: 'libros', component: LibrosComponent }
];