export default abstract class AbstractController<T, U = undefined> {
  constructor(repository: U) {
    this.repository = repository;
  }

  protected accessor repository: U;

  async execute(_data: unknown, ..._params: unknown[]): Promise<T> {
    return new Promise((resolve) => {
      resolve(undefined as T);
    });
  }
}
