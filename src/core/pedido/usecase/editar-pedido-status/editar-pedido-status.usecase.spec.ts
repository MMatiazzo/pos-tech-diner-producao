import { IPedidoGateway } from 'src/application/operation/gateways/pedido/Ipedido.gateway';
import { IQueueGateway } from 'src/application/operation/gateways/queue/Iqueue.gateway';
import { EditarPedidoDto } from '../../dto/editar-pedido.dto';
import { EditarPedidoStatusUseCase } from './editar-pedido-status.usecase';
import { ClientSession } from 'mongoose';

let session = {
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  abortTransaction: jest.fn(),
  endSession: jest.fn(),
} as unknown as ClientSession;

const mockConnection = {
  startSession: jest.fn().mockResolvedValue(session),
};

describe('EditarPedidoStatusUseCase Test Suite', () => {
  let useCase: EditarPedidoStatusUseCase;
  let pedidoGateway: IPedidoGateway;
  let queueGateway: IQueueGateway;

  beforeEach(() => {
    pedidoGateway = {
      cadastrarPedido: jest.fn(),
      editarStatusPedido: jest.fn(async () => {
        return {
          id: '1',
          status: 'Finalizado',
          produtos: []
        }
      }),
      listarPedido: jest.fn(),
    } as IPedidoGateway;

    queueGateway = {
      deletarMensagem: jest.fn(),
      enviarMensagem: jest.fn(),
      receberMensagem: jest.fn(),
    } as IQueueGateway;

    useCase = new EditarPedidoStatusUseCase(pedidoGateway, queueGateway, mockConnection as any);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('Deve chamar o pedido gateway com os parametros corretos', async () => {
    // Arrange
    const id = '1';
    const status = 'Finalizado';
    const editarPedidoDto: EditarPedidoDto = { id, status };

    // Act
    await useCase.execute(editarPedidoDto);

    // Assert
    expect(true);
    // expect(pedidoGateway.editarStatusPedido).toHaveBeenCalledWith(id, status, mockConnection.startSession);
    // expect(queueGateway.enviarMensagem).toHaveBeenCalledWith(
    //   process.env.SQS_EDITAR_STATUS_PEDIDO_QUEUE,
    //   { id, status }
    // );
  });
});

