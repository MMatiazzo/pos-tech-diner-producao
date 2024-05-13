import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido } from 'src/core/pedido/entity/pedido.entity';
import { ProducaoDocument } from '../../mongoose/schemas/producao/producao.schema';
import { IPedidoRepository } from './Ipedido.repository';

@Injectable()
export class PedidoMongodbMongooseRepository implements IPedidoRepository {
  constructor(
    @InjectModel('producao')
    private producaoModel: Model<ProducaoDocument>
  ) { }

  async cadastrar(pedido: Pedido): Promise<any> {
    return this.producaoModel.create(pedido);
  }

  async listar(matchArray: any[]): Promise<any> {
    const pedidos = await this.producaoModel.aggregate([
      { $match: { status: { $ne: 'Finalizado' } } },
      {
        $addFields: {
          sortingValue: {
            $switch: {
              branches: [
                { case: { $eq: ['$status', 'Pronto'] }, then: 1 },
                { case: { $eq: ['$status', 'Em_Preparacao'] }, then: 2 },
                { case: { $eq: ['$status', 'Recebido'] }, then: 3 },
              ],
              default: 4,
            },
          },
        },
      },
      { $sort: { sortingValue: 1 } },
      ...matchArray,
    ]);
    return pedidos;
  }

  async editar(id: string, field: string, value: string): Promise<any> {
    const pedido = await this.producaoModel.findByIdAndUpdate({ _id: id }, {
      [field]: value,
    });

    return pedido;
  }
}
