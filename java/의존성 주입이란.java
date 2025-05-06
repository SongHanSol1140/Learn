/**
 * 예제: 동물과 그들의 울음소리
 * 인터페이스 생성: 우리는 동물들이 울 수 있다는 공통적인 특성을 가지고 있음을 알고 있습니다.  
 * 그래서 우리는 Animal이라는 인터페이스를 만들고, 그 안에 cry()라는 메서드를 정의합니다. */

public interface Animal {
    void cry();
}


/** 인터페이스 구현: 이제 Dog와 Cat 두 가지 동물 클래스를 만들어 Animal 인터페이스를 구현합니다. */

public class Dog implements Animal {
    @Override
    public void cry() {
        System.out.println("멍멍!");
    }
}

public class Cat implements Animal {
    @Override
    public void cry() {
        System.out.println("야옹!");
    }
}

/** 의존성 주입: Person이라는 클래스를 만들고,
 * 이 클래스는 어떤 동물과 함께하는지를 결정합니다.
 * 여기서 중요한 것은 Person은 특정 동물(Dog 또는 Cat)에 의존하지 않고,
 * Animal 인터페이스에만 의존합니다. */

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

/** 실행: 이제 Person 객체를 생성할 때, 그가 어떤 동물과 함께할지를 결정할 수 있습니다. */

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        Person personWithDog = new Person(myDog);
        personWithDog.makeAnimalCry();  // 출력: 멍멍!

        Animal myCat = new Cat();
        Person personWithCat = new Person(myCat);
        personWithCat.makeAnimalCry();  // 출력: 야옹!
    }
}

/** 설명:
 * Person 클래스는 Animal 인터페이스에 의존하고 있습니다.
 * 이는 Person이 Dog나 Cat과 같은 구체적인 동물 클래스에 직접 의존하지 않는다는 것을 의미합니다.
 * Person 객체를 생성할 때, 생성자를 통해 어떤 동물과 함께할지를 결정합니다. 이것이 바로 의존성 주입의 핵심입니다.
 * 이렇게 인터페이스를 사용하면, 나중에 새로운 동물 클래스(예: Tiger, Lion 등)를 추가하더라도 Person 클래스를 수정할 필요가 없습니다.
 * 단순히 새로운 동물 클래스를 Animal 인터페이스에 맞게 구현하기만 하면 됩니다.
 * 이 예제를 통해 의존성 주입의 기본 개념과 장점을 이해하셨길 바랍니다. */



