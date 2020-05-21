import { ink, o } from "./deps.ts";
import server from "./router/index.ts";
import { config } from "./config/index.ts";
const startAllServer = async () => {
  try {
    let mainConfig = JSON.parse(await config()).server;
    mainConfig.forEach(async (main: any) => {
      const http = await server();
      await http.start({ port: main.port, hostname: main.hostname });
      ink.terminal.log(
        "<green><b>servername:" +
          main.desc + main.id +
          "\nip: " +
          main.hostname + "\nport:" + main.port + "</b></green>",
      );
    });
  } catch (err) {
    ink.terminal.log("<green><b>" + JSON.stringify(err) + "</b></green>");
  }
};
startAllServer();
let m = o.say({
  text: "ALL SERVER START",
  cow: "cow",
  eyes: "oo",
  tongue: "U",
  wrap: false,
  wrapLength: 80,
  mode: 2,
  random: true,
});
ink.terminal.log("<green><b>" + m + "</b></green>");
