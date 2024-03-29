import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './queue/queue.module';
import { ConfigModule } from '@nestjs/config';
import { DisplayModule } from './display/display.module';
import { TerminalModule } from './terminal/terminal.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    QueueModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    DisplayModule,
    TerminalModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
