import { Inject, Injectable } from "@nestjs/common";
import { IPedidoGateway } from "src/application/operation/gateways/pedido/Ipedido.gateway";
import { IQueueGateway } from "src/application/operation/gateways/queue/Iqueue.gateway";
import { EditarPedidoDto } from "../../dto/editar-pedido.dto";

@Injectable()
export class EditarPedidoStatusUseCase {
  constructor(
    @Inject(IPedidoGateway)
    private pedidoGateway: IPedidoGateway,
    @Inject(IQueueGateway)
    private queueGateway: IQueueGateway
  ) { }

  async execute({ id, status }: EditarPedidoDto): Promise<void> {
    const pedidoModificado = await this.pedidoGateway.editarStatusPedido(id, status);

    const pedido = {
      id: pedidoModificado.id,
      status: pedidoModificado.status
    }

    console.log('pedido => ', pedido);

    await this.queueGateway.enviarMensagem(
      process.env.SQS_EDITAR_STATUS_PEDIDO_QUEUE,
      pedido
    );
  }
}
