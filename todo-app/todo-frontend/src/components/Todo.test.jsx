import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Todo from './Todo';

test('renders "not done" text when todo is incomplete', () => {
    const todo = { text: 'Write a test', done: false }
    render(<Todo todo={todo} onClickDelete={() => { }} onClickComplete={() => { }} />)

    expect(screen.getByText('This todo is not done')).toBeDefined()
})

test('renders "done" text when todo is complete', () => {
    const todo = { text: 'Write a test', done: true }
    render(<Todo todo={todo} onClickDelete={() => { }} onClickComplete={() => { }} />)

    expect(screen.getByText('This todo is done')).toBeDefined()
})

test('clicking "Set as done" calls the onClickComplete handler', () => {
    const todo = { text: 'Test completion', done: false }

    // 1. Create a "Spy" function
    const mockComplete = vi.fn()

    // 2. Render with the spy
    render(
        <Todo
            todo={todo}
            onClickComplete={() => mockComplete} // Todo.jsx uses currying: (todo) => () => ...
            onClickDelete={() => { }}
        />
    )

    // 3. Act: Click the button
    const button = screen.getByText('Set as done')
    fireEvent.click(button)

    // 4. Assert: Check if our spy was "notified"
    expect(mockComplete).toHaveBeenCalledTimes(1)
})

test('clicking "Delete" calls the onClickDelete handler', () => {
    const todo = { text: 'Test delete', done: true }
    const mockDelete = vi.fn()

    render(
        <Todo
            todo={todo}
            onClickComplete={() => { }}
            onClickDelete={() => mockDelete}
        />
    )

    const button = screen.getByText('Delete')
    fireEvent.click(button)

    expect(mockDelete).toHaveBeenCalledTimes(1)
})