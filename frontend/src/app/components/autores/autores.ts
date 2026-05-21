import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../services/libro';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './autores.html',
  styleUrl: './autores.css'
})
export class AutoresComponent implements OnInit {

  autores = signal<any[]>([]);

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.libroService.getAutores().subscribe(data => {
      this.autores.set(data);
    });
  }
}