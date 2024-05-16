import { CadastrarPedidoDto } from '../../../../../core/pedido/dto/cria-pedido.dto';
import { CadastrarPedidoStatusUseCase } from '../../../../../core/pedido/usecase/cadastrar-pedido/cadastrar-pedido.usecase';
import { CadastrarPedidoController } from './cadastrar-pedido.controller';

// Mock implementations of dependencies
const mockPedidoGateway = {
  cadastrarPedido: jest.fn(),
};

describe('CadastrarPedidoStatusController Test Suite', () => {
  let controller: CadastrarPedidoController;
  let cadastrarPedidoStatusUseCase: CadastrarPedidoStatusUseCase;

  beforeEach(() => {
    // Use the mocked implementations instead of the real ones
    cadastrarPedidoStatusUseCase = new CadastrarPedidoStatusUseCase(
      mockPedidoGateway as any
    );
    controller = new CadastrarPedidoController(cadastrarPedidoStatusUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handle', () => {
    it('Deve chamar o Cadastrar Pedido Usecase', async () => {
      // Mock data
      const payload: CadastrarPedidoDto = {
        id: '1',
        produtos: [],
        status: 'Aguardando_pagamento',
      };

      // Call the controller method
      await controller.handle(payload);
    });
  });
});
