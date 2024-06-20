import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { EditarPedidoStatusUseCase } from '../../core/pedido/usecase/editar-pedido-status/editar-pedido-status.usecase';
import { ListarPedidoUseCase } from '../../core/pedido/usecase/listar-pedido/listar-pedido.usecase';
import { ProducaoDocument, ProducaoSchema } from '../../infrastructure/persistence/mongoose/schemas/producao/producao.schema';
import { IPedidoRepository } from '../../infrastructure/persistence/repositories/pedido/Ipedido.repository';
import { PedidoMongodbMongooseRepository } from '../../infrastructure/persistence/repositories/pedido/pedido-mongodb-mongoose.repository';
import { PedidoControllerRoute } from '../api/http-rest/routes/pedido.routes';
import { EditarPedidoStatusController } from '../operation/controllers/pedido/editar-pedido-status/editar-pedido-status.controller';
import { ListarPedidoController } from '../operation/controllers/pedido/listar-pedido/listar-pedido.controller';
import { IPedidoGateway } from '../operation/gateways/pedido/Ipedido.gateway';
import { PedidoGateway } from '../operation/gateways/pedido/pedido.gateway';
import { CadastrarPedidoStatusUseCase } from '../../core/pedido/usecase/cadastrar-pedido/cadastrar-pedido.usecase';
import { CadastrarPedidoController } from '../operation/controllers/pedido/cadastrar-pedido/cadastrar-pedido.controller';
import { IQueueGateway } from '../operation/gateways/queue/Iqueue.gateway';
import { SQSQueue } from '../operation/gateways/queue/aws/sqs/sqs-queue';

const persistenceProviders: Provider[] = [
  {
    provide: IPedidoRepository,
    useFactory: (producaoModel: Model<ProducaoDocument>) =>
      new PedidoMongodbMongooseRepository(producaoModel),
    inject: [getModelToken('producao')]
  },
  {
    provide: IPedidoGateway,
    useFactory: (pedidoRepository: IPedidoRepository) =>
      new PedidoGateway(pedidoRepository),
    inject: [IPedidoRepository],
  },
  {
    provide: IQueueGateway,
    useFactory: () => new SQSQueue(),
    inject: []
  }
];

const useCaseProviders: Provider[] = [
  {
    provide: ListarPedidoUseCase,
    useFactory: (pedidoGateway: IPedidoGateway) =>
      new ListarPedidoUseCase(pedidoGateway),
    inject: [IPedidoGateway],
  },
  {
    provide: EditarPedidoStatusUseCase,
    useFactory: (
      pedidoGateway: IPedidoGateway,
      queueGateway: IQueueGateway,
      connection: Connection
    ) => new EditarPedidoStatusUseCase(pedidoGateway, queueGateway, connection),
    inject: [IPedidoGateway, IQueueGateway, 'DatabaseConnection'],
  },
  {
    provide: CadastrarPedidoStatusUseCase,
    useFactory: (pedidoGateway: IPedidoGateway) =>
      new CadastrarPedidoStatusUseCase(pedidoGateway),
    inject: [IPedidoGateway],
  },
];

const controllerProviders: Provider[] = [
  {
    provide: ListarPedidoController,
    useFactory: (listarPedidoUseCase: ListarPedidoUseCase) =>
      new ListarPedidoController(listarPedidoUseCase),
    inject: [ListarPedidoUseCase],
  },
  {
    provide: EditarPedidoStatusController,
    useFactory: (editarPedidoStatusUseCase: EditarPedidoStatusUseCase) =>
      new EditarPedidoStatusController(editarPedidoStatusUseCase),
    inject: [EditarPedidoStatusUseCase],
  },
  {
    provide: CadastrarPedidoController,
    useFactory: (cadastrarPedidoUseCase: CadastrarPedidoStatusUseCase) =>
      new CadastrarPedidoController(cadastrarPedidoUseCase),
    inject: [CadastrarPedidoStatusUseCase],
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'producao', schema: ProducaoSchema }]),
  ],
  controllers: [PedidoControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class PedidoModule { }
