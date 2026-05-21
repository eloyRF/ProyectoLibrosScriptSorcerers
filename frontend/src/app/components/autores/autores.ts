import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './autores.html',
  styleUrl: './autores.css'
})
export class AutoresComponent implements OnInit {

  autores = signal<any[]>([]);
  mostrarFormulario = signal(false);

  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    nacionalidad: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    biografia: new FormControl('')
  });

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.cargarAutores();
  }

  cargarAutores() {
    this.libroService.getAutores().subscribe(data => {
      this.autores.set(data);
    });
  }

  toggleFormulario() {
    this.mostrarFormulario.set(!this.mostrarFormulario());
  }

  crearAutor() {
    if (this.formulario.valid) {
      this.libroService.crearAutor(this.formulario.value).subscribe(() => {
        this.cargarAutores();
        this.formulario.reset();
        this.mostrarFormulario.set(false);
      });
    }
  }
}