import { render, screen, cleanup } from '@testing-library/react';
import Todo from '../todo';
import renderer from 'react-test-renderer';

afterEach(() => {
    cleanup();
});

test('should render un-completed todo component', () => {
    const todos = {id: 1, title: 'wash dishes', completed: false,};
    render(<Todo todo={todos}/>);
    const todoElement = screen.getByTestId(`todo-${todos.id}`);
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent(`${todos.title}`); 
    expect(todoElement).not.toContainHTML('strike'); 
});

test('should render completed todo component', () => {
    const todos = {id: 2, title: 'make dinner', completed: true,};
    render(<Todo todo={todos}/>);
    const todoElement = screen.getByTestId(`todo-${todos.id}`);
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent(`${todos.title}`);
    expect(todoElement).toContainHTML('strike'); 
});


test('matches snapshot', () => {
    const todos = {id: 1, title: 'wash dishes', completed: false,};
    const tree = renderer.create(<Todo todo={todos}/>).toJSON();
    expect(tree).toMatchSnapshot();
    console.log(tree);
});