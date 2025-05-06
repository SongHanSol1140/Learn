// Person.java
package main;
public class Person {
    private Animal animal;

    // 생성자를 통한 의존성 주입
    public Person(Animal animal) {
        this.animal = animal;
    }

    public void makeAnimalCry() {
        animal.cry();
    }
}