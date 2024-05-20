import { Inject } from '@nestjs/common';
import { CadastrarPedidoDto } from '../../../.././../core/pedido/dto/cria-pedido.dto';
import { CadastrarPedidoStatusUseCase } from '../../../.././../core/pedido/usecase/cadastrar-pedido/cadastrar-pedido.usecase';
import { Pedido } from 'src/core/pedido/entity/pedido.entity';

export class CadastrarPedidoController {
  constructor(
    @Inject(CadastrarPedidoStatusUseCase)
    private cadastrarPedidoStatusUseCase: CadastrarPedidoStatusUseCase
  ) { }

  async handle(payload: CadastrarPedidoDto): Promise<Pedido> {
    return await this.cadastrarPedidoStatusUseCase.execute(payload);
  }
}
