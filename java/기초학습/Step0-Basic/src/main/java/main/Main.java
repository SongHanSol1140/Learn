package main;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        /*
         * Java 기본 문법 및 제어 구조
         * 변수와 자료형:
         * 기본 자료형(int, double, boolean, char 등)과 참조형(String, 배열 등)
         */
        int number = 10;
        double pi = 3.14;
        String greeting = "Hello, Java!";
        System.out.println(greeting);
        /*
         * 연산자와 제어문:
         * 산술 연산자, 비교 연산자, 논리 연산자
         * 조건문(if/else, switch)와 반복문(for, while)
         */
        if (number > 5) {
            System.out.println("number는 5보다 큽니다.");
        } else {
            System.out.println("number는 5보다 작거나 같습니다.");
        }

        for (int i = 0; i < 5; i++) {
            System.out.println("반복: " + i);
        }

        /*
         * 의존성 주입(DI)
         * 예제: 동물과 그들의 울음소리
         * 인터페이스 생성: 우리는 동물들이 울 수 있다는 공통적인 특성을 가지고 있음을 알고 있습니다.
         * 그래서 우리는 Animal이라는 인터페이스를 만들고, 그 안에 cry()라는 메서드를 정의합니다.
         */

        /* 실행: 이제 Person 객체를 생성할 때, 그가 어떤 동물과 함께할지를 결정할 수 있습니다. */

        // 외부 클래스 선언
        Animal myDog = new Dog();
        // 강아지의 cry 메서드를 호출합니다.
        myDog.cry(); // "멍멍!" 출력

        Animal myCat = new Cat();
        Person personWithCat = new Person(myCat);
        personWithCat.makeAnimalCry(); // 출력: 야옹!


        // 내부 클래스 선언
        Animal2 myDog2 = new Dog2();
        myDog2.cry();


        Animal2 myCat2 = new Cat2();
        // 내부 클래스 선언
        Person2 personWithCat2 = new Person2(myCat2);
        personWithCat2.makeAnimalCry(); // 출력: 야옹 야옹

        /*
         * Person 클래스는 Animal 인터페이스에 의존하고 있습니다.
         * 이는 Person이 Dog나 Cat과 같은 구체적인 동물 클래스에 직접 의존하지 않는다는 것을 의미합니다.
         * Person 객체를 생성할 때, 생성자를 통해 어떤 동물과 함께할지를 결정합니다. 이것이 바로 의존성 주입의 핵심입니다.
         * 이렇게 인터페이스를 사용하면, 나중에 새로운 동물 클래스(예: Tiger, Lion 등)를 추가하더라도 Person 클래스를 수정할 필요가
         * 없습니다.
         * 단순히 새로운 동물 클래스를 Animal 인터페이스에 맞게 구현하기만 하면 됩니다.
         */
    }
}

// Animal.java
interface Animal2 {
    void cry();
}
// Do
class Dog2 implements Animal2 {
    @Override
    public void cry() {
        System.out.println("멍멍 멍멍");
    }
}
// Cat.java
class Cat2 implements Animal2 {
    @Override
    public void cry() {
        System.out.println("야옹 야옹");
    }
}

class Person2 {
    private Animal2 animal;

    // 생성자를 통한 의존성 주입
    public Person2(Animal2 animal) {
        this.animal = animal;
    }

    public void makeAnimalCry() {
        animal.cry();
    }
}