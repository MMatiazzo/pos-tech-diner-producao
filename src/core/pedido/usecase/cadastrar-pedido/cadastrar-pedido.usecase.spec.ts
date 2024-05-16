import { IPedidoGateway } from '../../../../application/operation/gateways/pedido/Ipedido.gateway';
import { CadastrarPedidoDto } from '../../dto/cria-pedido.dto';
import { CadastrarPedidoStatusUseCase } from './cadastrar-pedido.usecase';

describe('CadastrarPedidoStatusUseCase', () => {
  let useCase: CadastrarPedidoStatusUseCase;
  let pedidoGateway: IPedidoGateway;

  beforeEach(() => {
    pedidoGateway = {
      cadastrarPedido: jest.fn(),
      editarStatusPedido: jest.fn(),
      listarPedido: jest.fn(),
    } as IPedidoGateway;

    useCase = new CadastrarPedidoStatusUseCase(pedidoGateway);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('Deve chamar o pedido gateway', async () => {
    // Arrange
    const payload: CadastrarPedidoDto = {
      id: '1',
      produtos: [],
      status: 'Aguardando_pagamento',
    };

    // Act
    await useCase.execute(payload);

    // Assert
    expect(pedidoGateway.cadastrarPedido).toHaveBeenCalledWith(payload);
  });
});
