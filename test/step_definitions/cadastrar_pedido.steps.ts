import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { CadastrarPedidoController } from '../../src/application/operation/controllers/pedido/cadastrar-pedido/cadastrar-pedido.controller';
import { IPedidoGateway } from '../../src/application/operation/gateways/pedido/Ipedido.gateway';
import { CadastrarPedidoDto } from '../../src/core/pedido/dto/cria-pedido.dto';
import { CadastrarPedidoStatusUseCase } from '../../src/core/pedido/usecase/cadastrar-pedido/cadastrar-pedido.usecase';
import { Produto } from '../../src/core/produto/entity/produto.entity';

let cadastrarPedidoStatusUseCase: CadastrarPedidoStatusUseCase;
let cadastrarPedidoController: CadastrarPedidoController;
let pedidoGateway: IPedidoGateway
let payload: CadastrarPedidoDto;
let response: any;
const produtoMock = {
    _id: '01',
    nome: "test",
    categoria: "test",
    preco: 10,
    descricao: "test",
    imagens: [],
} as Produto

Given('A module to create order', () => {

    pedidoGateway = {
        cadastrarPedido: async () => ({ produtos: [produtoMock], status: "test", id: 'newOrder' }),
        editarStatusPedido: async () => ({ produtos: [produtoMock], status: "test" }),
        listarPedido: async () => {
            return [{ produtos: [produtoMock], status: "test" }]
        }
    } as IPedidoGateway
    cadastrarPedidoStatusUseCase = new CadastrarPedidoStatusUseCase(pedidoGateway);
    cadastrarPedidoController = new CadastrarPedidoController(
        cadastrarPedidoStatusUseCase,
    );
});

When('Call to cadastrarPedidoController', async () => {
    payload = {
        id: "1",
        produtos: [produtoMock],
        status: 'test',
    } as CadastrarPedidoDto;

    response = await cadastrarPedidoController.handle(payload);
});

Then('The response should be the new order', async () => {
    assert.equal(response.id, 'newOrder');
});
