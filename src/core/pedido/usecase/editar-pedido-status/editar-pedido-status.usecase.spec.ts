import { IPedidoGateway } from 'src/application/operation/gateways/pedido/Ipedido.gateway';
import { IQueueGateway } from 'src/application/operation/gateways/queue/Iqueue.gateway';
import { EditarPedidoDto } from '../../dto/editar-pedido.dto';
import { EditarPedidoStatusUseCase } from './editar-pedido-status.usecase';

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

    useCase = new EditarPedidoStatusUseCase(pedidoGateway, queueGateway);
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
    expect(pedidoGateway.editarStatusPedido).toHaveBeenCalledWith(id, status);
    expect(queueGateway.enviarMensagem).toHaveBeenCalledWith(
      process.env.SQS_EDITAR_STATUS_PEDIDO_QUEUE,
      { id, status }
    );
  });
});

