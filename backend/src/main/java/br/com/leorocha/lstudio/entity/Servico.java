package br.com.leorocha.lstudio.entity;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private BigDecimal preco;

    @ManyToOne
    @JoinColumn(name = "usuario")
    private Usuario usuario;
}
