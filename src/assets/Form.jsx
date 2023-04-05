import React from "react";
import { useState } from "react";


export default function Form(){
    
    const [name,setName] = useState("");
    const [disp,setDisp] = useState("");
    const [price,setPrice] = useState("");
    const [arr,pushArr] = useState([]);
    const [functionChange,changeIt] = useState(-1);
    let functionToCall = (functionChange === -1)?addProduct:updateProduct(functionChange);

    function addProduct(){
        console.log(name,disp,price);
        pushArr([ ...arr,{name,disp,price}]);
        setName("");
        setPrice("");
        setDisp("");
    }

    function addName(event){
        setName(event.target.value);
    }

    function addDisp(event){
        setDisp(event.target.value);
    }

    function addPrice(event){
        setPrice(event.target.value);
    }

    function renameThis(index){
        return ()=>{
            setName(arr[index].name);
            setDisp(arr[index].disp);
            setPrice(arr[index].price);
            changeIt(index);
        }
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
                <input onChange={addName} value = {name} type="text" name="" id="pName" title = "name" />
                <input onChange={addDisp} value = {disp} type="text" name="" id="pDisp" title = "discription" />
                <input onChange={addPrice} value = {price} type="number" name="" id="pPrice" title = "price" />
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
                            <button onClick={renameThis(index)}>Rename</button>
                            <button onClick={deleteElement(index)}>Delete</button>
                        </div>
                        )
                    })
                } 
            </div>
        </>
    )
}