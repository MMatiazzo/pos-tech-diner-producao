import { CadastrarPedidoDto } from 'src/core/pedido/dto/cria-pedido.dto';
import { ListarPedidoDto } from 'src/core/pedido/dto/listar-pedido.dto';
import { IPedidoRepository } from 'src/infrastructure/persistence/repositories/pedido/Ipedido.repository';
import { PedidoGateway } from './pedido.gateway';

describe('PedidoGateway', () => {
  let gateway: PedidoGateway;
  let repository: IPedidoRepository;

  beforeEach(() => {
    repository = {
      listar: jest.fn(),
      editar: jest.fn(),
      cadastrar: jest.fn(),
    } as IPedidoRepository;

    gateway = new PedidoGateway(repository);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('listarPedido', () => {
    it('should call pedidoRepository.listar with correct parameters', async () => {
      // Arrange
      const ids = ['1', '2', '3'];
      const dto: ListarPedidoDto = { ids };

      // Act
      await gateway.listarPedido(dto);

      // Assert
      expect(repository.listar).toHaveBeenCalledWith([{ $match: { "_id": { $in: ids.map(id => ({ "$oid": id })) } } }]);
    });
  });

  describe('editarStatusPedido', () => {
    it('should call pedidoRepository.editar with correct parameters and return the result', async () => {
      // Arrange
      const id = '1';
      const status = 'Finalizado';

      // Act
      await gateway.editarStatusPedido(id, status, 'session' as any);

      // Assert
      expect(repository.editar).toHaveBeenCalledWith(id, 'status', status, 'session');
    });
  });

  describe('cadastrarPedido', () => {
    it('should call pedidoRepository.cadastrar with correct parameters and return the result', async () => {
      // Arrange
      const pedido: CadastrarPedidoDto = {
        id: '1',
        produtos: [],
        status: 'Aguardando_pagamento',
      };

      // Act
      await gateway.cadastrarPedido(pedido);

      // Assert
      expect(repository.cadastrar).toHaveBeenCalledWith(pedido);
    });
  });
});
