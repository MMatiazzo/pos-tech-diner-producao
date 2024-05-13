import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception';
import { PedidoModule } from './pedido.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';

@Module({
  imports: [
    PedidoModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(env.DATABASE_URL),
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
