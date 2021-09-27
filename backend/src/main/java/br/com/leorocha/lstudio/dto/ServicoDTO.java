package br.com.leorocha.lstudio.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ServicoDTO {
    private Long id;
    private String nome;
    private BigDecimal preco;

    public ServicoDTO(Long id, String nome, BigDecimal preco) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }
}
