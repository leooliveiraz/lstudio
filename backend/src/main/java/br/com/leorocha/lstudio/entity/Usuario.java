package br.com.leorocha.lstudio.entity;

import br.com.leorocha.lstudio.dto.UserDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true, nullable=false)
    private String sub;
    private String email;
    private boolean email_verified;
    private String at_hash;
    private String name;
    private String picture;
    private String given_name;
    private String family_name;
    private String locale;
    private String tipo;

    public Usuario(UserDTO dto){
        this.setSub(dto.getSub());
        this.setEmail(dto.getEmail());
        this.setEmail_verified(dto.isEmail_verified());
        this.setAt_hash(dto.getAt_hash());
        this.setName(dto.getName());
        this.setPicture(dto.getPicture());
        this.setGiven_name(dto.getGiven_name());
        this.setFamily_name(dto.getFamily_name());
        this.setLocale(dto.getLocale());
        this.setTipo(dto.getIss().contains("google") ? "GOOGLE" : "N");
    }

}
