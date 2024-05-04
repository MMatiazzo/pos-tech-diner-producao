import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception';
import { PedidoModule } from './pedido.module';

@Module({
  imports: [
    PedidoModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ]
})
export class RootModule { }
