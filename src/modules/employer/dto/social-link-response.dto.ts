import { ISocialLinkResponseDto } from '../types/dto.type';
import { SocialTypeEnum } from '../employer.enum';
import { ISocialLinkEntity } from '../types/entity.type';

export class SocialLinkResponseDto implements ISocialLinkResponseDto {
  id: number;
  type: SocialTypeEnum;
  link: string;
  constructor(socialLink: ISocialLinkEntity) {
    this.id = socialLink.id;
    this.type = socialLink.type;
    this.link = socialLink.link;
  }
}
