package repositories;


import model.AnswerCategory;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import java.util.List;

/**
 * Class for storing entries in the Question and Answer DB.
 * They implement the Storable interface.
 */
public class GeneralRepositoryStorer {

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

    public static boolean doesntExist(AnswerCategory category) {
        EntityManagerFactory emf = Jpa.getEntityManagerFactory();
        EntityManager entityManager = emf.createEntityManager();

        Query query = entityManager.createQuery("SELECT COUNT(a) FROM Answer a WHERE a.category = :category");
        query.setParameter("category", category);
        Long count = (Long) query.getSingleResult();

        entityManager.close();
        Jpa.close();

        return count == 0;
    }

    public static void editConstraints() {
        EntityManagerFactory emf = Jpa.getEntityManagerFactory();
        EntityManager entityManager = emf.createEntityManager();

        entityManager.getTransaction().begin();


        // Drop constraint "answers_category_check" from table "answers" if exists
        entityManager.createNativeQuery("ALTER TABLE answers DROP CONSTRAINT IF EXISTS answers_category_check").executeUpdate();
        // Drop constraint "questions_question_category_check" from table "questions" if exists
        entityManager.createNativeQuery("ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_question_category_check").executeUpdate();


        entityManager.getTransaction().commit();

        entityManager.close();
        Jpa.close();
    }


}
