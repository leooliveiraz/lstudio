package br.com.leorocha.lstudio.repository;

import br.com.leorocha.lstudio.entity.Servico;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicoRepo extends CrudRepository<Servico, Long> {
    List<Servico> findByUsuarioId(Long id);
}
