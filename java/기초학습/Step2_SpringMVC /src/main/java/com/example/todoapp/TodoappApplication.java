// TodoappApplication.java
package com.example.todoapp;

import com.example.model.Task;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoappApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoappApplication.class, args);
		System.out.println("Hello Spring MVC ToDoAPP!!");
		Task asdf = new Task(1, "asdf");
		System.out.println(asdf);
	}

}
