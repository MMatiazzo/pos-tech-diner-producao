import { ListarPedidoUseCase } from './listar-pedido.usecase';
import { IPedidoGateway } from 'src/application/operation/gateways/pedido/Ipedido.gateway';
import { ListarPedidoDto } from '../../dto/listar-pedido.dto';
import { Pedido } from '../../entity/pedido.entity';

describe('ListarPedidoUseCase Test Suite', () => {
  let useCase: ListarPedidoUseCase;
  let pedidoGateway: IPedidoGateway;

  beforeEach(() => {
    pedidoGateway = {
      listarPedido: jest.fn(async () => {
        return [
          { id: '1', status: 'Pronto', produtos: [] },
          { id: '2', status: 'Pronto', produtos: [] },
          { id: '3', status: 'Pronto', produtos: [] },
        ]
      }),
      editarStatusPedido: jest.fn(),
      cadastrarPedido: jest.fn(),
    } as IPedidoGateway;

    useCase = new ListarPedidoUseCase(pedidoGateway);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('Deve chamar o pedido gateway com os parametros corretos', async () => {
    const ids = ['1', '2', '3'];
    const listarPedidoDto: ListarPedidoDto = { ids };
    const result = await useCase.execute(listarPedidoDto);

    expect(result).toEqual([
      { id: '1', status: 'Pronto', produtos: [] },
      { id: '2', status: 'Pronto', produtos: [] },
      { id: '3', status: 'Pronto', produtos: [] },
    ]);
  });
});
