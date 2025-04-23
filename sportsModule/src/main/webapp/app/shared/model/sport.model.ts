export interface ISport {
  id?: number;
  title?: string | null;
  description?: string | null;
  author?: string | null;
}

export class Sport implements ISport {
  constructor(
    public id?: number,
    public title?: string | null,
    public description?: string | null,
    public author?: string | null,
  ) {}
}
