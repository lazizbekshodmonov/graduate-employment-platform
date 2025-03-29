import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HemisService {
  private http: AxiosInstance;
  constructor(private readonly configService: ConfigService) {
    const baseUrl = this.configService.get<string>(
      'external_system.hemis_base_url',
    );
    this.http = axios.create({
      baseURL: baseUrl,
    });
  }

  getToken(username: string, password: string) {
    return this.http.post(
      'oauth/token',
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          client_id: '',
          client_secret: '',
        },
      },
    );
  }

  getUserInfo(token: string) {
    return this.http.get('/oauth/api/user', {
      params: {
        fields:
          'id,uuid,employee_id_number,type,roles,name,login,email,picture,firstname,surname,patronymic,birth_date,university_id,phone',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
