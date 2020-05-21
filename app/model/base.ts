import { Client } from "../../deps.ts";
import { config } from "../../config/index.ts";
import { formatDateTime } from "../../extend/tools.ts";
let mainConfig = JSON.parse(await config()).database;
const client = await new Client();
await client.close();
await client.connect({
  db: mainConfig.db,
  hostname: mainConfig.hostname,
  username: mainConfig.username,
  password: mainConfig.password,
  poolSize: mainConfig.poolSize,
  port: mainConfig.port,
});

export default class Base {
  table: string = "";
  constructor(table: string) {
    this.table = table;
  }

  /** 执行SQL返回SQL结果 **/
  async query(sql: string) {
    return await client.query(sql);
  }
  /** 执行SQL返回ExecuteResult */
  async execute(sql: string) {
    return await client.execute(sql);
  }
  /** 事务SQL */
  async transaction(sqls: string[]) {
    return await client.transaction(
      await client.query(sqls.join(";")),
    );
  }
  GetList(): any {
    const sql = "select * from " + this.table + ";";
    console.log(
      "执行查询SQL：" + sql + "            " +
        formatDateTime(new Date()),
    );
    return this.query(sql);
  }
  GetListWhere(where: string): any {
    const sql = "select * from " + this.table + " where 1=1  " + where + ";";
    console.log(
      "执行查询SQL：" + sql + "            " +
        formatDateTime(new Date()),
    );
    return this.query(sql);
  }
  GetListById(id: Number): any {
    const sql = "select * from " + this.table + " WHERE id=" + id + ";";
    console.log(
      "执行查询SQL：" + sql + "            " +
        formatDateTime(new Date()),
    );
    return this.query(sql);
  }
  GetListByIdWhere(id: Number, where: string): any {
    const sql = "select * from " + this.table + " where 1=1  " + where +
      " and id=" + id + ";";
    console.log(
      "执行查询SQL：" + sql + "            " +
        formatDateTime(new Date()),
    );
    return this.query(sql);
  }
  PageList(page: any, pageSize: any): any {
    const sql = "select * from " + this.table +
      ` LIMIT ${(page - 1) * pageSize},${pageSize}`;
    console.log(
      "执行查询SQL：" + sql + "            " +
        formatDateTime(new Date()),
    );
    return this.query(sql);
  }
  async COUNT(where: string) {
    const sql = "select COUNT(*) as total from " + this.table + " where 1=1  " +
      where;
    console.log(
      "执行查询SQL：" + sql + formatDateTime(new Date()),
    );
    let result = await this.query(sql);
    return result[0].total;
  }
  PageWhere(page: any, pageSize: any, where: string): any {
    const sql = "select * from " + this.table + " where 1=1  " + where +
      ` LIMIT ${(page - 1) * pageSize},${pageSize}`;
    console.log(
      "执行查询SQL：" + sql + formatDateTime(new Date()),
    );
    return this.query(sql);
  }
  ADD(fileds: any): any {
    let filed: string = "";
    for (var key in fileds) {
      filed += fileds[key] + ",";
    }
    var reg = /,$/gi;
    filed = filed.replace(reg, "");
    const sql = "INSERT INTO " + this.table + " values( 0," + filed + ");";
    console.log(
      "执行查询SQL：" + sql + "            " +
        formatDateTime(new Date()),
    );
    return this.execute(sql);
  }
  UPDATE(id: Number, fileds: any): any {
    let filed: string = "";
    for (var key in fileds) {
      filed += key + "=" + fileds[key] + ",";
    }
    var reg = /,$/gi;
    filed = filed.replace(reg, "");
    const sql = "UPDATE  " + this.table + " SET " + filed + " WHERE id=" + id +
      ";";
    console.log(
      "执行查询SQL：" + sql + "            " +
        formatDateTime(new Date()),
    );
    return this.execute(sql);
  }
  DEL(id: Number): any {
    const sql = "DELETE FROM " + this.table + "WHERE id=" + id + ";";
    console.log(
      "执行查询SQL：" + sql + "            " +
        formatDateTime(new Date()),
    );
    return this.execute(sql);
  }
  TRANSACTION(sqls: string[]): any {
    console.log(
      "执行事务查询SQL：" + sqls + "            " +
        formatDateTime(new Date()),
    );
    return this.transaction(sqls);
  }
}
