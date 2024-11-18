import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tienda } from 'src/tiendas/entities/tienda.entity';


@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const { nombre, precio, description, store } = createProductoDto;

    const tienda = await this.tiendaRepository.findOne({where: { id: createProductoDto.store.id }}); // Buscamos la tienda usando el ID que viene en el DTO
    if (!tienda) {
      throw new Error('Tienda no encontrada');
    }

    const producto = this.productoRepository.create({
      ...createProductoDto,
      store: tienda,
    });

    return this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }
  findOne(id: number): Promise<Producto> {
    return this.productoRepository.findOne({
      where: { id },
    });
  }
  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productoRepository.preload({
      id: id,
      ...updateProductoDto,
    });
    if (!producto) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<Producto> {
    const producto = await this.findOne(id);
    return this.productoRepository.remove(producto);
  }

  async findByTienda(tiendaId: string): Promise<Producto[]> {
    return this.productoRepository.find({ where: { store: { id: Number(tiendaId) } }, relations: ['store'] });
  }
}
