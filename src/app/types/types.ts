export type UserAuthDTO = UserDTO & {
  token: string;
};

export type UserDTO = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  currency: string;
};

export type UserRequestDTO = UserDTO & {
  password: string;
};

export type ExpenseListDTO = {
  id: number;
  name: string;
  budget: number;
  month: number;
  totalExpense: number;
  expenses: ExpenseDTO[];
};

export type ExpenseListExtended = ExpenseListDTO & {
  isEditing: boolean;
};

export type ExpenseDTO = {
  id?: number;
  name: string;
  amount: number;
  expenseDate: string;
  description?: string;
  categoryName: string;
  expenseListId: number;
};

export type ExpenseExtended = ExpenseDTO & {
  isEditing: boolean;
};

export type CategoryDTO = {
  id: number;
  name: string;
  color: string;
  isDefault: number;
  expenses: ExpenseDTO[];
};

// Interfacec//////

export interface PagedDataDTO<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

