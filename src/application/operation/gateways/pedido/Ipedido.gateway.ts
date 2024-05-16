import { ListarPedidoDto } from "../../../../core/pedido/dto/listar-pedido.dto";
import { Pedido } from "../../../../core/pedido/entity/pedido.entity";

export interface IPedidoGateway {
  listarPedido(pedidosIds: ListarPedidoDto): Promise<Pedido[]>;
  editarStatusPedido(id: string, status: string): Promise<Pedido>;
  cadastrarPedido(pedido: Pedido): Promise<Pedido>;
}

export const IPedidoGateway = Symbol('IPedidoGateway');