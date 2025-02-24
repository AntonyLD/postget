/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import "./inputvalue.css"
import { useState, useEffect } from "react"

const inputValue = ({fetchData}) => {

    const [product, setProduct] = useState("")
    const [price, setPrice ] = useState("")

    const handleProduct = (e) =>{
        setProduct(e.target.value)
    }

    const handlePrice = (e) =>{

        let value = e.target.value;

        if (/^[0-9.,]*$/.test(value)) {
            value = value.replace(/\./g, ",");
            setPrice(value)
        }
}

    const addProcut = async (e) =>{
        e.preventDefault();
        if (product, price === ""){
            alert("Faltam informações!!!")
            return;
        }
        const productData = {product, price}

    try{
        const response = await fetch('http://localhost:3000/products',
            {
                method: "POST",
                headers:{
                    "Content-type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok){
                throw new Error("Falha ao enviar os dados");
            }

            fetchData()
            
            const data = await response.json();
            console.log("Produto adicionado", data)
            

    } catch (error){
        console.error("Erro", error)
    }

    
}

    return (

        <section id="main-input">
            <form id="form-input" onSubmit={addProcut}>
                <div id="staly-product-price">
                    <div className="format-align">
                        <label htmlFor="product">Produto</label>
                        <input 
                        id="product" type="text" 
                        placeholder="Nome do produto"
                        onChange={handleProduct}
                        />
                    </div>

                    <div className="format-align">
                        <label htmlFor="price">Preço</label>
                        <input 
                        id="price" 
                        type="text"  
                        placeholder="Exemplo: 2,50"
                        onChange={handlePrice}
                        value={price}
                    />
                    </div>
                </div>
                <input id="button-add" type="submit" value="Adicionar"/>
            </form>
        </section>
    )
}

export default inputValue