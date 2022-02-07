package br.com.leorocha.lstudio.repository;

import br.com.leorocha.lstudio.entity.Agendamento;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepo extends CrudRepository<Agendamento, Long> {
    List<Agendamento> findByUsuarioIdOrderByIdDesc(Long id);

    @Query("select a from Agendamento a where a.usuario.id = :idUsuario and a.dataAgendamento >= :dataHora")
    List<Agendamento> proximoAgendamentoHoje(Long idUsuario, LocalDateTime dataHora);

    @Query("select count(a.id) from Agendamento a where a.usuario.id = :idUsuario and date(a.dataAgendamento) = date(:dataHora) and a.cancelado = false")
    Long quantidadeHoje(Long idUsuario, LocalDateTime dataHora);

    @Query("select count(a.id) from Agendamento a where a.usuario.id = :idUsuario and date(a.dataAgendamento) = date(:dataHora) and a.foi = true and a.cancelado = false")
    Long atendidosHoje(Long idUsuario, LocalDateTime dataHora);

    @Query("select count(a.id) from Agendamento a where a.usuario.id = :idUsuario and date(a.dataAgendamento) = date(:dataHora) and a.cancelado = true")
    Long canceladoHoje(Long idUsuario, LocalDateTime dataHora);

    @Query("select count(a.id) from Agendamento a where a.usuario.id = :idUsuario and date(a.dataAgendamento) = date(:dataHora) and a.confirmado = false and a.cancelado = false")
    Long confirmacaoPendenteHoje(Long idUsuario, LocalDateTime dataHora);


    @Query("select count(a.id) from Agendamento a where a.usuario.id = :idUsuario and date(a.dataAgendamento) = date(:dataHora) and a.foi = false and a.cancelado = false")
    Long faltouHoje(Long idUsuario, LocalDateTime dataHora);
}
