package br.com.leorocha.lstudio.dto;

import br.com.leorocha.lstudio.entity.Agendamento;
import br.com.leorocha.lstudio.entity.FormaPagamento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendamentoDTO {
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
    private FormaPagamento formaPagamento;
    private Long idServico;
    private String servico;

    public AgendamentoDTO(Agendamento agendamento){
        this.id = agendamento.getId();
        this.cliente = agendamento.getCliente();
        this.contato = agendamento.getContato();
        this.dataAgendamento = agendamento.getDataAgendamento();
        this.precoServico = agendamento.getPrecoServico();
        this.desconto = agendamento.getDesconto();
        this.precoTotal = agendamento.getPrecoTotal();
        this.valorPago = agendamento.getValorPago();
        this.foiPago = agendamento.isFoiPago();
        this.confirmado = agendamento.isConfirmado();
        this.foi = agendamento.isFoi();
        this.cancelado = agendamento.isCancelado();
        this.formaPagamento = agendamento.getFormaPagamento();
        this.idServico = agendamento.getServico().getId();
        this.servico = agendamento.getServico().getNome();
        this.dataAgendamento = agendamento.getDataAgendamento().minusHours(3);
    }

}
