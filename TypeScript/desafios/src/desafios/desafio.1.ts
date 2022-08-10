/* Como podemos rodar isso em um arquivo .ts sem causar erros?

let employee = {};
employee.code = 10;
employee.name = "John";
*/

export class Employee {
  private code;
  private name;

  public constructor(code: number, name: string) {
    this.code = code;
    this.name = name;
  }

  get Name(): string {
    return this.name;
  }

  get Code(): number {
    return this.code;
  }
}

let employee = new Employee(10, "John");
