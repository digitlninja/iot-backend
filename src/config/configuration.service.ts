import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    return this.configService.get<string>('database.url');
  }
  get databaseUrlNonDocker(): string {
    return this.configService.get<string>('database.nonDockerUrl');
  }
  get appEnv(): string {
    return this.configService.get<string>('app.environment');
  }
  get appUrl(): string {
    return this.configService.get<string>('app.url');
  }
  get uiUrl(): string {
    return this.configService.get<string>('ui.url');
  }
  get cognitoUserPoolId(): string {
    return this.configService.get<string>('cognito.userPoolId');
  }
  get cognitoClientId(): string {
    return this.configService.get<string>('cognito.clientId');
  }
  get cognitoRegion(): string {
    return this.configService.get<string>('cognito.region');
  }
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
}
