import { Module } from '@nestjs/common';
import { BlocklistService } from './blocklist.service';
import { BlocklistController } from './blocklist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blocklist } from './entity/blocklist.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Blocklist]),
  ],
  providers: [BlocklistService],
  controllers: [BlocklistController],
})
export class BlocklistModule {}

