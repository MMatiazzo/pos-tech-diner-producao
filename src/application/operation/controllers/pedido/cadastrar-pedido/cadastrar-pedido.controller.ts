import { Inject } from '@nestjs/common';
import { CadastrarPedidoDto } from 'src/core/pedido/dto/cria-pedido.dto';
import { CadastrarPedidoStatusUseCase } from 'src/core/pedido/usecase/cadastrar-pedido/cadastrar-pedido.usecase';

export class CadastrarPedidoController {
  constructor(
    @Inject(CadastrarPedidoStatusUseCase)
    private cadastrarPedidoStatusUseCase: CadastrarPedidoStatusUseCase
  ) { }

  async handle(payload: CadastrarPedidoDto): Promise<void> {
    await this.cadastrarPedidoStatusUseCase.execute(payload);
  }
}
