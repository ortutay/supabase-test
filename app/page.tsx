import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: todos, error } = await supabase
    .from('todos')
    .select('id, name')
    .order('id')

  if (error) {
    throw new Error('Unable to load todos.')
  }

  return (
    <main>
      <h1>Todos</h1>
      {todos?.length ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      ) : (
        <p>No todos yet.</p>
      )}
    </main>
  )
}
