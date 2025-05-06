import java.io.FileInputStream;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("../input.txt"));
        BufferedReader backjunProblem = new BufferedReader(new InputStreamReader(System.in));
        String[] input = backjunProblem.readLine().split(" ");

        System.out.println(Integer.parseInt(input[0]) + Integer.parseInt(input[1]));

    }
}

// VS코드에서 사용하려고 찾앗지만 자꾸 오류가나서 사용안하기로함