package repositories;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

/**
 * Class in charge of setting the connection to the DB
 * It is an implementation of Singleton DP until the connection gets shut down though close() call.
 * As it is not possible to reopen connections, a new one must be created if access to DB is desired.
 */
public class Jpa {

    // Singleton
    private static EntityManagerFactory emf = null;

    /**
     * Sets the enviroment variables for the DB connection.
     */
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

    /**
     * Closes the current connection in a null-preventive way.
     */
    public static void close() {
        if (emf != null) {
            emf.close();
        }
        emf = null;
    }
}
