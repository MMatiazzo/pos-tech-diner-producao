import { Body, Controller, Get, Inject, Patch, Post, Query } from '@nestjs/common';

import { Pedido } from '../../../../core/pedido/entity/pedido.entity';

import { CadastrarPedidoDto } from '../../../../core/pedido/dto/cria-pedido.dto';
import { EditarPedidoDto } from '../../../../core/pedido/dto/editar-pedido.dto';
import { ListarPedidoDto } from '../../../../core/pedido/dto/listar-pedido.dto';
import { CadastrarPedidoController } from '../../../operation/controllers/pedido/cadastrar-pedido/cadastrar-pedido.controller';
import { EditarPedidoStatusController } from '../../../operation/controllers/pedido/editar-pedido-status/editar-pedido-status.controller';
import { ListarPedidoController } from '../../../operation/controllers/pedido/listar-pedido/listar-pedido.controller';

// deploy trigger

@Controller('/producao')
export class PedidoControllerRoute {

  constructor(
    @Inject(ListarPedidoController)
    private listarPedidoController: ListarPedidoController,

    @Inject(EditarPedidoStatusController)
    private editarPedidoStatusController: EditarPedidoStatusController,

    @Inject(CadastrarPedidoController)
    private cadastrarPedidoController: CadastrarPedidoController
  ) { }

  @Post('/cadastrar')
  async cadastrar(
    @Body() payload: CadastrarPedidoDto
  ): Promise<void> {
    await this.cadastrarPedidoController.handle(payload)
  }

  @Get('/listar')
  async listar(
    @Query() payload: ListarPedidoDto
  ): Promise<Pedido[]> {
    return this.listarPedidoController.handle(payload);
  }

  @Patch('/editar-status')
  async editarStatus(
    @Body() payload: EditarPedidoDto
  ): Promise<void> {
    await this.editarPedidoStatusController.handle(payload);
  }
}
