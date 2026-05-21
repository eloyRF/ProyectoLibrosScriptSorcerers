import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LibroService } from '../../services/libro';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './libros.html',
  styleUrl: './libros.css'
})
export class LibrosComponent implements OnInit {

  libros = signal<any[]>([]);

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.libroService.getLibros().subscribe(data => {
      this.libros.set(data);
    });
  }
}