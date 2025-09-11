import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { checAlreadykExistsResurs, checkExistsResurs } from 'src/common/types/check.functions.types';
import { ModelsEnumInPrisma } from 'src/common/types/global.types';

@Injectable()
export class PropertiesService {

  constructor(
    private readonly prisma : PrismaService,
    private readonly config : ConfigService
  ){}

  async create(data: CreatePropertyDto) {
    await checAlreadykExistsResurs(this.prisma,ModelsEnumInPrisma.PROPERTIES,"title",data.title)
    await checkExistsResurs(this.prisma,ModelsEnumInPrisma.USERS,"id",data.ownerId)
    await checkExistsResurs(this.prisma,ModelsEnumInPrisma.Category,"id",data.categoryId)
    return {
      message : 'This action adds a new property',
      data : await this.prisma.property.create({data : {...data}})
    };
  }

  async findAll() {
    return {
      message : `This action returns all properties`,
      data : await this.prisma.property.findMany()
    };
  }

  async findOne(id: string) {
    return {
      message : `This action returns a #${id} property`,
      data : await checkExistsResurs(this.prisma,ModelsEnumInPrisma.PROPERTIES,"id",id)
    };
  }

  async update(id: string, data: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  async remove(id: string) {
    return `This action removes a #${id} property`;
  }
}
