import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './autores.html',
  styleUrl: './autores.css',
})
export class AutoresComponent implements OnInit {
  autores = signal<any[]>([]);
  mostrarFormulario = signal(false);

  // REQUISITO: Manejo de estado para Búsqueda, Paginación y Modos
  terminoBusqueda = signal<string>('');
  paginaActual = signal<number>(1);
  elementosPorPagina = 3; // Puedes cambiar el número de filas a mostrar
  editando = signal<boolean>(false);
  autorAEditarNombre = signal<string>('');

  // CONTROL REACTIVO: Vinculado al input del buscador en el HTML
  controlBusqueda = new FormControl('');

  // REQUISITO: Mensajes de confirmación y error
  mensaje = signal<{ texto: string; tipo: 'success' | 'danger' } | null>(null);

  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    nacionalidad: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    biografia: new FormControl(''),
  });

  // CONSTRUCTOR: Escucha reactiva de la barra de búsqueda
  constructor(private libroService: LibroService) {
    this.controlBusqueda.valueChanges.subscribe((valor) => {
      this.terminoBusqueda.set(valor || '');
      this.paginaActual.set(1); // Resetea a la primera página al escribir un filtro
    });
  }

  ngOnInit() {
    this.cargarAutores();
  }

  cargarAutores() {
    this.libroService.getAutores().subscribe({
      next: (data: any) => this.autores.set(data),
      error: () => this.mostrarMensaje('Error al conectar con el servidor', 'danger'),
    });
  }

  // REQUISITO: Filtro / Búsqueda con Signal Computada
  autoresFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase().trim();
    if (!termino) return this.autores();
    return this.autores().filter(
      (autor) =>
        autor.nombre.toLowerCase().includes(termino) ||
        autor.nacionalidad.toLowerCase().includes(termino),
    );
  });

  // REQUISITO: Paginación con Signal Computada
  autoresPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.autoresFiltrados().slice(inicio, fin);
  });

  totalPaginas = computed(() =>
    Math.ceil(this.autoresFiltrados().length / this.elementosPorPagina),
  );

  toggleFormulario() {
    this.mostrarFormulario.set(!this.mostrarFormulario());
    if (!this.mostrarFormulario()) {
      this.formulario.reset();
      this.editando.set(false);
    }
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'danger') {
    this.mensaje.set({ texto, tipo });
    setTimeout(() => this.mensaje.set(null), 3000); // Se borra solo a los 3 segundos
  }

  // REQUISITO: Crear y Editar registros
  guardarAutor() {
    if (this.formulario.valid) {
      if (this.editando()) {
        // Modo Edición
        this.libroService.editarAutor(this.autorAEditarNombre(), this.formulario.value).subscribe({
          next: () => {
            this.cargarAutores();
            this.formulario.reset();
            this.mostrarFormulario.set(false);
            this.editando.set(false);
            this.mostrarMensaje('¡Autor actualizado con éxito!', 'success');
          },
          error: () => this.mostrarMensaje('No se pudo actualizar el autor', 'danger'),
        });
      } else {
        // Modo Creación
        this.libroService.crearAutor(this.formulario.value).subscribe({
          next: () => {
            this.cargarAutores();
            this.formulario.reset();
            this.mostrarFormulario.set(false);
            this.mostrarMensaje('¡Autor creado con éxito!', 'success');
          },
          error: () => this.mostrarMensaje('Error al guardar el nuevo autor', 'danger'),
        });
      }
    }
  }

  // REQUISITO: Borrado de registros
  eliminarAutor(nombre: string) {
    if (confirm(`¿Estás seguro de borrar a ${nombre}?`)) {
      this.libroService.eliminarAutor(nombre).subscribe({
        next: () => {
          this.cargarAutores();
          this.mostrarMensaje('Autor eliminado correctamente', 'success');
        },
        error: () => this.mostrarMensaje('Error al eliminar: Verifica restricciones', 'danger'),
      });
    }
  }

  // Preparar el formulario con los datos viejos para editar
  prepararEdicion(autor: any) {
    this.editando.set(true);
    this.autorAEditarNombre.set(autor.nombre);
    this.formulario.setValue({
      nombre: autor.nombre,
      nacionalidad: autor.nacionalidad,
      edad: autor.edad,
      biografia: autor.biografia || '',
    });
    this.mostrarFormulario.set(true);
  }

  // REQUISITO: Seguridad Básica (Simulada en Botón)
  estaLogueado(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  cambiarRol() {
    if (this.estaLogueado()) {
      localStorage.removeItem('role');
      this.mostrarMensaje('Cerraste sesión. Modo Lector.', 'danger');
    } else {
      localStorage.setItem('role', 'admin');
      this.mostrarMensaje('Iniciaste sesión como Administrador.', 'success');
    }
  }
}
