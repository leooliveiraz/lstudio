package br.com.leorocha.lstudio.controller;

import br.com.leorocha.lstudio.dto.AgendamentoDTO;
import br.com.leorocha.lstudio.dto.UserDTO;
import br.com.leorocha.lstudio.entity.Agendamento;
import br.com.leorocha.lstudio.entity.Servico;
import br.com.leorocha.lstudio.entity.Usuario;
import br.com.leorocha.lstudio.repository.AgendamentoRepo;
import br.com.leorocha.lstudio.repository.ServicoRepo;
import br.com.leorocha.lstudio.service.RequestService;
import br.com.leorocha.lstudio.service.UsuarioService;
import org.apache.http.auth.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/agendamentos")
public class AgendamentoController {
    @Autowired
    private AgendamentoRepo repo;
    @Autowired
    private ServicoRepo servicoRepo;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private RequestService requestService;

    @GetMapping("/{id}")
    public AgendamentoDTO getServico(@PathVariable Long id) throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Agendamento agendamento = this.repo.findById(id).get();
        if(!agendamento.getUsuario().getId().equals(usuario.getId())){
            throw new AuthenticationException("Você não pode editar esse registro");
        }
        AgendamentoDTO dto = new AgendamentoDTO(agendamento);
        return dto;
    }

    @GetMapping
    public List<AgendamentoDTO> getAgendamentos(){
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());
        List<Agendamento> agendamentoList = this.repo.findByUsuarioIdOrderByIdDesc(usuario.getId());
        List<AgendamentoDTO> dtos = new ArrayList<>();
        if(!agendamentoList.isEmpty()){
            agendamentoList.forEach(item -> {
                dtos.add(new AgendamentoDTO(item));
            });
        }

        return dtos;
    }

    @PostMapping
    public void salvar(@RequestBody AgendamentoDTO dto) throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Agendamento agendamento = new Agendamento(dto);
        Servico servico = dto.getIdServico() != null ?
                this.servicoRepo.findById(dto.getIdServico()).get() : null;

        if(servico != null && !servico.getUsuario().getId().equals(usuario.getId())){
            throw new AuthenticationException("Você não pode editar esse registro");
        }

        agendamento.setServico(servico);
        agendamento.setUsuario(usuario);

        this.repo.save(agendamento);
    }

    @PutMapping
    public void editar(@RequestBody AgendamentoDTO dto) throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Agendamento agendamento = this.repo.findById(dto.getId()).get();
        if(!agendamento.getUsuario().getId().equals(usuario.getId())){
            throw new AuthenticationException("Você não pode editar esse registro");
        }
        Servico servico = this.servicoRepo.findById(dto.getIdServico()).get();
        if(!servico.getUsuario().getId().equals(usuario.getId())){
            throw new AuthenticationException("Você não pode editar esse registro");
        }
        agendamento.setServico(servico);
        agendamento.atualizar(dto);
        this.repo.save(agendamento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());
        Agendamento agendamento = this.repo.findById(id).get();
        if(agendamento.getUsuario().getId().equals(usuario.getId()))
            this.repo.deleteById(id);
    }
}
