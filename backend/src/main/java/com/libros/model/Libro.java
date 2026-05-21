package com.libros.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;

@Entity
@Table(name = "LIBROS")
public class Libro {

    @Id
    @Column(name = "ISBN")
    private Long isbn;

    @Column(name = "TITULO", length = 80, nullable = false)
    private String titulo;

    @Column(name = "FECHA_PUBLICACION")
    @Temporal(TemporalType.DATE)
    private Date fechaPublicacion;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "AUTOR", referencedColumnName = "NOMBRE")
    private Autor autor;

    public Long getIsbn() { return isbn; }
    public void setIsbn(Long isbn) { this.isbn = isbn; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public Date getFechaPublicacion() { return fechaPublicacion; }
    public void setFechaPublicacion(Date fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }

    public Autor getAutor() { return autor; }
    public void setAutor(Autor autor) { this.autor = autor; }
}