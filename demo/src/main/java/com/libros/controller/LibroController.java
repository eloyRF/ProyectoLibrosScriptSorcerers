package com.libros.controller;

import com.libros.model.Libro;
import com.libros.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/libros")
@CrossOrigin(origins = "http://localhost:4200")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @GetMapping
    public List<Libro> getAll() {
        return libroService.findAll();
    }

    @PostMapping
    public Libro create(@RequestBody Libro libro) {
        return libroService.save(libro);
    }
}