import React, { useEffect, useState } from "react";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { store } from "../../firebase/FirebaseConfiq";
import "../../assets/style/product.css"


export default function Products() {


    // state of products
    const [products, setProducts] = useState([])

    //get store items from firabase
    const storeRef = collection(store, "store")

    useEffect(() => {
        const queryStore = query(
            storeRef,
            orderBy("id")
        );
        onSnapshot(queryStore, (snapshot) => {
            let productFromFirebase = [];
            snapshot.forEach((doc) => {
                productFromFirebase.push({ ...doc.data() })
            })
            setProducts(productFromFirebase);
        });
    }, [])

    console.log(storeRef);
    return (
        <div className="container storeWrapper"
            style={{
                backgroundColor: "violet"
            }}>
            <h3 className="text-center py-1">STORE</h3>
            <div className="itemWrapper">
                {
                    products.map((product) => (
                        <div 
                        key={product.id}
                        className="items">
                            <div className="item container m-2 p-3">
                                <h2 className="text-center itemTitle">{product.title}</h2>
                                <img className="itemImg" alt="" src={product.image}/>
                                <p className="itemDescription text-center p-1 my-1">{product.description}</p>
                                <h4 className="text-center p-1">{product.price} SEK</h4>
                                <button className="btn btn-outline-dark my-1">Add to cart!</button>
                            </div>
                        </div>

                    ))
                }

            </div>
        </div>
    )
}