import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthJwtPayload } from './types/auth-jwtpayload';
import { ClientEntity } from 'src/client/entities/client.entity';
import { Business, Client } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateClient(email: string, password: string) {
    // Implement your authentication logic here
    const client = await this.prisma.client.findUnique({
      where: { email },
    });
    if (!client) {
      throw new UnauthorizedException('Client not found');
    }
    const isValid = await verify(client.password, password); // Replace with actual password verification logic
    
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return client; // Return the client object or any relevant data
  }

  async validateBusiness(email: string, password: string) {
    // Implement your business authentication logic here
    const business = await this.prisma.business.findUnique({
      where: { email },
    });
    if (!business) {
      throw new UnauthorizedException('Business not found');
    }
    const isValid = await verify(business.password, password); // Replace with actual password verification logic
    if (!isValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return business; // Return the business object or any relevant data
  }

  async generateToken(clientId: string) {
    // Implement your token generation logic here
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });
    if (!client) {
      throw new UnauthorizedException('Client not found');
    }
    // Generate a token (e.g., JWT) and return it
    const payload : AuthJwtPayload = { sub: client.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  async loginClient(client: Client){
    const {accessToken} = await this.generateToken(client.id);
    return {
      id: client.id,
      email: client.email,
      fullname: client.fullName,
      phone: client.phone,
      avatar: client.avatar,
      accessToken,
    };
  }

  async loginBusiness(business: Business){
    const {accessToken} = await this.generateToken(business.id);
    return {
      id: business.id,
      email: business.email,
      fullname: business.name,
      phone: business.phone,
      avatar: business.avatar,
      coverImage: business.coverImage,
      accessToken,
    }
  }
}
