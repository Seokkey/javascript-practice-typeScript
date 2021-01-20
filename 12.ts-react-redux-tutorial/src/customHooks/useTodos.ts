import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export default function useTodos() {
  const todos = useSelector((state: RootState) => state.todos);
  return todos;
}