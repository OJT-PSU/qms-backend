import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QueueService } from 'src/queue/queue.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private queueService: QueueService) {}

  handleConnection(client: any) {
    // Handle connection event
    console.log(client);
  }

  handleDisconnect(client: any) {
    // Handle disconnection event
    console.log(client);
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
    const queue = await this.queueService.findAllQueueCustomers();
    this.server.emit('updated-queue', queue); // Broadcast the message to all connected clients
    console.log(client.disconnected);
  }
}
