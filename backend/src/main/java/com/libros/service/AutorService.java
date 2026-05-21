package com.libros.service;

import com.libros.model.Autor;
import com.libros.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public List<Autor> findAll() {
        return autorRepository.findAll();
    }

    public Optional<Autor> findByNombre(String nombre) {
        return autorRepository.findById(nombre);
    }

    public Autor save(Autor autor) {
        return autorRepository.save(autor);
    }
}