const express = require('express')
const app = express()
const PORT = 3000

// ✅ Middleware to parse JSON body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



let books=[]



// POST request- Add a new book

app.post("/books",(req,res)=>{
    let newBook={
        id: books.length + 1,
        author: req.body.author,
        title: req.body.title
    };
    books.push(newBook);
    res.status(201).json(newBook); 
})

app.get("/books",(req,res)=>{
    res.send(books);
})

app.put("/books/:id",(req,res)=>{
    const bookId=parseInt(req.params.id);
    const book=books.find(b=>b.id === bookId);

    if(!book){
        return res.status(404).json({error:"Book not found!"})
    }

    // Update the book details 

    book.author=req.body.author||book.author;
    book.title=req.body.title||book.title;

    res.json(book)


})

app.delete("/books/:id",(req,res)=>{
    const bookId=parseInt(req.params.id);
    const index=books.findIndex(b=>b.id === bookId);

    if(index == -1){
        return res.status(404).json({error:"Book not found!"})
    }

    books.splice(index,1)

    res.json({message:`Book with ${bookId} is deleted successfully`})
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});