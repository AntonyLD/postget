import { useState, useEffect } from 'react';
import './App.css'
import Table from './components/table'
import InputValue from './components/inputValue'


function App() {
  
  const [products, setProducts] = useState([])

    const fetchData = async () => {

        try{
            const response = await fetch("http://localhost:3000/products");
            if (!response.ok) {
                throw new Error("Erro ao buscar dados");
            }

            const data = await response.json();
            setProducts(data);
        } catch (error){
            console.error("Erro ao buscar os itens", error)
        }
    };

    useEffect(() =>{
        fetchData()
    }, [])


  return (
    <main>
      <h1>Lista <span id='de'>de</span> compras</h1>
      <section>
        <Table  products = {products}/>
        <InputValue fetchData = {fetchData}/>
      </section>
    </main>
  )
}

export default App
