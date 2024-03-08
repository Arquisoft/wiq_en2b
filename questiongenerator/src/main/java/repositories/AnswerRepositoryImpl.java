package repositories;

import model.Answer;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

public class AnswerRepositoryImpl {
    public void save(Answer a){

        Map<String, String> properties = new HashMap<>();
        properties.put("javax.persistence.jdbc.driver", "org.postgresql.Driver");
        properties.put("javax.persistence.jdbc.url", System.getenv("DATABASE_URL"));
        properties.put("javax.persistence.jdbc.user", System.getenv("DATABASE_USER"));
        properties.put("javax.persistence.jdbc.password", System.getenv("DATABASE_PASSWORD"));

        properties.put("hibernate.hbm2ddl.auto", "update");

        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default", properties);

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        entityManager.persist(a);

        entityManager.getTransaction().commit();
        entityManager.close();
        entityManagerFactory.close();
    }
}
