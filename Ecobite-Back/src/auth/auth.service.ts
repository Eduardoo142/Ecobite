import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Tienda } from '../tiendas/entities/tienda.entity'; // Asegúrate de que la entidad Tienda está bien importada
import * as bcrypt from 'bcryptjs'; // Asegúrate de que bcrypt está instalado y configurado

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Tienda) // Repositorio para las tiendas
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async login(email: string, password: string, userType: 'client' | 'store') {
    try {
      let user: Cliente | Tienda;
      let passwordMatches: boolean;

      // Dependiendo del tipo de usuario, buscar en la tabla correspondiente
      if (userType === 'client') {
        user = await this.clienteRepository.findOneBy({ email });
        if (user) {
          // Verificar la contraseña para el cliente
          passwordMatches = await bcrypt.compare(password, user.password);
        }
      } else {
        user = await this.tiendaRepository.findOneBy({ email });
        if (user) {
          // Verificar la contraseña para la tienda (accountPassword)
          passwordMatches = await bcrypt.compare(password, user.accountPassword);
        }
      }

      if (!user || !passwordMatches) {
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      // Generar el token (incluye el tipo de usuario en el payload)
      const payload = { email: user.email, sub: user.id, userType };
      const accessToken = this.jwtService.sign(payload);

      // Devolver el access token, email, id y userType
      return {
        access_token: accessToken,
        email: user.email,
        userType,
        id: user.id, // Aquí se incluye el id de la tienda o del cliente
      };
    } catch (error) {
      console.error('Error durante el proceso de login:', error);
      if (error instanceof UnauthorizedException) {
        throw error; // Pasar el error de autenticación sin cambiar el mensaje
      }
      throw new InternalServerErrorException('Error en el login');
    }
  }
}
