import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreatePropertyMediaDto {
  @ApiProperty({
    description: 'Property ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  // Fayllar multer orqali handle bo'ladi, shuning uchun DTO da alohida field kerak emas
  // Lekin agar kerak bo'lsa:
  
  features?: Express.Multer.File[];
  gallery?: Express.Multer.File[];
  attachments?: Express.Multer.File[];
}