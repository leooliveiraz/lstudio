package br.com.leorocha.lstudio.controller;

import br.com.leorocha.lstudio.dto.AgendamentoDTO;
import br.com.leorocha.lstudio.dto.UserDTO;
import br.com.leorocha.lstudio.entity.Agendamento;
import br.com.leorocha.lstudio.entity.Usuario;
import br.com.leorocha.lstudio.repository.AgendamentoRepo;
import br.com.leorocha.lstudio.repository.ServicoRepo;
import br.com.leorocha.lstudio.service.RequestService;
import br.com.leorocha.lstudio.service.UsuarioService;
import org.apache.http.auth.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/analise")
public class AnaliseController {
    @Autowired
    private AgendamentoRepo repo;
    @Autowired
    private ServicoRepo servicoRepo;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private RequestService requestService;

    @GetMapping("/proximo-cliente")
    public AgendamentoDTO proximoClienteHoje() throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        List<Agendamento> agendamentos = this.repo.proximoAgendamentoHoje(usuario.getId(), LocalDateTime.now());
        Agendamento agendamento = agendamentos.get(0);
        if(!agendamento.getUsuario().getId().equals(usuario.getId())){
            throw new AuthenticationException("Você não pode editar esse registro");
        }
        AgendamentoDTO dto = new AgendamentoDTO(agendamento);
        return dto;
    }

    @GetMapping("/quantidade-hoje")
    public Long quantidadeHoje() throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Long quantidade = this.repo.quantidadeHoje(usuario.getId(), LocalDateTime.now());
        return quantidade;
    }

    @GetMapping("/atendidos-hoje")
    public Long atendidosHoje() throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Long quantidade = this.repo.atendidosHoje(usuario.getId(), LocalDateTime.now());
        return quantidade;
    }


    @GetMapping("/cancelados-hoje")
    public Long canceladosHoje() throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Long quantidade = this.repo.canceladoHoje(usuario.getId(), LocalDateTime.now());
        return quantidade;
    }


    @GetMapping("/confirmacao-pendente-hoje")
    public Long confirmacaoPendenteHoje() throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Long quantidade = this.repo.confirmacaoPendenteHoje(usuario.getId(), LocalDateTime.now());
        return quantidade;
    }

    @GetMapping("/faltou-hoje")
    public Long faltouHoje() throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Long quantidade = this.repo.faltouHoje(usuario.getId(), LocalDateTime.now());
        return quantidade;
    }


}
