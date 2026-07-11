import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Vite + React Deployment Working!</h1>
      <div style={{ margin: '20px' }}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}
