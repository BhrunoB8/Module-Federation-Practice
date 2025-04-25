package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.SportAsserts.*;
import static com.mycompany.myapp.domain.SportTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SportMapperTest {

    private SportMapper sportMapper;

    @BeforeEach
    void setUp() {
        sportMapper = new SportMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getSportSample1();
        var actual = sportMapper.toEntity(sportMapper.toDto(expected));
        assertSportAllPropertiesEquals(expected, actual);
    }
}
