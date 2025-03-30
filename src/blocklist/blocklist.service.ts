import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blocklist } from './entity/blocklist.entity';

@Injectable()
export class BlocklistService {
  constructor(
    @InjectRepository(Blocklist)
    private readonly blocklistRepository: Repository<Blocklist>,
  ) {}

  async addUserToBlocklist(email: string) {
    const blocklistEntry = this.blocklistRepository.create({ email });
    await this.blocklistRepository.save(blocklistEntry);
  }

  async removeUserFromBlocklist(email: string) {
    await this.blocklistRepository.delete({ email });
  }

  async isUserBlocked(email: string) {
    const blocklistEntry = await this.blocklistRepository.findOne({ where: { email: email } })
    return blocklistEntry !== undefined;
}
}