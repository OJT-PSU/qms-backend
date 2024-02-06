import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QueueService } from '../queue/queue.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => QueueService))
    private queueService: QueueService,
  ) {}

  sendUpdateEvent() {
    this.server.emit('new-queue-update');
  }

  @SubscribeMessage('queue-request')
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    // Handle received message
    if (!data) {
      console.log(client);
    }
    const queue = await this.queueService.findAllQueueCustomers();
    this.server.emit('updated-queue', queue); // Broadcast the message to all connected clients
    // console.log(client.disconnected);
  }
}
