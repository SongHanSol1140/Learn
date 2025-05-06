# Typescript 개요

## 타입스크립트를 사용하는 이유?

0. 정확한 데이터 타입 검사<br>
    자바스크립트의 경우
        10 - '1' = 9; 는 9로 출력됨 (다이나믹 타이핑)<br>
        보통은 장점이지만, 큰 규모의 프로젝트의 경우 이것은 오히려 단점<br>
        Typescript는 Javascript와 다르게 데이터타입을 엄격하게 검사하여 오류를 출력<br>

1. 변수 선언시 타입 등록 가능<br>
    ![image](https://user-images.githubusercontent.com/121269266/225848027-f9f0bcbf-88a1-4b5b-ae81-c87a4e58b291.png)<br>
    타입스크립트는 자바스크립트와 다르게 변수의 데이터 타입을 설정할 수 있음<br>
    설정된 타입과 다른 데이터타입이 들어올 시 오류 출력
    
2. 자세한 오류 반환<br>
    ![image](https://user-images.githubusercontent.com/121269266/225862026-aa8c62ce-4df8-495c-8225-21221e085d30.png)<br>
    string타입으로 설정한 변수에 number값 삽입시 오류메세지 출력 <br>
    
    ![image](https://user-images.githubusercontent.com/121269266/225862449-243f5f84-73fc-40b2-aae5-b5a0494ffeb8.png)<br>
    ![image](https://user-images.githubusercontent.com/121269266/225877040-aba208a2-a15e-4fd4-a16f-831f3201388c.png)<br>
    자바스크립트에 비해 타입스크립트는 상세한 오류 출력함<br>
    

## 설치, 실행방법
1. 터미널 실행

2. 타입스크립트 설치<br>
    ![image](https://user-images.githubusercontent.com/121269266/225835360-8bf13011-aa82-45a9-a47c-a12943a30e41.png)<br>
    npm i -g typescript
    npm i (설치한다)<br>
    -g(전역설치) typescript<br>
    -g를 입력하지 않으면 해당 폴더에서만 타입스크립트가 설치되어 전역사용(모든 폴더에서 사용)이 불가능함<br>
    
3. 시스템 환경변수에 타입스크립트 등록<br>
    제어판 -> 시스템 - 고급 시스템 설정 -> 환경변수<br>
    시스템 변수 -> Path -> 편집 -> 새로만들기<br>
    C:\Users\사용자 이름\AppData\Roaming\npm<br>
    ![image](https://user-images.githubusercontent.com/121269266/225841075-eef90a22-4609-44f5-bfb9-146722311c6a.png)<br>

    
3. tsconfig.json컴파일러 생성 <br>
    ![image](https://user-images.githubusercontent.com/121269266/225836720-1a8d6743-6840-4503-b650-261a43991bfa.png)

4. 타입스크립트 파일 생성<br>
    ![image](https://user-images.githubusercontent.com/121269266/225836284-3ab3d269-99d6-4fae-8075-99870652b6d3.png)<br>
    ~.ts파일  생성후 코딩

5. 타입스크립트 컴파일<br>
    1.
    컴파일 전 폴더 상태<br>
    ![image](https://user-images.githubusercontent.com/121269266/225843685-b6e8698b-50d8-48fd-ab8e-9482fbb08741.png)<br>
    ![image](https://user-images.githubusercontent.com/121269266/225844445-527de20d-d235-41e4-9b9c-c3f4b3dc5d62.png)<br>

    tsc -w 실행<br>
    ![image](https://user-images.githubusercontent.com/121269266/225843915-b088577f-8c43-4d93-8226-ea53d7f1e327.png)<br>
        tsc (타입스크립트를 컴파일함)<br>
        -w (실시간 컴파일, 저장할 때마다 자동으로 컴파일해줌)<br>
        
    컴파일 후 .js파일 자동 생성<br>
    ![image](https://user-images.githubusercontent.com/121269266/225843982-43542797-7cd4-4cf7-8ec3-0f315d7bda17.png)<br>
    ![image](https://user-images.githubusercontent.com/121269266/225844287-e595b25c-8591-447c-8123-16ea9d58a13d.png)<br>



## 오류
     
1. PowerShell 보안오류
    ![image](https://user-images.githubusercontent.com/121269266/225842017-6ef46230-48f4-4bb5-b573-990d7fdccecf.png)<br>
    PowerShell 실행 정책으로 인한 오류<br>
    터미널에 Set-ExecutionPolicy RemoteSigned 실행<br>
    
    ![image](https://user-images.githubusercontent.com/121269266/225842634-02fda6b6-1a42-44e0-b1e2-71368780b7e8.png)    
    <b>Set-ExecutionPolicy RemoteSigned ?</b><br>
    보안 단계를 RemoteSigned로 설정(변경)
    
    RemoteSigned<br>
        직접 작성한 스크립트 파일은 실행가능<br>
        다운로드한 스크립트 파일은 전자 서명을 확인하고 승인해야 실행이 가능한 보안단계
       
        
