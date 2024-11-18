import { IsNotEmpty, IsString } from "class-validator";
import { Tienda } from "src/tiendas/entities/tienda.entity";

export class CreateProductoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    precio: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsString()
    store: Tienda;

    @IsNotEmpty()
    @IsString()
    foto: string;
}

