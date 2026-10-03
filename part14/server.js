import express from 'express';

const app = express();
const PORT = 3000;

// Middleware สำหรับแปลง JSON request body
app.use(express.json());

// In-memory data (ฐานข้อมูลจำลอง)
let books = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        year: 2008
    }
];

// GET /books - ดึงข้อมูลหนังสือทั้งหมด
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// GET /books/:id - ดึงข้อมูลหนังสือตาม ID
app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const book = books.find((b) => b.id === id);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: `Book with ID ${id} not found` });
    }
});

// POST /books - สร้างข้อมูลหนังสือใหม่
app.post("/books", (req, res) => {
    const newBook = req.body;

    // ตรวจสอบว่าส่งข้อมูลมาครบหรือไม่
    if (!newBook.title || !newBook.author || !newBook.year) {
        return res.status(400).json({ error: "title, author, and year are required" });
    }

    // สร้าง ID ใหม่
    const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;

    const bookToAdd = {
        id: newId,
        title: newBook.title,
        author: newBook.author,
        year: newBook.year
    };

    books.push(bookToAdd);

    res.status(201).json(bookToAdd);
});

// เริ่มรันเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
