/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import "./inputvalue.css"
import { useState } from "react"

const inputValue = ({fetchData}) => {

    const [product, setProduct] = useState("")
    const [price, setPrice ] = useState("")

    const handleProduct = (e) =>{
        setProduct(e.target.value)
    }

    const handlePrice = (e) => {
        let value = e.target.value;
    
        value = value.replace(/\D/g, "");

        if (value === "") {
            setPrice("");
            return;
        }
    
        let number = parseFloat(value) / 100;
    
        setPrice(number.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));
    };

    const handleBlur = () => {
        if (price === "0,00") {
            setPrice("0,00");
        }
    }

    const addProduct = async (e) =>{
        e.preventDefault();
        if (product === "" || price === ""){
            alert("Faltam informações!!!")
            return;
        }


        const productData = {product, price, amount: "1", totPrice: price}

    try{
        const response = await fetch('http://localhost:3000/products',
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok){
                throw new Error("Falha ao enviar os dados");
            }

            

            const data = await response.json();
            fetchData()

            


    } catch (error){
        console.error("Erro", error)
    }

    setProduct("");
    setPrice ("");
}

    return (

        <section id="main-input">
            <form id="form-input" onSubmit={addProduct}>
                <div id="staly-product-price">
                    <div className="format-align">
                        <label htmlFor="product">PRODUTO</label>
                        <input 
                        id="product" type="text" 
                        placeholder="Nome do produto"
                        autoComplete="off"
                        onChange={handleProduct}
                        value={product}
                        />
                    </div>

                    <div className="format-align">
                        <label htmlFor="price">PREÇO</label>
                        <input 
                        id="price" 
                        type="text"  
                        placeholder="Exemplo: 2,50"
                        autoComplete="off"
                        onChange={handlePrice}
                        onBlur={handleBlur}
                        value={price}
                    />
                    </div>
                </div>
                <input id="button-add" type="submit" value="ADICIONAR"/>
                
            </form>
        </section>
    )
}

export default inputValue