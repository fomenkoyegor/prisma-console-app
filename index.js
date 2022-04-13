const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: " > ",
});

rl.prompt();

const commands = {
  help() {
    console.log("Commands:", Object.keys(commands).join(", "));
  },
  hello() {
    console.log("Hello there!");
  },
  exit() {
    rl.close();
  },
};

rl.on("line", (line) => {
  const command = commands[line.split(" ")[0]];
  const text = line.split(" ")[1];
  if (command) command(text);
  else console.log("Unknown command");
  rl.prompt();
}).on("close", () => {
  console.log("Bye!");
  process.exit(0);
});
