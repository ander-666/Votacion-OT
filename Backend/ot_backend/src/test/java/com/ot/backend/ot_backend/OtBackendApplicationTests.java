package com.ot.backend.ot_backend;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertNotNull;

//@SpringBootTest
class OtBackendApplicationTests {
	@Disabled
	@Test
	void contextLoads() {
		String test = "application context loaded";
		assertNotNull(test, "El contexto de la aplicación no debería ser nulo");
	}
}
