package com.libros.controller;

import com.libros.model.Autor;
import com.libros.model.Libro;
import com.libros.service.AutorService;
import com.libros.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/autores")
@CrossOrigin(origins = "http://localhost:4200")
public class AutorController {

    @Autowired
    private AutorService autorService;

    @Autowired
    private LibroService libroService;

    @GetMapping
    public List<Autor> getAll() {
        return autorService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Autor> getById(@PathVariable Long id) {
        return autorService.findById(id);
    }

    @PostMapping
    public Autor create(@RequestBody Autor autor) {
        return autorService.save(autor);
    }

    @GetMapping("/{id}/libros")
    public List<Libro> getLibrosByAutor(@PathVariable Long id) {
        return libroService.findByAutorId(id);
    }
}