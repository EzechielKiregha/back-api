import { Injectable } from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class ClientService {

  constructor(private prisma : PrismaService) {}

  async create(createClientInput: CreateClientInput) {
    const { password, ...client} = createClientInput;
    const hashedpwd = await hash(password);

    return await this.prisma.client.create({
      data: {
        password: hashedpwd,
        ...client,
      },
    });
  }

  async findAll() {
    return await this.prisma.client.findMany({
      include: {
        orders: {
          where: {
            payment: {
              status: 'COMPLETED',
            },
          },
        },
        recharges: true,
        chats: true,
      },
    });
  }
}
