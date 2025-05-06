import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingService {
    getHelloSetting(): string {
        return 'Hello Setting!';
    }
}
