
export type Produtos = {
  _id: string;
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagens: string[];
};

export type CadastrarPedidoDto = {
  id: string;
  status: string;
  produtos: Produtos[];
  clienteId?: string;
};