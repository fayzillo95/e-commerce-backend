import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseInterceptors,
  UploadedFiles 
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PropertyMediaService } from './property-media.service';
import { CreatePropertyMediaDto } from './dto/create-property-media.dto';
import { UpdatePropertyMediaDto } from './dto/update-property-media.dto';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { propertyMediaApiBody } from 'src/common/types/api.body.types';
import { fileStorages } from 'src/common/types/upload_types';
import { Public, UserData } from 'src/global/decorators/auth.decorators';
import { JwtPayload } from 'src/common/config/jwt.secrets';

@Public()
@Controller('property-media')
export class PropertyMediaController {
  constructor(private readonly propertyMediaService: PropertyMediaService) { }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody(propertyMediaApiBody)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'features', maxCount: 10 },
    { name: 'gallery', maxCount: 20 },
    { name: 'attachments', maxCount: 5 }
  ],fileStorages(["image"])))
  create(
    @Body() createPropertyMediaDto: CreatePropertyMediaDto,
    @UploadedFiles() files: { 
      features?: Express.Multer.File[], 
      gallery?: Express.Multer.File[], 
      attachments?: Express.Multer.File[] 
    },
  ) {
    return this.propertyMediaService.create(createPropertyMediaDto, files);
  }

  @Get()
  findAll() {
    return this.propertyMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyMediaService.findOne(id); // String bo'lishi kerak, chunki UUID
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'features', maxCount: 10 },
    { name: 'gallery', maxCount: 20 },
    { name: 'attachments', maxCount: 5 }
  ],fileStorages(["image"])))
  update(
    @Param('id') id: string, 
    @Body() updatePropertyMediaDto: UpdatePropertyMediaDto,
    @UploadedFiles() files?: { 
      features?: Express.Multer.File[], 
      gallery?: Express.Multer.File[], 
      attachments?: Express.Multer.File[] 
    }
  ) {
    return this.propertyMediaService.update(id, updatePropertyMediaDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyMediaService.remove(id);
  }
}