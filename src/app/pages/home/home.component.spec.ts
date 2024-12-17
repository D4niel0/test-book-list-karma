import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs";
import { debug } from "console";

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

const bookServiceMook = {
  getBooks: () => of(listBook),
};

describe("Home component", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        // BookService
        {
          provide: BookService,
          useValue: bookServiceMook,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(BookService); // Asigna el servicio
    // spyOn(service, "getBooks").and.returnValue(of(listBook)); // Se llama al servicio que devuelve una subscripción (of de RxJs)

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("getBook get books from the subscription", () => {
    component.getBooks(); // Se llama a la función

    // expect(service.getBooks).toHaveBeenCalled(); // Comprobar que fué llamada
    expect(component.listBook.length).toBe(3); // Comprobar que la lista de libros es de 3
  });
});
