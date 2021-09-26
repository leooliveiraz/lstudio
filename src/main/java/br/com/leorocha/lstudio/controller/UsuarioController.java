package br.com.leorocha.lstudio.controller;

import br.com.leorocha.lstudio.entity.Usuario;
import br.com.leorocha.lstudio.repository.UsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
    @Autowired
    UsuarioRepo repo;

    @PostMapping
    public void cadastrarUsuario(Usuario usuario) throws Exception {
        if(usuario == null)
            throw new Exception("Preencha todos os dados");
        repo.save(usuario);
    }


}
