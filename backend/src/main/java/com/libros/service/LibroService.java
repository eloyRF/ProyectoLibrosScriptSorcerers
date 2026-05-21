package com.libros.service;

import com.libros.model.Libro;
import com.libros.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    public List<Libro> findAll() {
        return libroRepository.findAll();
    }

    public Libro save(Libro libro) {
        return libroRepository.save(libro);
    }

    public List<Libro> findByAutorNombre(String nombre) {
        return libroRepository.findByAutorNombre(nombre);
    }
}