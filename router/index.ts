import { Application, Context } from "../deps.ts";
import MenuController from "../app/controller/menu.ts";
class HeaderContext extends Context {
  constructor(c: Context) {
    c.response.headers.set("Access-Control-Allow-Origin", "*");
    c.response.headers.set(
      "Access-Control-Allow-Methods",
      "POST,PUT,GET,DELETE",
    );
    c.response.headers.set(
      "Access-Control-Allow-Headers",
      "version, access-token, user-token, apiAuth, User-Agent, Keep-Alive, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With",
    );
    c.response.headers.set("Access-Control-Allow-Credentials", "true");
    c.response.headers.set("Content-Type", "application/json");
    super(c);
  }
}
const menu = new MenuController();
export default async () => {
  const app = new Application();
  app.pre((next) =>
    async (c) => {
      return next(new HeaderContext(c));
    }
  );
  app.group("/admin")
    .add("GET", "/menu/index", (res) => {
      return menu.index();
    })
    .add("POcST", "/menu/add", () => {
      return "获取菜单";
    })
    .add("POST", "/menu/edit", () => {
      return "获取菜单";
    })
    .add("POST", "/menu/del", () => {
      return "获取菜单";
    });
  return app;
};
