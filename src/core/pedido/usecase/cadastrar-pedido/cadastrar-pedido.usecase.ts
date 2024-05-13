import { Inject, Injectable } from "@nestjs/common";
import { IPedidoGateway } from "src/application/operation/gateways/pedido/Ipedido.gateway";
import { CadastrarPedidoDto } from "../../dto/cria-pedido.dto";

@Injectable()
export class CadastrarPedidoStatusUseCase {
  constructor(
    @Inject(IPedidoGateway)
    private pedidoGateway: IPedidoGateway
  ) { }

  async execute(payload: CadastrarPedidoDto): Promise<void> {
    await this.pedidoGateway.cadastrarPedido(payload);
  }
}
