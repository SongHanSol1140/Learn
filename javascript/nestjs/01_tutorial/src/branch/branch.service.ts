import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class BranchService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
        host: process.env.DB_HOST,  // localhost
        user: process.env.DB_USER, // postgres
        password: process.env.DB_PASSWORD, // nanonix
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT) // 5432 => postgreSQL 기본설정포트
    });
  }

  async getCategoryByBranch(branchCode: string) {
    try {
      const categoryList = await this.pool.query(`
        SELECT
            mc.id, mc.menu_category_name, mc.menu_category_order, majc.major_category_name
        FROM
            menu_category mc
        JOIN
            major_category majc ON mc.parent_major_category_id = majc.id
        JOIN
            branch_category bc ON mc.id = bc.category_id
        JOIN
            branch b ON bc.branch_id = b.id
        WHERE
            b.branch_code = $1
        ORDER BY
            mc.menu_category_order`,
        [branchCode]
      );

      return { status: 200, data: categoryList.rows };
    } catch (error) {
      return { status: 400, error };
    }
  }
}