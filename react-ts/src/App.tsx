import { useState } from 'react'
import './App.css'

interface Cliente {
  id: number
  nome: string
}

interface Animal {
  id: number
  nome: string
  tutorId: number
}

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [animais, setAnimais] = useState<Animal[]>([])
  const [nomeCliente, setNomeCliente] = useState('')
  const [nomeAnimal, setNomeAnimal] = useState('')
  const [tutorId, setTutorId] = useState<number | null>(null)

  const cadastrarCliente = () => {
    if (nomeCliente.trim() === '') return
    const novoCliente: Cliente = {
      id: Date.now(),
      nome: nomeCliente,
    }
    setClientes([...clientes, novoCliente])
    setNomeCliente('')
  }

  const cadastrarAnimal = () => {
    if (nomeAnimal.trim() === '' || tutorId === null) return
    const novoAnimal: Animal = {
      id: Date.now(),
      nome: nomeAnimal,
      tutorId,
    }
    setAnimais([...animais, novoAnimal])
    setNomeAnimal('')
    setTutorId(null)
  }

  return (
    <div className="App">
      <h1>Cadastro de Clientes e Animais 🐶🐱</h1>

      <div className="form-section">
        <h2>➕ Cadastrar Cliente</h2>
        <input
          type="text"
          placeholder="Nome do cliente"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
        />
        <button onClick={cadastrarCliente}>Cadastrar Cliente</button>
      </div>

      <div className="form-section">
        <h2>➕ Cadastrar Animal</h2>
        <input
          type="text"
          placeholder="Nome do animal"
          value={nomeAnimal}
          onChange={(e) => setNomeAnimal(e.target.value)}
        />
        <select
          value={tutorId ?? ''}
          onChange={(e) => setTutorId(Number(e.target.value))}
        >
          <option value="">Selecione o tutor</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
        <button onClick={cadastrarAnimal}>Cadastrar Animal</button>
      </div>

      <div className="list-section">
        <h2>📋 Lista de Animais</h2>
        <ul>
          {animais.map((animal) => {
            const tutor = clientes.find((c) => c.id === animal.tutorId)
            return (
              <li key={animal.id}>
                {animal.nome} — Tutor: {tutor ? tutor.nome : 'Desconhecido'}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
