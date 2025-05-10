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

export type ExpenseDTO = {
  id?: number;
  name: string;
  amount: number;
  expenseDate: string;
  description?: string;
  categoryId: number;
  expenseListId: number;
};
