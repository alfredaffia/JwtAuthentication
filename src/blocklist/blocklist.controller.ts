
import { Controller, Post, Body } from '@nestjs/common';
import { BlocklistService } from './blocklist.service';

@Controller('blocklist')
export class BlocklistController {
  constructor(private readonly blocklistService: BlocklistService) {}

  @Post('block')
  async blockUser(@Body('email') email: string) {
    await this.blocklistService.addUserToBlocklist(email);
  }

  @Post('unblock')
  async unblockUser(@Body('email') email: string) {
    await this.blocklistService.removeUserFromBlocklist(email);
  }
}

