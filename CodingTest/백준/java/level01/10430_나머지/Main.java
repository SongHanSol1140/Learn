// 문제
// (A+B)%C는 ((A%C) + (B%C))%C 와 같을까?

// (A×B)%C는 ((A%C) × (B%C))%C 와 같을까?

// 세 수 A, B, C가 주어졌을 때, 위의 네 가지 값을 구하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 A, B, C가 순서대로 주어진다. (2 ≤ A, B, C ≤ 10000)

// 출력
// 첫째 줄에 (A+B)%C, 둘째 줄에 ((A%C) + (B%C))%C, 셋째 줄에 (A×B)%C, 넷째 줄에 ((A%C) × (B%C))%C를 출력한다.

// 예제 입력 1 
// 5 8 4
// 예제 출력 1 
// 1
// 1
// 0
// 0 

import java.io.FileInputStream;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("../input.txt"));
        BufferedReader backjunProblem = new BufferedReader(new InputStreamReader(System.in));
        // 방법 1

        String[] strInput = backjunProblem.readLine().split(" ");
        int[] intInput = new int[strInput.length];

        for(int i = 0; i < strInput.length; i++){
            intInput1[i] = Integer.parseInt(strInput[i]);
        }

        System.out.println("==============================================");
        // 방법 2
        int[] intInput = Stream.of(backjunProblem.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        

        // 풀이
        int A = intInput2[0];
        int B = intInput2[1];
        int C = intInput2[2];
        System.out.println((A+B)%C);
        System.out.println(((A%C) + (B%C))%C);
        System.out.println((A*B)%C);
        System.out.println(((A%C) * (B%C))%C);


    }

}