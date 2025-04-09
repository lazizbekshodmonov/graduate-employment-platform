import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { hemis_config } from './hemis.config';
import { IHemisTokenResponse, IHemisUserResponseDto } from './hemis.type';
import { HemisTokenDto, HemisUserResponseDto } from './hemis.dto';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class HemisService {
  private http: AxiosInstance;
  private baseUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private logger: CustomLoggerService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'external_systems.hemis_base_url',
    );
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async getAccessToken(
    code: string,
    redirect_uri: string,
  ): Promise<IHemisTokenResponse> {
    try {
      const formData = new FormData();
      formData.append('code', code);
      formData.append('redirect_uri', redirect_uri);
      formData.append('client_id', hemis_config.HEMIS_CLIENT_ID);
      formData.append('client_secret', hemis_config.HEMIS_CLIENT_SECRET);
      formData.append('grant_type', 'authorization_code');

      const hemisTokenResponse = await this.http.post<IHemisTokenResponse>(
        '/oauth/access-token',

        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return new HemisTokenDto(hemisTokenResponse);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getUserInfo(token: string) {
    const userResponse = await this.http.get<IHemisUserResponseDto>(
      '/oauth/api/user',
      {
        params: {
          fields:
            'id,uuid,employee_id_number,type,roles,name,login,email,picture,firstname,surname,patronymic,birth_date,university_id,phone',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return new HemisUserResponseDto(userResponse);
  }
}
