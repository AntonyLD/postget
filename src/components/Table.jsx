/* eslint-disable react/prop-types */
 /* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./table.css";

const Table = ({products, fetchData }) => {
  const [originalPrices, setOriginalPrices] = useState({});
  const [totValue, setTotValue] = useState(0)

  
  /* Armazena os preços originais dos produtos ao carregar a tabela*/
  useEffect(() => {
    setOriginalPrices((prevPrices) =>{
      const newPrices = {...prevPrices};

      products.forEach((item) =>{
      
        if (!newPrices[item.id]){
          newPrices[item.id] = parseFloat(item.price.replace(",", "."))
        }
      });

      return newPrices;

    });

    calculateTotPrice();

  }, [products]);

  const formatCurrency = (value) => {
    return value
      .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      .replace("R$", "")
      .trim();
  };

    /* Atualiza o produto na tabela */
    const addProduct = async (id) => {
      try {
        const currentProduct = products.find((item) => item.id === id);

        const originalPrice = originalPrices[id];
        if (!originalPrice || !currentProduct) {
          console.error("Produto ou preço original não encontrado");
          return;
        }
        
        currentProduct.amount = parseInt(currentProduct.amount, 10);

        const updatedAmount = currentProduct.amount + 1;
        const updatedPrice = originalPrice * updatedAmount;
        console.log(updatedPrice);
        
        const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: updatedAmount.toString(),
            totPrice: updatedPrice.toString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar produto");
        }

        fetchData();
      } catch (error) {
        console.error("Erro ao incluir valor:", error);
      }
    };
    

  /* Diminui a quantidade de item da tabele se ele for maior que 1 ou deleta se for igual a 1 */
  const deleteProduct = async (id) => {
    const currentProduct = products.find((item) => item.id === id);
    if (!currentProduct) {
      return;
    }

    currentProduct.amount = parseInt(currentProduct.amount)
    const updatedAmount = currentProduct.amount - 1;

    const originalPrice = originalPrices[id];
    const currentPrice = parseFloat(currentProduct.totPrice.replace(",", "."));

    if (currentPrice !== originalPrice) {
      const updatedPrice = currentPrice - originalPrice;

      try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            totPrice: updatedPrice.toString(),
            amount: updatedAmount.toString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao atualizar preço");
        }

        fetchData();
      } catch (error) {
        console.error("Erro ao subtrair:", error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao excluir");
        }

        fetchData();
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  /* Calcula o valor total dos produtos da lista */
  const calculateTotPrice = () =>{
    const total = products.reduce((acc, item) =>{
      return acc + parseFloat(item.price.replace(",", ".")) * item.amount;
    }, 0)

    setTotValue(total)

  }

  return (
    <>
    <section id="table">
      {products.length === 0 && <p id="mensagemAddProduto">Adicione algum produto.</p>}
      {products.map((item) => (
        <ul id="list-table" key={item.id}>
          
          <li>
            {item.product} - R$:{" "}
            {formatCurrency(parseFloat(item.totPrice.replace(",", ".")))}
          </li>

          <li id="buttons">
            <button type="button" onClick={() => addProduct(item.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </button>

            <p> {item.amount} </p>

            <button type="button" onClick={() => deleteProduct(item.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M200-440v-80h560v80H200Z" />
              </svg>
            
            </button>
          </li>
        </ul>
        
      ))}
      
    </section>
    <div id="box-tot-price">
      <p id="price-total"> Total R$: {formatCurrency(totValue)}</p>
    </div>
    </>
    
  );
};

export default Table;
