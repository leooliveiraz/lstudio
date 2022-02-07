package br.com.leorocha.lstudio.entity;

import br.com.leorocha.lstudio.dto.AgendamentoDTO;
import br.com.leorocha.lstudio.dto.ServicoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private boolean cancelado = false;

    @Enumerated(EnumType.STRING)
    private FormaPagamento formaPagamento;

    @ManyToOne
    @JoinColumn(name = "servico")
    private Servico servico;

    @ManyToOne
    @JoinColumn(name = "usuario")
    private Usuario usuario;

    public Agendamento(AgendamentoDTO dto) {
        this.id = dto.getId();
        this.cliente = dto.getCliente();
        this.contato = dto.getContato();
        this.dataAgendamento = dto.getDataAgendamento();
        this.precoServico = dto.getPrecoServico();
        this.desconto = dto.getDesconto();
        this.precoTotal = dto.getPrecoTotal();
        this.valorPago = dto.getValorPago();
        this.foiPago = dto.isFoiPago();
        this.confirmado = dto.isConfirmado();
        this.foi = dto.isFoi();
        this.cancelado = dto.isCancelado();
        this.formaPagamento = dto.getFormaPagamento();
    }

    public void atualizar(AgendamentoDTO dto) {
        this.id = dto.getId();
        this.cliente = dto.getCliente();
        this.contato = dto.getContato();
        this.dataAgendamento = dto.getDataAgendamento();
        this.precoServico = dto.getPrecoServico();
        this.desconto = dto.getDesconto();
        this.precoTotal = dto.getPrecoTotal();
        this.valorPago = dto.getValorPago();
        this.foiPago = dto.isFoiPago();
        this.confirmado = dto.isConfirmado();
        this.foi = dto.isFoi();
        this.cancelado = dto.isCancelado();
        this.formaPagamento = dto.getFormaPagamento();
    }
}
