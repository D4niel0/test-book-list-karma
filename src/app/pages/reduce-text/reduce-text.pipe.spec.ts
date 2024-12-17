import { ReduceTextPipe } from "./reduce-text.pipe";

describe("ReduceTextPipe", () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe(); // Instanciamos el pipe
  });

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("use transform correctly", () => {
    const text = "Hello this is a test to check the pipe";
    const newText = pipe.transform(text, 5); // Ejecutamos el transform del pipe

    expect(newText.length).toBe(5);
  });
});
