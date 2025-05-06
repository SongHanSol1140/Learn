import { Controller, Get } from '@nestjs/common';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
    constructor(private SettingService: SettingService) {}  // 서비스를 생성자를 통해 주입

    @Get()
    getHelloSetting(): string {
        return this.SettingService.getHelloSetting();
    }
    
    @Get("HeeloSetting")
    getHelloSetting2(): string {
        return 'HelloSetting!';
    };
}
