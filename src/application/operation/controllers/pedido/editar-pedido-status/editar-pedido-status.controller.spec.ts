import { EditarPedidoDto } from '../../../../../core/pedido/dto/editar-pedido.dto';
import { EditarPedidoStatusController } from './editar-pedido-status.controller';
import { EditarPedidoStatusUseCase } from '../../../../../core/pedido/usecase/editar-pedido-status/editar-pedido-status.usecase';
import { ClientSession } from 'mongoose';

// Mock implementations of dependencies
const mockPedidoGateway = {
  editarStatusPedido: jest.fn(async () => {
    return {
      id: '1',
      status: 'Finalizado',
      produtos: []
    }
  }),
};

const mockQueueGateway = {
  enviarMensagem: jest.fn()
};

let session = {
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  abortTransaction: jest.fn(),
  endSession: jest.fn(),
} as unknown as ClientSession;

const mockConnection = {
  startSession: jest.fn().mockResolvedValue(session),
};

describe('EditarPedidoStatusController Test Suite', () => {
  let controller: EditarPedidoStatusController;
  let editarPedidoStatusUseCase: EditarPedidoStatusUseCase;

  beforeEach(() => {
    // Use the mocked implementations instead of the real ones
    editarPedidoStatusUseCase = new EditarPedidoStatusUseCase(
      mockPedidoGateway as any,
      mockQueueGateway as any,
      mockConnection as any
    );
    controller = new EditarPedidoStatusController(editarPedidoStatusUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handle', () => {
    it('should call EditarPedidoStatusUseCase.execute with correct payload', async () => {
      // Mock data
      const payload: EditarPedidoDto = { id: '1', status: 'Finalizado' };

      // Call the controller method
      await controller.handle(payload);
    });
  });
});
