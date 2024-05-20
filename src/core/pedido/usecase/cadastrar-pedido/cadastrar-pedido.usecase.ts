import { Inject, Injectable } from "@nestjs/common";
import { IPedidoGateway } from "../../../../application/operation/gateways/pedido/Ipedido.gateway";
import { CadastrarPedidoDto } from "../../dto/cria-pedido.dto";
import { Pedido } from "../../entity/pedido.entity";

@Injectable()
export class CadastrarPedidoStatusUseCase {
  constructor(
    @Inject(IPedidoGateway)
    private pedidoGateway: IPedidoGateway
  ) { }

  async execute(payload: CadastrarPedidoDto): Promise<Pedido> {
    return await this.pedidoGateway.cadastrarPedido(payload);
  }
}
