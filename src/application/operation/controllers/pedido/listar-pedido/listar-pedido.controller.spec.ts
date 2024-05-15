import { ListarPedidoUseCase } from '../../../../../core/pedido/usecase/listar-pedido/listar-pedido.usecase';
import { ListarPedidoController } from './listar-pedido.controller';
import { IPedidoGateway } from "../../../../../application/operation/gateways/pedido/Ipedido.gateway";
import { ListarPedidoDto } from '../../../../../core/pedido/dto/listar-pedido.dto';
import { Pedido } from '../../../../../core/pedido/entity/pedido.entity';

const mockPedidoGateway: jest.Mocked<IPedidoGateway> = {
  listarPedido: jest.fn().mockResolvedValue([/* Mocked Pedido objects */]),
  cadastrarPedido: jest.fn().mockResolvedValue([/* Mocked Pedido objects */]),
  editarStatusPedido: jest.fn().mockResolvedValue([/* Mocked Pedido objects */]),
};

describe('ListarPedidoController Test Suite', () => {
  let controller: ListarPedidoController;
  let listarPedidoUseCase: ListarPedidoUseCase

  beforeEach(() => {
    listarPedidoUseCase = new ListarPedidoUseCase(mockPedidoGateway);
    controller = new ListarPedidoController(listarPedidoUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handle', () => {
    it('Deve retornar um array de pedidos', async () => {

      const payload: ListarPedidoDto = { ids: ['123'] };
      const expectedResult: Pedido[] = [];

      const result = await controller.handle(payload);

      expect(result).toEqual(expectedResult);
      expect(mockPedidoGateway.listarPedido).toHaveBeenCalledWith(payload);
    });
  });
});
