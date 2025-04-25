package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.SportTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SportTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sport.class);
        Sport sport1 = getSportSample1();
        Sport sport2 = new Sport();
        assertThat(sport1).isNotEqualTo(sport2);

        sport2.setId(sport1.getId());
        assertThat(sport1).isEqualTo(sport2);

        sport2 = getSportSample2();
        assertThat(sport1).isNotEqualTo(sport2);
    }
}
