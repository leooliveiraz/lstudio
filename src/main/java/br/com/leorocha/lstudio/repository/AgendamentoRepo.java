package br.com.leorocha.lstudio.repository;

import br.com.leorocha.lstudio.entity.Agendamento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepo extends CrudRepository<Agendamento, Long> {
}
