import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BranchService } from './branch.service';

@Controller('Branch')
export class BranchController {
  constructor(private readonly branchModel: BranchService) {}

  @Get('getCategoryByBranch')
  async getCategoryByBranch(@Query('branchCode') branchCode: string, @Res() res: Response) {
    try {
      const answer = await this.branchModel.getCategoryByBranch(branchCode);
      return res.status(HttpStatus.OK).send(answer);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message:"getCategory Error", error});
    }
  }
}