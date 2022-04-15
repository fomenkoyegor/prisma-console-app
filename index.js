const readline = require("readline");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const log = (data) => console.log(JSON.stringify(data, null, 2));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: " > ",
});

rl.prompt();

const commands = {
  help() {
    log("Commands:", Object.keys(commands).join(", "));
  },
  async categories() {
    const categories = await prisma.category.findMany({
      include: { notes: true },
    });
    log(categories);
  },
  async notes() {
    const notes = await prisma.note.findMany({
      include: { category: true },
    });
    log(notes);
  },
  async note(id) {
    if (!id) log("Entered id");
    if (!Number.isInteger(+id)) {
      log("id mast be a number");
      return;
    }
    const note = await prisma.note.findFirst({ where: { id: +id } });
    if (!note) {
      log("not found note");
    } else log(note);
  },
  async create(title = "") {
    if (!title.trim()) {
      log("title mast be not empty");
      return;
    }
    const categories = await prisma.category.findMany();
    const ids = categories.map((c) => c.id);
    const randomCategoryId = ids[Math.floor(Math.random() * ids.length)];
    const note = await prisma.note.create({
      data: {
        title,
        categoryId: randomCategoryId,
      },
    });
    log(note);
  },
  hello() {
    log("Hello there!");
  },
  exit() {
    rl.close();
  },
};

rl.on("line", (line) => {
  const command = commands[line.split(" ")[0]];
  const text = line.split(" ")[1];
  if (command) command(text);
  else log("Unknown command");
  rl.prompt();
}).on("close", () => {
  log("Bye!");
  process.exit(0);
});
