import { Body, Controller, Get, HttpCode, Inject, Patch, Post, Query } from '@nestjs/common';

import { Pedido } from 'src/core/pedido/entity/pedido.entity';

import { EditarPedidoStatusController } from 'src/application/operation/controllers/pedido/editar-pedido-status/editar-pedido-status.controller';
import { ListarPedidoController } from 'src/application/operation/controllers/pedido/listar-pedido/listar-pedido.controller';
import { EditarPedidoDto } from 'src/core/pedido/dto/editar-pedido.dto';
import { ListarPedidoDto } from 'src/core/pedido/dto/listar-pedido.dto';

@Controller('/pedido')
export class PedidoControllerRoute {

  constructor(
    @Inject(ListarPedidoController)
    private listarPedidoController: ListarPedidoController,

    @Inject(EditarPedidoStatusController)
    private editarPedidoStatusController: EditarPedidoStatusController
  ) { }

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
