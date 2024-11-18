import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity'; // Import the entity
import { TiendasModule } from 'src/tiendas/tiendas.module';
@Module({
  imports: 
  [TypeOrmModule.forFeature([Producto]),
  TiendasModule], // Use TypeOrmModule.forFeature instead
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
