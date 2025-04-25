package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Sport;
import com.mycompany.myapp.service.dto.SportDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Sport} and its DTO {@link SportDTO}.
 */
@Mapper(componentModel = "spring")
public interface SportMapper extends EntityMapper<SportDTO, Sport> {}
