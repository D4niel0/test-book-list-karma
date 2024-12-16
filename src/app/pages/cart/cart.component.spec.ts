import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { BookService } from "src/app/services/book.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";

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

describe("Cart component", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent); // INSTANCIAR
    component = fixture.componentInstance; // INSTANCIAR
    service = fixture.debugElement.injector.get(BookService); // Declarar servicio
    fixture.detectChanges(); // LANZADO POR EL NGONINIT
  });

  it("should create", () => {
    expect(component).toBeTruthy(); // Esperar a que el componente se instancie correctamente
  });

  it("getTotalPrice returns an amount", () => {
    const totalPrice = component.getTotalPrice(listBook); // Guardamos el valor que devuelve
    expect(totalPrice).toBeGreaterThan(0); // Que sea mayor a 0
    expect(totalPrice).not.toBeNull(); // Que no sea null
  });

  // public onInputNumberChange(action: string, book: Book): void {
  //   const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
  //   book.amount = Number(amount);
  //   this.listCartBook = this._bookService.updateAmountBook(book);
  //   this.totalPrice = this.getTotalPrice(this.listCartBook);
  // }

  it("onInputNumberChange increments correctly", () => {
    const action = "plus";
    const book = {
      name: "",
      author: "",
      isbn: "",
      price: 15,
      amount: 2,
    };

    const spy1 = spyOn(service, "updateAmountBook").and.callFake(() => null); // Espiamos la función updateAmountBook del servicio devolviendo una llamada falsa
    const spy2 = spyOn(component, "getTotalPrice").and.callFake(() => null); // Espiamos la función getTotalPrice del componente devolviendo una llamada falsa

    expect(book.amount).toBe(2); // Al inicio el amount de ese libro es 2

    component.onInputNumberChange(action, book); // Llamamos al método

    expect(book.amount).toBe(3); // Al sumar, el amount de ese libro tiene que ser 3

    expect(spy1).toHaveBeenCalled(); // Comprobar que el método se ha llamado correctamente
  });

  it("onInputNumberChange decrements correctly", () => {
    const action = "minus";
    const book = {
      name: "",
      author: "",
      isbn: "",
      price: 15,
      amount: 2,
    };

    const spy1 = spyOn(service, "updateAmountBook").and.callFake(() => null); // Espiamos la función updateAmountBook del servicio devolviendo una llamada falsa
    const spy2 = spyOn(component, "getTotalPrice").and.callFake(() => null); // Espiamos la función getTotalPrice del componente devolviendo una llamada falsa

    expect(book.amount).toBe(2); // Al inicio el amount de ese libro es 2

    component.onInputNumberChange(action, book); // Llamamos al método

    expect(book.amount).toBe(1); // Al sumar, el amount de ese libro tiene que ser 1

    expect(spy1).toHaveBeenCalled(); // Comprobar que el método se ha llamado correctamente
  });
});
