package br.com.leorocha.lstudio.service;

import br.com.leorocha.lstudio.entity.Usuario;
import br.com.leorocha.lstudio.repository.UsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepo repository;

    public void salvar(Usuario usuario) {
        repository.save(usuario);
    }
    public void atualizar(Usuario usuario) {
        repository.save(usuario);
    }
    public Usuario buscar(Long id) {
        return repository.findById(id).orElse(null);
    }
    public List<Usuario> listar() {
        return (List<Usuario>) repository.findAll();
    }
    public void delete(Long id) {
        repository.deleteById(id);
    }
    public boolean usuarioExiste(String sub) {
        boolean existe = repository.existsBySub(sub);
        return existe;
    }
    public Usuario buscarPorSub(String sub) {
        Usuario usuario = repository.findBySub(sub);
        return usuario;
    }
}