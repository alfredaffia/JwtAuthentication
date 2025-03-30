import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
// import { BlocklistService } from './blocklist/blocklist.service';
// import { BlocklistController } from './blocklist/blocklist.controller';
// import { BlocklistModule } from './blocklist/blocklist.module';



@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),  
    UserModule,
    DatabaseModule,
    AuthModule,
    // BlocklistModule,
    
  ],
  controllers: [AuthController, 
    // BlocklistController
  ],
  providers: [AuthService, 
    // BlocklistService
  ],
})
export class AppModule {}
