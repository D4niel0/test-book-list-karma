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
    spyOn(service, "getBooksFromCart").and.callFake(() => listBook); // Evitar que se ejecute la llamada de la función del servicio que hay en el onInit devolviendo nosotros el resultado
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

    const spy1 = spyOn(service, "updateAmountBook").and.callFake(() => null); // Espiamos la función updateAmountBook del servicio y hacemos una llamada devolviéndola falsa
    const spy2 = spyOn(component, "getTotalPrice").and.callFake(() => null); // Espiamos la función getTotalPrice del componente y hacemos una llamada devolviéndola falsa

    expect(book.amount).toBe(2); // Al inicio el amount de ese libro es 2

    component.onInputNumberChange(action, book); // Llamamos al método

    expect(book.amount).toBe(1); // Al sumar, el amount de ese libro tiene que ser 1

    expect(spy1).toHaveBeenCalled(); // Comprobar que el método se ha llamado correctamente
  });

  it("onClearBooks works correctly", () => {
    const spy1 = spyOn(
      component as any,
      "_clearListCartBook"
    ).and.callThrough(); // Espiamos y llamamos al método
    const spy2 = spyOn(service, "removeBooksFromCart").and.callFake(() => null); // Dentro del método privado se llama al servicio, por lo que debemos devolver una fallamada en null que sea falsa

    component.listCartBook = listBook;
    component.onClearBooks();
    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  // TEST A MÉTODO PRIVADO DIRECTAMENTE, NO ES CORRECTO, HACERLO DEL PÚBLICO AL PRIVADO
  // it("_clearListCartBook works correctly", () => {
  //   const spy1 = spyOn(service, "removeBooksFromCart").and.callFake(() => null); // Dentro del método privado se llama al servicio, por lo que debemos devolver una fallamada en null que sea falsa
  //   component["_clearListCartBook"](); // Llama a la función privada

  //   expect(component.listCartBook.length).toBe(0);
  //   expect(spy1).toHaveBeenCalled();
  // });
});
