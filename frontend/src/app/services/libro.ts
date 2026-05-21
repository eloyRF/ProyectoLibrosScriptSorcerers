import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAutores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/autores`);
  }

  getAutor(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/autores/${nombre}`);
  }

  getLibrosPorAutor(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/autores/${nombre}/libros`);
  }

  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/libros`);
  }

  crearAutor(autor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/autores`, autor);
  }

  crearLibro(libro: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/libros`, libro);
  }
}