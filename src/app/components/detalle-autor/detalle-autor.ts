import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LibroService } from '../../services/libro';

@Component({
  selector: 'app-detalle-autor',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './detalle-autor.html',
  styleUrl: './detalle-autor.css'
})
export class DetalleAutorComponent implements OnInit {

  autor = signal<any>(null);
  libros = signal<any[]>([]);
  nombre = '';

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService
  ) {}

  ngOnInit() {
    this.nombre = this.route.snapshot.paramMap.get('nombre') || '';
    this.libroService.getAutor(this.nombre).subscribe(data => {
      this.autor.set(data);
    });
    this.libroService.getLibrosPorAutor(this.nombre).subscribe(data => {
      this.libros.set(data);
    });
  }
}