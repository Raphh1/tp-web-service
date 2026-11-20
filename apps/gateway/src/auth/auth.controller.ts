import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  type OnModuleInit,
  Post,
  Req,
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
import { type AuthenticatedRequest } from './auth.guard.js';
import { Public } from './public.decorator.js';

@Controller()
export class AuthController implements OnModuleInit {
  // Set in onModuleInit, once the gRPC client is ready
  private users!: UserServiceClient;

  constructor(@Inject(USER_CLIENT) private readonly client: ClientGrpc) {}

  @HttpCode(200)
  @Post('auth/login')
  @Public()
  login(@Body() body: LoginDto): Promise<LoginResponse> {
    return lastValueFrom(this.users.login(body));
  }

  /** Read from the token itself: no call to the user service */
  @Get('me')
  me(@Req() request: AuthenticatedRequest): User {
    return request.user;
  }

  onModuleInit() {
    this.users = this.client.getService<UserServiceClient>('UserService');
  }

  @Post('auth/register')
  @Public()
  register(@Body() body: RegisterDto): Promise<User> {
    return lastValueFrom(this.users.register(body));
  }
}
