import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { EditarPedidoStatusUseCase } from 'src/core/pedido/usecase/editar-pedido-status/editar-pedido-status.usecase';
import { ListarPedidoUseCase } from 'src/core/pedido/usecase/listar-pedido/listar-pedido.usecase';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
import { IPedidoRepository } from 'src/infrastructure/persistence/repositories/pedido/Ipedido.repository';
import { PedidoMongoDbRepository } from 'src/infrastructure/persistence/repositories/pedido/pedido-mongodb.repository';
import { PedidoControllerRoute } from '../api/http-rest/routes/pedido.routes';
import { EditarPedidoStatusController } from '../operation/controllers/pedido/editar-pedido-status/editar-pedido-status.controller';
import { ListarPedidoController } from '../operation/controllers/pedido/listar-pedido/listar-pedido.controller';
import { IPedidoGateway } from '../operation/gateways/pedido/Ipedido.gateway';
import { PedidoGateway } from '../operation/gateways/pedido/pedido.gateway';

const persistenceProviders: Provider[] = [
  PrismaService,
  {
    provide: IPedidoRepository,
    useFactory: (prisma: PrismaService) => new PedidoMongoDbRepository(prisma),
    inject: [PrismaService],
  },
  {
    provide: IPedidoGateway,
    useFactory: (pedidoRepository: IPedidoRepository) =>
      new PedidoGateway(pedidoRepository),
    inject: [IPedidoRepository],
  },
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
    useFactory: (pedidoGateway: IPedidoGateway) =>
      new EditarPedidoStatusUseCase(pedidoGateway),
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
];

@Module({
  imports: [],
  controllers: [PedidoControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class PedidoModule {}
