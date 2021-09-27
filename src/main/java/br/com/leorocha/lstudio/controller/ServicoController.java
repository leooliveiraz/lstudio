package br.com.leorocha.lstudio.controller;

import br.com.leorocha.lstudio.dto.ServicoDTO;
import br.com.leorocha.lstudio.dto.UserDTO;
import br.com.leorocha.lstudio.entity.Servico;
import br.com.leorocha.lstudio.entity.Usuario;
import br.com.leorocha.lstudio.repository.ServicoRepo;
import br.com.leorocha.lstudio.service.RequestService;
import br.com.leorocha.lstudio.service.UsuarioService;
import org.apache.http.auth.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/servicos")
public class ServicoController {

    @Autowired
    private ServicoRepo repo;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private RequestService requestService;

    @GetMapping("/{id}")
    public ServicoDTO getServico(@PathVariable Long id){
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());
        Servico servico = this.repo.findById(id).get();
        ServicoDTO dto = new ServicoDTO();
        dto.setId(servico.getId());
        dto.setNome(servico.getNome());
        dto.setPreco(servico.getPreco());
        return dto;
    }

    @GetMapping
    public List<ServicoDTO> getServicos(){
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());
        List<Servico> servicoList = this.repo.findByUsuarioId(usuario.getId());
        List<ServicoDTO> dtos = new ArrayList<>();
        if(!servicoList.isEmpty()){
            servicoList.forEach(s -> {
                dtos.add(new ServicoDTO(s.getId(),s.getNome(),s.getPreco()));
            });
        }

        return dtos;
    }

    @PostMapping
    public void salvar(@RequestBody ServicoDTO dto){
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Servico servico = new Servico();
        servico.setNome(dto.getNome());
        servico.setPreco(dto.getPreco());
        servico.setUsuario(usuario);

        this.repo.save(servico);
    }

    @PutMapping
    public void editar(@RequestBody ServicoDTO dto) throws AuthenticationException {
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());

        Servico servico = this.repo.findById(dto.getId()).get();
        if(!servico.getUsuario().getId().equals(usuario.getId())){
            throw new AuthenticationException("Você não pode editar esse registro");
        }
        servico.setNome(dto.getNome());
        servico.setPreco(dto.getPreco());
        servico.setUsuario(usuario);

        this.repo.save(servico);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        UserDTO userDTO = requestService.getUserDTO();
        Usuario usuario = usuarioService.buscarPorSub(userDTO.getSub());
        Servico servico = this.repo.findById(id).get();
        if(servico.getUsuario().getId().equals(usuario.getId()))
            this.repo.deleteById(id);
    }

}
