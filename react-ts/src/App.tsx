import { useState } from 'react'
import './App.css'
import fundoFofo from './imgs/colagem-de-animal-de-estimacao-bonito-isolada.jpg';

interface Cliente {
  id: number
  nome: string
  endereco: string
}

type TipoAnimal = 'cachorro' | 'gato' | 'peixe'

interface Animal {
  id: number
  nome: string
  tipo: TipoAnimal
  peso: number
  idade: number
  tutorId: number
}

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [animais, setAnimais] = useState<Animal[]>([])

  const [nomeCliente, setNomeCliente] = useState('')
  const [enderecoCliente, setEnderecoCliente] = useState('')

  const [nomeAnimal, setNomeAnimal] = useState('')
  const [tipoAnimal, setTipoAnimal] = useState<TipoAnimal>('cachorro')
  const [pesoAnimal, setPesoAnimal] = useState<number>(0)
  const [idadeAnimal, setIdadeAnimal] = useState<number>(0)
  const [tutorId, setTutorId] = useState<number | null>(null)

  const [showClienteModal, setShowClienteModal] = useState(false)
  const [showAnimalModal, setShowAnimalModal] = useState(false)

  const cadastrarCliente = () => {
    if (nomeCliente.trim() === '' || enderecoCliente.trim() === '') return
    const novoCliente: Cliente = {
      id: Date.now(),
      nome: nomeCliente,
      endereco: enderecoCliente,
    }
    setClientes([...clientes, novoCliente])
    setNomeCliente('')
    setEnderecoCliente('')
    setShowClienteModal(false)
  }

  const cadastrarAnimal = () => {
    if (
      nomeAnimal.trim() === '' ||
      tutorId === null ||
      pesoAnimal <= 0 ||
      idadeAnimal <= 0
    )
      return

    const novoAnimal: Animal = {
      id: Date.now(),
      nome: nomeAnimal,
      tipo: tipoAnimal,
      peso: pesoAnimal,
      idade: idadeAnimal,
      tutorId,
    }
    setAnimais([...animais, novoAnimal])
    setNomeAnimal('')
    setTipoAnimal('cachorro')
    setPesoAnimal(0)
    setIdadeAnimal(0)
    setTutorId(null)
    setShowAnimalModal(false)
  }

  const getRecomendacao = (animal: Animal): string => {
    switch (animal.tipo) {
      case 'cachorro':
        return 'Recomendação: banho a cada 15 dias 🛁'
      case 'gato':
        return 'Recomendação: tosa a cada 30 dias ✂️'
      case 'peixe':
        return `Recomendação: limpeza semanal do aquário 🧼 | Tamanho ideal: ${animal.peso * 2} litros 🐠`
      default:
        return ''
    }
  }

  return (
    <div className="App"
    style={{
      backgroundImage: `url(${fundoFofo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1>🐾 Gerenciador de Clientes e Animais</h1>

      <div className="button-group">
        <button onClick={() => setShowClienteModal(true)}>➕ Novo Cliente</button>
        <button onClick={() => setShowAnimalModal(true)}>➕ Novo Animal</button>
      </div>

      {/* Modal Cliente */}
      {showClienteModal && (
        <div className="modal-overlay" onClick={() => setShowClienteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Cadastro de Cliente</h2>

            <label>Nome do cliente</label>
            <input
              type="text"
              placeholder="Ex: João Silva"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
            />

            <label>Endereço do cliente</label>
            <input
              type="text"
              placeholder="Ex: Rua das Flores, 123"
              value={enderecoCliente}
              onChange={(e) => setEnderecoCliente(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={cadastrarCliente}>Salvar</button>
              <button onClick={() => setShowClienteModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Animal */}
      {showAnimalModal && (
        <div className="modal-overlay" onClick={() => setShowAnimalModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Cadastro de Animal</h2>

            <label>Nome do animal</label>
            <input
              type="text"
              placeholder="Ex: Rex"
              value={nomeAnimal}
              onChange={(e) => setNomeAnimal(e.target.value)}
            />

            <label>Tipo de animal</label>
            <select
              value={tipoAnimal}
              onChange={(e) => setTipoAnimal(e.target.value as TipoAnimal)}
            >
              <option value="">Selecione o tipo</option>
              <option value="cachorro">Cachorro 🐶</option>
              <option value="gato">Gato 🐱</option>
              <option value="peixe">Peixe 🐟</option>
            </select>

            <label>Peso do animal (kg)</label>
            <input
              type="number"
              value={pesoAnimal}
              onChange={(e) => setPesoAnimal(Number(e.target.value))}
            />

            <label>Idade do animal (meses)</label>
            <input
              type="number"
              value={idadeAnimal}
              onChange={(e) => setIdadeAnimal(Number(e.target.value))}
            />

            <label>Tutor do animal</label>
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

            <div className="modal-buttons">
              <button onClick={cadastrarAnimal}>Salvar</button>
              <button onClick={() => setShowAnimalModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="list-section">
        <h2>📋 Lista de Animais</h2>
        <ul>
          {animais.map((animal) => {
            const tutor = clientes.find((c) => c.id === animal.tutorId)
            return (
              <li key={animal.id}>
                <strong>{animal.nome}</strong> ({animal.tipo}) — Peso: {animal.peso}kg, Idade: {animal.idade} meses<br />
                Tutor: {tutor ? tutor.nome : 'Desconhecido'} — Endereço: {tutor?.endereco}<br />
                <em>{getRecomendacao(animal)}</em>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
