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
});
