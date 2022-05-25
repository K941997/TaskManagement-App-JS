/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { FileProducerService } from './fileQueues/file.producer.service';
import { MessageProducerService } from './messageQueues/message.producer.service';

@Controller() //localhost:3000/api/
export class AppController {
  constructor(
    private readonly appService: AppService,
    private messageProducerService: MessageProducerService,
    private fileProducerService: FileProducerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('send-message') //!MessageProducerService Queues Bull
  async sendMessage(@Query('msg') msg: string) {
    this.messageProducerService.sendMessage(msg);
    return `${msg} AppController`;
  }

  @Delete('delete-file-name') //!FileProducerService Queues Bull
  async deleteFileName(@Query('fileName') fileName: string) {
    await this.fileProducerService.deleteFileName(fileName);
    return `${fileName} was deleted AppController`;
  }
}
