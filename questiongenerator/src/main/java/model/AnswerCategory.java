package model;

public enum AnswerCategory {
    OTHER(1),
    CAPITAL_CITY(2),
    COUNTRY(3),
    SONG(4),
    STADIUM(5),
    DATE(6),
    PERSON(7),
    EVENT(8);

    private final int value;

    AnswerCategory(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
