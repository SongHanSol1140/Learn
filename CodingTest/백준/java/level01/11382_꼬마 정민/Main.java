//꼬마 정민
//        시간 제한	메모리 제한	제출	    정답	    맞힌사람	정답 비율
//        1 초	    512 MB	    122123	50442	46440	42.107%
//        문제
//        꼬마 정민이는 이제 A + B 정도는 쉽게 계산할 수 있다. 이제 A + B + C를 계산할 차례이다!
//
//        입력
//        첫 번째 줄에 A, B, C (1 ≤ A, B, C ≤ 1012)이 공백을 사이에 두고 주어진다.
//
//        출력
//        A+B+C의 값을 출력한다.
//
//        예제 입력 1
//        77 77 7777
//        예제 출력 1
//        7931

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader bj = new BufferedReader(new InputStreamReader(System.in));
        String[] A = bj.readLine().split(" ");
        Long AA = 0L;
        for(int i = 0; i < A.length; i++){
            AA += Long.parseLong(A[i]);
        }
        System.out.println(AA);
    }
}

// 문제의 범위를 고려하면, long 자료형을 사용해야 합니다.
// 그렇지 않으면 큰 숫자에 대한 연산에서 오버플로우가 발생할 수 있습니다.