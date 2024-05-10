import { Produto } from 'src/core/produto/entity/produto.entity';

export type CriaPedidoDto = {
  produtos: Produto[];
};

export type NewPedidoDto = {
  status: string;
  produtos: Produto[];
  clienteId?: string;
};
