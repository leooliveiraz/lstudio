package br.com.leorocha.lstudio.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cliente;
    private String contato;
    private LocalDateTime dataAgendamento;
    private BigDecimal precoServico;
    private BigDecimal desconto;
    private BigDecimal precoTotal;
    private BigDecimal valorPago;
    private boolean foiPago = false;
    private boolean confirmado = false;
    private boolean foi;

    @ManyToOne
    @JoinColumn(name = "servico")
    private Servico servico;

    @ManyToOne
    @JoinColumn(name = "usuario")
    private Usuario usuario;

}
