import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";

const listBook: Book[] = [
  {
    name: "",
    author: "",
    isbn: "",
    price: 15,
    amount: 2,
  },
  {
    name: "",
    author: "",
    isbn: "",
    price: 20,
    amount: 1,
  },
  {
    name: "",
    author: "",
    isbn: "",
    price: 8,
    amount: 7,
  },
];

const book: Book = {
  name: "",
  author: "",
  isbn: "",
  price: 15,
  amount: 2,
};

describe("BookService", () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  let storage = {}; // Para usarlo como localStorage

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

    storage = {}; // Limpiar el storage entre un test y otro SIEMPRE

    // Con este espia creamos una llamada falsa al localStorage para su getItem, al que se le pasa un key para obtenerlo
    spyOn(localStorage, "getItem").and.callFake((key: string) => {
      return storage[key] || null;
    });

    // Con este espia creamos una llamada falsa al localStorage para su setItem, al que se le pasa un key y un value para agregarlo
    spyOn(localStorage, "setItem").and.callFake(
      (key: string, value: string) => {
        return (storage[key] = value);
      }
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("getBook return a list of book and does a get method", () => {
    // Nos subscribimos al servicio
    service.getBooks().subscribe({
      next: (resp: Book[]) => expect(resp).toEqual(listBook), // Espera la lista de libros
    });

    const req = httpMock.expectOne(`${environment.API_REST_URL}/book`); // Creamos un request de tipo mock

    expect(req.request.method).toBe("GET"); // Esperamos que sea un GET el tipo de método que usa

    req.flush(listBook); // Enviamos una respuesta simulada por el servicio, que recibirá la suscripción
  });

  it("getBooksFromCart return emnpty array when localStorage is empty", () => {
    const listBook = service.getBooksFromCart(); // Esto deberia devolver un array vacío
    expect(listBook.length).toBe(0);
  });

  it("addBookToCart add a book successfully when the list does not exist in the localStorage", () => {
    // Esto es lo que devuelve la funcion dentro del swal, que se llama fire
    const toast = {
      fire: () => null,
    } as any;

    // Creamos el espía del Swal (Es un popup) que está dentro de la función _toastSuccess que se llama al agregar un libro y que devuelve la función fire
    const spy1 = spyOn(Swal, "mixin").and.callFake(() => {
      return toast;
    });

    service.addBookToCart(book); // Añade un libro cuando no había ninguno

    const listBook = service.getBooksFromCart(); // Esto deberia devolver un libro ya que hemos agregado uno

    expect(listBook.length).toBe(1);
    expect(spy1).toHaveBeenCalled();
  });

  it("addBookToCart add a book successfully when the list exist in the localStorage", () => {
    // Esto es lo que devuelve la funcion dentro del swal, que se llama fire
    const toast = {
      fire: () => null,
    } as any;

    // Creamos el espía del Swal (Es un popup) que está dentro de la función _toastSuccess que se llama al agregar un libro y que devuelve la función fire
    const spy1 = spyOn(Swal, "mixin").and.callFake(() => {
      return toast;
    });

    service.addBookToCart(book); // Añade un libro cuando no había ninguno
    let listBook = service.getBooksFromCart(); // Esto debería devolver un libro
    expect(listBook.length).toBe(1);
    expect(listBook[0].amount).toBe(1);

    service.addBookToCart(book); // Añade otro libro cuando ya había uno
    listBook = service.getBooksFromCart(); // Esto debería devolver dos libros en el amount ya que hemos agregado dos
    expect(listBook.length).toBe(1);
    expect(listBook[0].amount).toBe(2);

    expect(spy1).toHaveBeenCalled();
  });

  it("removeBooksFromCart clean books in the localStorage", () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart(); // Esto debería devolver un libro
    expect(listBook.length).toBe(1);

    service.removeBooksFromCart(); // Eliminamos
    listBook = service.getBooksFromCart(); // Esto no debería de devolver libros
    expect(listBook.length).toBe(0);
  });
});
