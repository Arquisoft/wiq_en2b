package repositories;

import model.Answer;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

public class AnswerRepositoryImpl {
    public void save(Answer a){
        EntityManagerFactory emf = Jpa.getEntityManagerFactory();

        EntityManager entityManager = emf.createEntityManager();
        entityManager.getTransaction().begin();

        entityManager.persist(a);

        entityManager.getTransaction().commit();
        entityManager.close();

        Jpa.close();
    }
}
