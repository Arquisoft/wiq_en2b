package repositories;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

public class Jpa {

    private static EntityManagerFactory emf = null;

    public static EntityManagerFactory getEntityManagerFactory() {
        if (emf == null) {
            Map<String, String> properties = new HashMap<>();

            properties.put("javax.persistence.jdbc.driver", "org.postgresql.Driver");
            properties.put("javax.persistence.jdbc.url", System.getenv("DATABASE_URL"));
            properties.put("javax.persistence.jdbc.user", System.getenv("DATABASE_USER"));
            properties.put("javax.persistence.jdbc.password", System.getenv("DATABASE_PASSWORD"));

            properties.put("hibernate.hbm2ddl.auto", "update");

            emf = Persistence.createEntityManagerFactory("default", properties);
        }

        return emf;
    }

    public static void close() {
        if (emf != null) {
            emf.close();
        }
        emf = null;
    }
}
