package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SportTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Sport getSportSample1() {
        return new Sport().id(1L).title("title1").description("description1").author("author1");
    }

    public static Sport getSportSample2() {
        return new Sport().id(2L).title("title2").description("description2").author("author2");
    }

    public static Sport getSportRandomSampleGenerator() {
        return new Sport()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .author(UUID.randomUUID().toString());
    }
}
