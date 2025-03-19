import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';



@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),  
    UserModule,
    DatabaseModule,
    AuthModule,
    
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
