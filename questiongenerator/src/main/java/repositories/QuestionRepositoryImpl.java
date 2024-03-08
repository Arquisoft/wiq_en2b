package repositories;

import model.Question;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

public class QuestionRepositoryImpl {

    public void save(Question q){

        EntityManagerFactory emf = Jpa.getEntityManagerFactory();

        EntityManager entityManager = emf.createEntityManager();
        entityManager.getTransaction().begin();

        entityManager.persist(q);

        entityManager.getTransaction().commit();
        entityManager.close();

        Jpa.close();
    }

}
