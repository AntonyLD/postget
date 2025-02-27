/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import "./table.css"

const table = ({products, fetchData}) => {

    const deleteProduct = async (id) =>{
        try{
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            fetchData();

        }catch(error) {
            console.error("Erro ao excluir:", error)
        }
    }

    return (
        <section id="table">
            {products.map((item) =>(
                <ul id="list-table" key={item.id}>
                    <li>{item.product} - R$: {item.price}</li>
                    <li><button 
                    type="submit"
                    onClick={() => deleteProduct(item.id)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" height="26px"  viewBox="0 -960 960 960" width="26px" fill="#e8eaed">
                    <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
                    </svg>
                    </button></li>
                </ul>
            ))}
        </section>
    )
}

export default table