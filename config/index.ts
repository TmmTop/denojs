export async function config() {
  return Deno.readTextFileSync("config/config.json");
}
