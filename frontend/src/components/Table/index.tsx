import { TableHTMLAttributes, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Table extends TableHTMLAttributes<HTMLTableCaptionElement> {
    product: Product[];
}

interface Product {
    _id: string
    name: string;
    type: string;
    price: number;
}

export function Table(props: Table) {
    const [products, setProducts] = useState<Product[]>([])


    useEffect(() => {
        setProducts(props.product);
    }, [props])

    async function handleDelete(product: Product) {
        const index = products.findIndex(p => p._id == product._id)
        const productsUpdate = products.filter((product, i) => i !== index)
        setProducts(productsUpdate);

        await api.delete('products/' + product._id)
    }

    return (
        <Container>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Preço</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product: Product) => <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.type}</td>
                    <td>Kg {product.price}</td>
                    <td><button onClick={() => handleDelete(product)}>X</button> <Link to={`/editar/${product._id}`}><button>...</button></Link></td>
                </tr>)}
            </tbody>
        </Container>
    )
}