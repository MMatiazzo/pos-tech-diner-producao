import { Produto } from "src/core/produto/entity/produto.entity";
import { NewPedidoDto } from "../dto/cria-pedido.dto";

export enum CardinalDirections {
  AGUARDANDO_PAGAMENTO = 'Aguardando_Pagamento',
  PAGAMENTO_RECUSADO = 'Pagamento_Recusado',
  PAGAMENTO_CONFIRMADO = 'Recebido',
  EM_PREPARACAO = "Em_preparacao",
  PRONTO = 'Pronto',
  FINALIZADO = 'Finalizado'
};

export class Pedido {
  id?: string;
  status: string;
  produtos: Produto[];
  clienteId?: string;

  private constructor(payload: NewPedidoDto) {
    this.status = payload.status;
    this.produtos = payload.produtos;
    if (payload?.clienteId) this.clienteId = payload.clienteId;
  }

  public static new(payload: NewPedidoDto) {
    const pedido = new Pedido(payload);
    return pedido;
  }
}