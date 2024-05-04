import { Inject } from "@nestjs/common";
import { ListarProdutoDto } from "src/core/produto/dto/listar-produto.dto";
import { Produto } from "src/core/produto/entity/produto.entity";
import { IProdutoRepository } from "src/infrastructure/persistence/repositories/produto/Iproduto.repository";
import { IProdutoGateway } from "./Iproduto.gateway";

export class ProdutoGateway implements IProdutoGateway {
  constructor(
    @Inject(IProdutoRepository)
    private produtoRepository: IProdutoRepository
  ) { }

  async listarProduto(payload: ListarProdutoDto): Promise<Produto[]> {
    const arrayMatch = [];

    const { categoria, nome, ids } = payload;

    if (categoria) {
      const categoriaMatch = {
        "$match": { categoria }
      }
      arrayMatch.push(categoriaMatch)
    }

    if (nome) {
      const nomeMatch = {
        "$match": { nome }
      }
      arrayMatch.push(nomeMatch)
    }

    if (ids?.length) {
      const idMatch = {
        $match: {
          "_id": {
            $in: ids.map(id => ({ "$oid": id }))
          }
        }
      }
      arrayMatch.push(idMatch)
    }

    const produtos = await this.produtoRepository.listar(arrayMatch);
    return produtos;
  }
}