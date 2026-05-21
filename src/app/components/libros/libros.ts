import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './libros.html',
  styleUrl: './libros.css',
})
export class LibrosComponent implements OnInit {
  libros = signal<any[]>([]);

  // REQUISITO: Manejo de estado para Búsqueda y Paginación de libros
  terminoBusqueda = signal<string>('');
  paginaActual = signal<number>(1);
  elementosPorPagina = 3;

  // REQUISITO: Mensajes informativos de éxito/error
  mensaje = signal<{ texto: string; tipo: 'success' | 'danger' } | null>(null);

  private libroService = inject(LibroService);

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe({
      next: (data: any) => this.libros.set(data),
      error: () => this.mostrarMensaje('Error al obtener el catálogo de libros', 'danger'),
    });
  }

  // REQUISITO: Filtro dinámico por Título o Autor con Signal Computada
  librosFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase().trim();
    if (!termino) return this.libros();
    return this.libros().filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(termino) ||
        (libro.autor && libro.autor.toLowerCase().includes(termino)),
    );
  });

  // REQUISITO: Paginación reactiva de la lista filtrada
  librosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.librosFiltrados().slice(inicio, fin);
  });

  totalPaginas = computed(() => Math.ceil(this.librosFiltrados().length / this.elementosPorPagina));

  mostrarMensaje(texto: string, tipo: 'success' | 'danger') {
    this.mensaje.set({ texto, tipo });
    setTimeout(() => this.mensaje.set(null), 3000);
  }

  // REQUISITO: Borrado de registros (Libros)
  eliminarLibro(isbn: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar el libro con ISBN: ${isbn}?`)) {
      this.libroService.eliminarLibro(isbn).subscribe({
        next: () => {
          this.cargarLibros();
          this.mostrarMensaje('Libro eliminado del catálogo con éxito.', 'success');
        },
        error: () => this.mostrarMensaje('No se pudo eliminar el libro.', 'danger'),
      });
    }
  }

  // REQUISITO: Seguridad básica compartida mediante LocalStorage
  estaLogueado(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
}
