import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SettingModule } from './setting/setting.module';
import { ProductModule } from './product/product.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [SettingModule, ProductModule, BranchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
