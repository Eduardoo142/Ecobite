import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { TiendasModule } from './tiendas/tiendas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from './tiendas/entities/tienda.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Producto } from './productos/entities/producto.entity';
import { ProductosModule } from './productos/productos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el ConfigModule esté disponible globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Eduardo2003@',
      database: 'Foodie',
      entities: [Tienda, Cliente, Producto],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TiendasModule,
    ClientesModule,
    ProductosModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
