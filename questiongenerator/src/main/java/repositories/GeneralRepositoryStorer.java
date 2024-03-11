package repositories;

import model.Answer;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;

/**
 * Class for storing entries in the Question and Answer DB.
 * They implement the Storable interface.
 */
public class GeneralRepositoryStorer {
    public void save(Storable s){
        EntityManagerFactory emf = Jpa.getEntityManagerFactory();

        EntityManager entityManager = emf.createEntityManager();
        entityManager.getTransaction().begin();

        entityManager.persist(s);

        entityManager.getTransaction().commit();
        entityManager.close();

        Jpa.close();
    }
    public void saveAll(List<Storable> storableList) {
        EntityManagerFactory emf = Jpa.getEntityManagerFactory();

        EntityManager entityManager = emf.createEntityManager();

        for (Storable s : storableList) {
            entityManager.getTransaction().begin();
            entityManager.persist(s);
            entityManager.getTransaction().commit();
        }

        entityManager.close();

        Jpa.close();
    }
}
