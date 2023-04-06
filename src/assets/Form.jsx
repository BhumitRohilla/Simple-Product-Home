import React from "react";
import { useState } from "react";


export default function Form(){
    
    const [name,setName] = useState("");
    const [disp,setDisp] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState('');
    const [img, setImg] = useState();

    const [arr,pushArr] = useState([]);
    const [functionChange,changeIt] = useState(-1);
    let functionToCall = (functionChange === -1)?addProduct:updateProduct(functionChange);

    function addProduct(){
        console.log(name,disp,price);
        pushArr([ ...arr,{name,disp,price,quantity,img}]);
        setName("");
        setPrice("");
        setDisp("");
    }

    function addName(ev){
        setName(ev.target.value);
    }

    function addDisp(ev){
        setDisp(ev.target.value);
    }

    function addPrice(ev){
        setPrice(ev.target.value);
    }

    function renameThis(index){
        return ()=>{
            setName(arr[index].name);
            setDisp(arr[index].disp);
            setPrice(arr[index].price);
            changeIt(index);
        }
    }

    function addQuantity(ev){
        setQuantity(ev.target.value);
    }

    function addImg(ev){
        console.log(ev.target.files);
        let url = (URL.createObjectURL(ev.target.files[0]));
        // console.log(ev.target.value);
        setImg( url );
    }

    function updateProduct(index){
        return ()=>{
            let newArr = arr.map((element,i)=>{
                if( i == index ){
                    element.name = name;
                    element.disp = disp;
                    element.price = price;
                }
                return element;
            })
            console.log(newArr);
            pushArr(newArr);
            changeIt(-1);
            setName("");
            setDisp("");
            setPrice("");
        }
    }

    function deleteElement(index){
        return ()=>{
            let newArr = arr.filter((element,i)=>{
                if( index == i ){
                    return false;
                }
                return true;
            })
            pushArr(newArr);
        }
    }


    return(
        <>
            <div className="form">
                <input placeholder = "Product Name" onChange={addName} value = {name} type="text" name="" id="pName" title = "name" />
                <input placeholder = "Product Discription" onChange={addDisp} value = {disp} type="text" name="" id="pDisp" title = "discription" />
                <input placeholder = "Price" onChange={addPrice} value = {price} type="number" name="" id="pPrice" title = "price" />
                <input placeholder = "Quantity" onChange={addQuantity} value={quantity} type="number" />
                <input type="file" name="" id="" onChange={addImg} />  
                <button onClick={functionToCall}>Btn</button>
            </div>
            <div className="product-container">
                {
                    arr.map((element,index)=>{
                        return(
                        <div>
                            <p key={index+"name"}>{element.name}</p>
                            <p key={index+"disp"}>{element.disp}</p>
                            <p key={index+"price"}>{element.price}</p>
                            <p key={index+"quantity"}>{element.quantity}</p>
                            {console.log(element.img)}
                            <p key={index+'img'}><img src={element.img}/></p>
                            <button onClick={renameThis(index)}>Update</button>
                            <button onClick={deleteElement(index)}>Delete</button>
                        </div>
                        )
                    })
                } 
            </div>
        </>
    )
}