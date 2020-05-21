import base from "../controller/base.ts";
import MenuModel from "../model/menu.ts";
const menu = new MenuModel("admin_menu");
export default class MenuController extends base {
  async index() {
    const total = await menu.COUNT("");
    const list = await menu.PageList(1, 20);
    if (list.length > 0) {
      return { code: 200, list: list, total: total };
    } else {
      return { code: 500, msg: "数据为空！" };
    }
  }
  add() {
  }
  edit() {
  }
  del() {
  }
}
