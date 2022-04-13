
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = ['Task', 'Random Thought', 'Idea', 'Quote'];
const notes = ['Shopping list', 'list', "react", "vue"];

const fn = async () => {
  for (let [index, name] of categories.entries()) {
   const cat = await prisma.category.create({data:{name}});
   console.log(notes[index]);
   const note = await prisma.note.create({data:{title:notes[index], categoryId: index+1}})
   console.log(note);
  };
}

fn();


