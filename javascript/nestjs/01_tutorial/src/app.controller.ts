import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  getHello(): string {
    console.log("!!!!");
    return this.appService.getHello();
  };

  @Get("helloWorld")
  getHelloWorld(): string {
    console.log("!!!!!!!!!!!!!!");
    return "HelloWWAorld!";
  };
  
  // @Get("Branch/getCategoryByBranch")
  // getByBranchCode(@Query() query: any): string {
  //     console.log(query.branchCode);
  //     return query.branchCode;
  // }


  @Post("Setting/createOption")
  createOption(@Body() body: any): string {
    console.log(body.settingPassword);
    console.log(body.options);
    // 여기서 body.settingPassword와 body.options를 사용하여 필요한 작업을 수행합니다.
    // 예를 들어, 데이터베이스에 옵션을 추가하는 등의 작업을 수행할 수 있습니다.
    // 작업이 완료되면, 적절한 응답을 반환합니다.
    return "Option created successfully";
  }

}
// @Controller('users')
// export class UsersController {
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     // 여기서 `id`는 URL에서 `:id` 부분에 해당하는 경로 파라미터입니다.
//     return `User with ID ${id}`;
//   }
// }
// /users/123 요청을 보내면, findOne 메서드에서 id 파라미터로 123이 넘어옵니다.
// => URL 자체내에서 파라미터를 받아오는 방법
// @Param 데코레이터를 사용하는 경우, 그 경로 파라미터가 포함된 URL 자체가 명확하게 정의되어 있어야 하며,
// 해당 경로로의 요청이 올바르게 처리될 수 있도록 서버 측에서 적절한 라우트 핸들러를 구현해야 합니다.