import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Pedido } from '../../../../core/pedido/entity/pedido.entity';
import { CadastrarPedidoDto } from '../../../../core/pedido/dto/cria-pedido.dto';
import { PedidoMongodbMongooseRepository } from './pedido-mongodb-mongoose.repository';

const pedidoDto: CadastrarPedidoDto = {
  id: "663f8cee5f8395e090f3d4de",
  status: "Recebido",
  clienteId: "usuarioteste4@email.com.br",
  produtos: [
    {
      _id: "663f7f03e8f9dac785e80157",
      nome: "Whooper",
      categoria: "Lanche Muito bom",
      preco: 10,
      descricao: "Lanche para a maioria",
      imagens: [],
    }
  ]
}

describe('PedidoMongodbMongooseRepository Test Suite', () => {
  let repository: PedidoMongodbMongooseRepository;
  let model: Model<Pedido>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoMongodbMongooseRepository,
        {
          provide: getModelToken('producao'),
          useValue: {
            create: jest.fn(),
            aggregate: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<PedidoMongodbMongooseRepository>(
      PedidoMongodbMongooseRepository,
    );
    model = module.get<Model<Pedido>>(getModelToken('producao'));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('Cadastrar', async () => {
    const pedido: Pedido = pedidoDto;
    const createSpy = jest.spyOn(model, 'create').mockResolvedValueOnce(pedido as any);

    const result = await repository.cadastrar(pedido);

    expect(createSpy).toHaveBeenCalledWith({ ...pedido, _id: '663f8cee5f8395e090f3d4de' });
    expect(result).toEqual(pedido);
  });

  it('Editar', async () => {
    const id = '1';
    const field = 'status';
    const value = 'Finalizado';

    const findByIdAndUpdateSpy = jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);

    await repository.editar(id, field, value);

    expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(
      { _id: id },
      { [field]: value },
      { new: true }
    );
  });

  it('Listar', async () => {
    const aggregateSpy = jest.spyOn(model, 'aggregate').mockResolvedValueOnce([]);

    const matchArray = [{ $limit: 10 }];

    await repository.listar(matchArray);

    expect(aggregateSpy).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ $match: { status: { $ne: 'Finalizado' } } }),
      expect.objectContaining({ $sort: { sortingValue: 1 } }),
      ...matchArray,
    ]));
  });

});
