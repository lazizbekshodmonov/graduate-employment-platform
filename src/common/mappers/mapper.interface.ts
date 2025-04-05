export interface IMapper<Entity, CreateDto, UpdateDto, ResponseDto> {
  toResponseDto(entity: Entity): ResponseDto;
  toEntityFromCreate(dto: CreateDto): Promise<Entity> | Entity;
  toEntityFromUpdate(
    dto: UpdateDto,
  ): Promise<Partial<Entity>> | Partial<Entity>;
}
