export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: Links;
}

export interface Links {
  previous: string;
  current: string;
  next: string;
}
