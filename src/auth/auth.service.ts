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

  async validateUser(email: string, password: string, role: string) {
    let user;
    if (role === 'client') {
      user = await this.prisma.client.findUnique({ where: { email } });
    } else if (role === 'business') {
      user = await this.prisma.business.findUnique({ where: { email } });
    } else if (role === 'worker') {
      user = await this.prisma.worker.findUnique({ where: { email } });
    } else {
      throw new UnauthorizedException('Invalid role');
    }
  
    if (!user) {
      throw new UnauthorizedException(`${role} not found`);
    }
  
    const isValid = await verify(user.password, password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return user;
  }

  async generateToken(userId: string, role: string) {
    // Implement your token generation logic here
    const client = await this.prisma.client.findUnique({
      where: { id: userId },
    });
    if (!client) {
      throw new UnauthorizedException('Client not found');
    }
    // Generate a token (e.g., JWT) and return it
    const payload: AuthJwtPayload = { sub: userId, role };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async loginClient(client: Client) {
    const { accessToken, refreshToken } = await this.generateToken(client.id, "client");
    return {
      id: client.id,
      email: client.email,
      fullname: client.fullName,
      phone: client.phone,
      avatar: client.avatar,
      accessToken,
      refreshToken,  // Now included in the response
    };
  }

  async loginBusiness(business: Business) {
    const { accessToken, refreshToken } = await this.generateToken(business.id, "business");
    return {
      id: business.id,
      email: business.email,
      fullname: business.name,
      phone: business.phone,
      avatar: business.avatar,
      coverImage: business.coverImage,
      accessToken,
      refreshToken,  // Now included in the response
    };
  }

  async validateCurrentAccountJwt(id : string, role : string){
    const userAccount = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!userAccount) {
      const userAccountBusiness = await this.prisma.business.findUnique({
        where: { id },
      });
      if (!userAccountBusiness) {
        throw new UnauthorizedException('Acount not found');
      }
    // Return the client object or any relevant data
      const currentAccount = {id : userAccountBusiness.id, role}
      return currentAccount;
    }
    const currentAccount = {id : userAccount.id, role}
    return currentAccount;
  }
}
