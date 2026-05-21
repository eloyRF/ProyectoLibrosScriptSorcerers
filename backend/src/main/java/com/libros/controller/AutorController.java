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

    @GetMapping("/{nombre}")
    public Optional<Autor> getByNombre(@PathVariable String nombre) {
        return autorService.findByNombre(nombre);
    }

    @PostMapping
    public Autor create(@RequestBody Autor autor) {
        return autorService.save(autor);
    }

    @GetMapping("/{nombre}/libros")
    public List<Libro> getLibrosByAutor(@PathVariable String nombre) {
        return libroService.findByAutorNombre(nombre);
    }
}