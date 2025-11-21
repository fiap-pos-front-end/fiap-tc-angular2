export class Category {
  private constructor(
    public readonly name: string,
    public readonly id?: number,
    public readonly userId?: number
  ) {}

  static create(name: string): Category {
    if (!name) throw new Error('Nome da categoria é obrigatório');

    return new Category(name);
  }
}
