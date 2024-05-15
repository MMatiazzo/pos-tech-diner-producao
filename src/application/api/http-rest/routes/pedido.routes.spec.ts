import { Body, Query } from '@nestjs/common';
import { Pedido } from 'src/core/pedido/entity/pedido.entity';
import { EditarPedidoDto } from 'src/core/pedido/dto/editar-pedido.dto';
import { ListarPedidoDto } from 'src/core/pedido/dto/listar-pedido.dto';
import { CadastrarPedidoDto } from 'src/core/pedido/dto/cria-pedido.dto';
import { PedidoControllerRoute } from './pedido.routes';

// Mock implementations of dependencies
const mockListarPedidoController = {
  handle: jest.fn()
};

const mockEditarPedidoStatusController = {
  handle: jest.fn()
};

const mockCadastrarPedidoController = {
  handle: jest.fn()
};

describe('PedidoControllerRoute Test Suite', () => {
  let controller: PedidoControllerRoute;

  beforeEach(() => {
    // Use the mocked implementations instead of the real ones
    controller = new PedidoControllerRoute(
      mockListarPedidoController as any,
      mockEditarPedidoStatusController as any,
      mockCadastrarPedidoController as any
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('cadastrar', () => {
    it('Deve Cadastra um pedido', async () => {
      // Mock data
      const payload: CadastrarPedidoDto = { id: '1', produtos: [], status: 'Aguardando_pagamento' };

      // Call the controller method
      await controller.cadastrar(payload);

      // Assertions
      expect(mockCadastrarPedidoController.handle).toHaveBeenCalledWith(payload);
    });
  });

  describe('listar', () => {
    it('Deve listar os pedidos', async () => {
      // Mock data
      const payload: ListarPedidoDto = { ids: [] };
      const expectedResult: Pedido[] = [];

      // Mock the handle method of ListarPedidoController
      mockListarPedidoController.handle.mockResolvedValue(expectedResult);

      // Call the controller method
      const result = await controller.listar(payload);

      // Assertions
      expect(result).toEqual(expectedResult);
      expect(mockListarPedidoController.handle).toHaveBeenCalledWith(payload);
    });
  });

  describe('editarStatus', () => {
    it('Deve editar um pedido pelo id', async () => {
      // Mock data
      const payload: EditarPedidoDto = { id: '1', status: 'Recebido' };

      // Call the controller method
      await controller.editarStatus(payload);

      // Assertions
      expect(mockEditarPedidoStatusController.handle).toHaveBeenCalledWith(payload);
    });
  });
});
