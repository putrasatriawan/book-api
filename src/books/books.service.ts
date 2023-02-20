import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  private books: any[] = [];

  getAllBooks(): any[] {
    return this.books;
  }

  getBook(id: string) {
    const bookIdx = this.findBookByID(id);
    return this.books[bookIdx];
  }
  createBook(title: string, author: string, category: string) {
    this.books.push({
      id: uuidv4(),
      title,
      author,
      category,
    });
  }
  findBookByID(id: string) {
    const booksIdx = this.books.findIndex((book) => book.id === id);
    //mencari book dengan id
    if (booksIdx === -1) {
      //jika book id ga ada nampilin error ini
      throw new NotFoundException(`Book With Id ${id} Is Not Found`);
    }
    //kalo benar ngambil book idx nya
    return booksIdx;
  }
  updateBook(id: string, title: string, author: string, category: string) {
    //mengambil book id dari variable bookIdx
    const booksIdx = this.findBookByID(id);
    this.books[booksIdx].title = title;
    this.books[booksIdx].author = author;
    this.books[booksIdx].category = category;
  }
}
