import { Inject } from '@nestjs/common';
import { EditarPedidoDto } from 'src/core/pedido/dto/editar-pedido.dto';
import { EditarPedidoStatusUseCase } from 'src/core/pedido/usecase/editar-pedido-status/editar-pedido-status.usecase';

export class EditarPedidoStatusController {
  constructor(
    @Inject(EditarPedidoStatusUseCase)
    private editarPedidoStatusUseCase: EditarPedidoStatusUseCase
  ) { }

  async handle(payload: EditarPedidoDto): Promise<void> {
    await this.editarPedidoStatusUseCase.execute(payload);
  }
}
