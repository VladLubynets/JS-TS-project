import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';


test('renders Expense Tracker App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Expense Tracker App/i);
  expect(headerElement).toBeInTheDocument();
});


test('displays initial balance of $0.00', () => {
  render(<App />);
  const balanceElement = screen.getByText('$0.00');
  expect(balanceElement).toBeInTheDocument();
});


test('displays Income and Expense sections', () => {
  render(<App />);
  expect(screen.getByText('Income')).toBeInTheDocument();
  expect(screen.getByText('Expense')).toBeInTheDocument();
});


test('displays Add Transaction form with required fields', () => {
  render(<App />);
  expect(screen.getByText('Add New Transaction')).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Transaction Amount/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Add Transaction/i })).toBeInTheDocument();
});


test('displays Transaction History section', () => {
  render(<App />);
  expect(screen.getByText('Transaction History')).toBeInTheDocument();
});


test('adds a new income transaction', async () => {
  render(<App />);
  
  const descriptionInput = screen.getByLabelText(/Description/i);
  const amountInput = screen.getByLabelText(/Transaction Amount/i);
  const addButton = screen.getByRole('button', { name: /Add Transaction/i });


  await userEvent.type(descriptionInput, 'Salary');
  await userEvent.type(amountInput, '1000');
  

  fireEvent.click(addButton);


  await waitFor(() => {
    expect(screen.getByText('Salary')).toBeInTheDocument();
  });


  expect(screen.getByText('$1000.00')).toBeInTheDocument();
});


test('adds a new expense transaction', async () => {
  render(<App />);
  
  const descriptionInput = screen.getByLabelText(/Description/i);
  const amountInput = screen.getByLabelText(/Transaction Amount/i);
  const addButton = screen.getByRole('button', { name: /Add Transaction/i });


  await userEvent.type(descriptionInput, 'Groceries');
  await userEvent.type(amountInput, '-50');
  
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });


  expect(screen.getByText('$-50.00')).toBeInTheDocument();
});


test('deletes a transaction', async () => {
  render(<App />);
  
  const descriptionInput = screen.getByLabelText(/Description/i);
  const amountInput = screen.getByLabelText(/Transaction Amount/i);
  const addButton = screen.getByRole('button', { name: /Add Transaction/i });


  await userEvent.type(descriptionInput, 'Test Transaction');
  await userEvent.type(amountInput, '100');
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(screen.getByText('Test Transaction')).toBeInTheDocument();
  });


  const deleteButton = screen.getByRole('button', { name: /X/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText('Test Transaction')).not.toBeInTheDocument();
  });


  expect(screen.getByText('$0.00')).toBeInTheDocument();
});

test('calculates Income and Expense correctly', async () => {
  render(<App />);
  
  const descriptionInput = screen.getByLabelText(/Description/i);
  const amountInput = screen.getByLabelText(/Transaction Amount/i);
  const addButton = screen.getByRole('button', { name: /Add Transaction/i });

  await userEvent.type(descriptionInput, 'Salary');
  await userEvent.type(amountInput, '500');
  fireEvent.click(addButton);

  await userEvent.clear(descriptionInput);
  await userEvent.clear(amountInput);

  await userEvent.type(descriptionInput, 'Shopping');
  await userEvent.type(amountInput, '-100');
  fireEvent.click(addButton);

  await waitFor(() => {
    const incomeElement = screen.getByText('500.00');
    const expenseElement = screen.getByText('100.00');
    expect(incomeElement).toBeInTheDocument();
    expect(expenseElement).toBeInTheDocument();
  });

  expect(screen.getByText('$400.00')).toBeInTheDocument();
});

test('form inputs have correct placeholders', () => {
  render(<App />);
  
  const descriptionInput = screen.getByPlaceholderText('Detail of Transaction');
  const amountInput = screen.getByPlaceholderText('Dollar Value of Transaction');
  
  expect(descriptionInput).toBeInTheDocument();
  expect(amountInput).toBeInTheDocument();
});
