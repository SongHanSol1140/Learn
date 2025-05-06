import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { title } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  // => 테스트를 실행하기 전에 애플리케이션을 만들어야함
  // => 매 describe마다 초기화 후 새로 시작
  beforeAll(async () => {
    // => beforeAll은 모든 테스트가 실행되기 전에 한번만 실행
    // => 매 describe마다 초기화를 하지않고 이전 테스트의 결과를 이어받아서 사용할 수 있음
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // DTO에 데코레이터가 없는 속성은 제거,(요청은 가지만 데코레이터가 없는데이터는 안받음)
        forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 자체를 막음
        transform: true, // 요청에서 넘어온 자료형을 DTO에서 정의한 자료형으로 변환
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it("POST", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "Test",
          year: 2000,
          genres: ['test'],
        })
        .expect(201); // 201은 생성됨을 의미
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404)
    });
    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404)
    });

  });

  describe('/movies/:id', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    });

    it("PATCH", () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({
          title: "TestTEST",
          year: 20002000,
          genres: ['testTest'],
        })
        .expect(200);
    })

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies/1")
    });
    expect(200);
  });

});
