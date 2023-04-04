import { TodoStatus } from './TodoStatus';

export interface Todo {
    id: number,
    item: string,
    status: TodoStatus
}