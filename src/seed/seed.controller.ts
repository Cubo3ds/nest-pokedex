import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SeedService } from './seed.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

 

  @Get()
  executeSeed() {
    return this.seedService.executeSeed();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File){
    return this.seedService.executeSeed_(file);
  }
  
}
