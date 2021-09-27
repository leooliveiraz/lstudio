package br.com.leorocha.lstudio.repository;

import br.com.leorocha.lstudio.entity.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepo  extends CrudRepository<Usuario, Long> {
    boolean existsBySub(String sub);

    Usuario findBySub(String sub);
}
