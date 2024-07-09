import { Inject, Injectable } from "@nestjs/common";
import { IPedidoGateway } from "../../../../application/operation/gateways/pedido/Ipedido.gateway";
import { IQueueGateway } from "../../../../application/operation/gateways/queue/Iqueue.gateway";
import { EditarPedidoDto } from "../../dto/editar-pedido.dto";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Injectable()
export class EditarPedidoStatusUseCase {
  constructor(
    @Inject(IPedidoGateway)
    private pedidoGateway: IPedidoGateway,
    @Inject(IQueueGateway)
    private queueGateway: IQueueGateway,
    @InjectConnection()
    private readonly connection: Connection,
  ) { }

  async execute({ id, status }: EditarPedidoDto): Promise<void> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const pedidoModificado = await this.pedidoGateway.editarStatusPedido(id, status, session);

      const pedido = {
        id: pedidoModificado.id,
        status: pedidoModificado.status
      }

      await this.queueGateway.enviarMensagem(
        process.env.SQS_EDITAR_STATUS_PEDIDO_QUEUE,
        pedido
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
