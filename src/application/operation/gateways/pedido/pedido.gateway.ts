import { Inject } from "@nestjs/common";
import { Pedido } from "../../../../core/pedido/entity/pedido.entity";
import { IPedidoRepository } from "../../../..//infrastructure/persistence/repositories/pedido/Ipedido.repository";
import { IPedidoGateway } from "./Ipedido.gateway";
import { ListarPedidoDto } from "../../../../core/pedido/dto/listar-pedido.dto";
import { CadastrarPedidoDto } from "../../../../core/pedido/dto/cria-pedido.dto";

export class PedidoGateway implements IPedidoGateway {
  constructor(
    @Inject(IPedidoRepository)
    private pedidoRepository: IPedidoRepository
  ) { }

  async listarPedido({ ids }: ListarPedidoDto) {

    let arrayMatch = [];
    if (ids?.length) {
      const idMatch = {
        $match: {
          "_id": {
            $in: ids.map(id => ({ "$oid": id }))
          }
        }
      }
      arrayMatch.push(idMatch)
    }

    return this.pedidoRepository.listar(arrayMatch);
  }

  async editarStatusPedido(id: string, status: string, session: any): Promise<Pedido> {
    const pedidoModificado = await this.pedidoRepository.editar(id, 'status', status, session);
    return pedidoModificado;
  }

  async cadastrarPedido(pedido: CadastrarPedidoDto): Promise<any> {
    return await this.pedidoRepository.cadastrar(pedido);
  }
}