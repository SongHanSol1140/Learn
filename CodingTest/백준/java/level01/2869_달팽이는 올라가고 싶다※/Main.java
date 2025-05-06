// 문제
// 땅 위에 달팽이가 있다. 이 달팽이는 높이가 V미터인 나무 막대를 올라갈 것이다.

// 달팽이는 낮에 A미터 올라갈 수 있다. 하지만, 밤에 잠을 자는 동안 B미터 미끄러진다. 또, 정상에 올라간 후에는 미끄러지지 않는다.

// 달팽이가 나무 막대를 모두 올라가려면, 며칠이 걸리는지 구하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 세 정수 A, B, V가 공백으로 구분되어서 주어진다. (1 ≤ B < A ≤ V ≤ 1,000,000,000)

// 출력
// 첫째 줄에 달팽이가 나무 막대를 모두 올라가는데 며칠이 걸리는지 출력한다

// 예제 입력 1 
// 2 1 5
// 예제 출력 1 
// 4
// 예제 입력 2 
// 5 1 6
// 예제 출력 2 
// 2
// 예제 입력 3 
// 100 99 1000000000
// 예제 출력 3 
// 999999901

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader bj = new BufferedReader(new InputStreamReader(System.in));
        String[] input = bj.readLine().split(" ");

        int up = Integer.parseInt(input[0]);
        int down = Integer.parseInt(input[1]);
        int distance = Integer.parseInt(input[2]);

        int days = (distance - up) / (up - down) + 1;
        if ((distance - up) % (up - down) != 0) {
            days++;
        }
        System.out.println(days);
    }
}


/*
    매일 달팽이는 
    A 미터 올라갑니다.
    하지만, 달팽이가 도착한 날을 제외하면, 매일 밤에 
    B 미터 내려갑니다.
    따라서 실질적으로 달팽이가 하루에 올라가는 거리는 
    A−B 미터입니다.
    하지만, 마지막 날은 다르게 처리됩니다. 달팽이가 정상에 도달하면 더 이상 내려오지 않기 때문에, 마지막 날에는 
    �
    A 미터 올라갑니다.
    이를 토대로, 달팽이가 마지막 날 전까지 얼마나 많이 올라가야 하는지 계산하면 
    V−A 미터입니다. (마지막 날의 A 미터를 제외한 나머지 거리)

    그럼, V−A 미터를 A−B 미터씩 올라가는 데 며칠이 걸리는지 계산하면 됩니다. 이때, 남은 거리가
    A−B로 나누어 떨어지지 않으면 추가로 하루가 필요합니다.
    (예를 들어 5미터를 2미터씩 올라가려면 3일이 필요합니다.)

    마지막으로, 달팽이가 정상에 도착하는 날을 추가하면 전체 걸리는 시간을 알 수 있습니다.
*/