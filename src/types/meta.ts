export interface Links {
  previous: string;
  current: string;
  next: string;
}

export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: Links;
}

export interface Meta {
  pagination: Pagination;
}
