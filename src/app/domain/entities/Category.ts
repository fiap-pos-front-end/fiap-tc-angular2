export class Category {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly userId: number
  ) {}

  static create(name: string): Category {
    if (!name) throw new Error('Nome da categoria é obrigatório');

    // TODO: [Clean Arch] Review the best way to generate id or to ignore it
    return new Category(1, name, 1);
  }
}
