import { BikerRegistration } from './biker-registration.entity';
import { BikerRegistrationService } from './biker-registration.service';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BikerRegistrationController } from './biker-registration.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BikerRegistration]),
  ],
  controllers: [BikerRegistrationController],
  providers: [BikerRegistrationService],
})
export class BikerRegistrationModule { }
