import { IBaseEntity } from '../../../common/interfaces/base.interface';
import { SocialTypeEnum } from '../employer.enum';
import { IFileEntity } from '../../file/file.interface';
import { IUserEntity } from '../../users/types/entity.type';
import { StatusEnum } from '../../../common/enums/status.enum';

export interface IEmployerEntity extends IBaseEntity {
  company_name: string;
  description?: string;
  industry?: string;
  address?: string;
  phone?: string;
  email?: string;
  business_type?: string;
  established_date?: Date;
  contact_person_name?: string;
  contact_person?: string;
  contact_position?: string;
  number_of_employees?: number;
  country?: string;
  city?: string;
  zip_code?: string;
  social_links?: ISocialLinkEntity[];
  status?: StatusEnum;
  file?: IFileEntity;
  user: IUserEntity;
}
export interface ISocialLinkEntity extends IBaseEntity {
  type: SocialTypeEnum;
  link: string;
  employer: IEmployerEntity;
}
