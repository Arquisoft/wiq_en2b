package templates;

public class QGHelper {
    public final static String LINKCONCAT = "%& #";

    public static boolean isEntityName(String label){
        boolean isEntityName = true; // Check if it is like Q232334
        if (label.startsWith("Q") ){
            for (int i=1; i<label.length(); i++){
                if (!Character.isDigit(label.charAt(i))){
                    isEntityName = false;
                }
            }
            if (isEntityName){
                return true;
            }
        }
        return false;
    }
}
