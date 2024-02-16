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
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => QueueService))
    private queueService: QueueService,
  ) {}

  handleConnection(client: any) {
    // Handle connection event
    console.log('hello client');
  }

  handleDisconnect(client: any) {
    // Handle disconnection event
    // Handle disconnection event
    console.log('bye client');
  }

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

  @SubscribeMessage('ping-request')
  async handlePing(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('ping-event', data);
  }
}
