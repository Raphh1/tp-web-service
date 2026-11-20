import {
  Body,
  Controller,
  HttpCode,
  Inject,
  type OnModuleInit,
  Post,
} from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import {
  type LoginResponse,
  type User,
  type UserServiceClient,
} from '@recipes/contracts';
import { lastValueFrom } from 'rxjs';

import { USER_CLIENT } from '../common/grpc.js';
import { LoginDto, RegisterDto } from './auth.dto.js';

@Controller()
export class AuthController implements OnModuleInit {
  // Set in onModuleInit, once the gRPC client is ready
  private users!: UserServiceClient;

  constructor(@Inject(USER_CLIENT) private readonly client: ClientGrpc) {}

  @HttpCode(200)
  @Post('auth/login')
  login(@Body() body: LoginDto): Promise<LoginResponse> {
    return lastValueFrom(this.users.login(body));
  }

  onModuleInit() {
    this.users = this.client.getService<UserServiceClient>('UserService');
  }

  @Post('auth/register')
  register(@Body() body: RegisterDto): Promise<User> {
    return lastValueFrom(this.users.register(body));
  }
}
