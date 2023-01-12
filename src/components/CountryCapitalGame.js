import React, {useState, useEffect} from "react";
import data from '../data/countries.json'

export default function CountryCapitalGame() {
    const [buttons, setButtons] = useState([])
    const [buttonsSelected, setButtonsSelected] = useState([])

    useEffect(()=> {
        createButtons()
    }, [])


    useEffect(()=> {
        if(buttonsSelected.length === 2)
            checkIfMatch()
    }, [buttonsSelected])

    const checkIfMatch = () => {
        const buttonCopy = [...buttons];
        const index1 = buttonCopy.indexOf(buttonsSelected[0])
        const index2 = buttonCopy.indexOf(buttonsSelected[1])
        if (buttonsSelected[0].type === buttonsSelected[1].type){
            handleNotGuessed(index1, index2);
            return;
        }
        const country = buttonsSelected.find(obj => obj.type === "Country");
        let capital = buttonsSelected.find(obj => obj.type === "Capital");
        let filtered = [];
        if (data[country.legend] === capital.legend) {
            filtered = buttons.filter(button => !(button === country || button === capital));
            setTimeout(()=> {setButtons(filtered)}, 500)
        } else {
            handleNotGuessed(index1, index2);
        }
    }

    const handleNotGuessed = (index1, index2) => {
        const buttonsCopy = [...buttons];
        buttonsCopy[index1].not_guessed = true
        buttonsCopy[index2].not_guessed = true
        setButtons(buttonsCopy)
        setTimeout(() => {
            buttonsCopy[index1].not_guessed = false;
            buttonsCopy[index1].selected = false;
            buttonsCopy[index2].not_guessed = false; 
            buttonsCopy[index2].selected = false; 
        }, 1000)
        setButtons(buttonsCopy)
        setButtonsSelected([])
    }

    const createButtons = () => {
        const buttons = [];
        for (const [country, capital] of Object.entries(data)){
            buttons.push({legend: country, selected: false, not_guessed: false, type: "Country"});
            buttons.push({legend: capital, selected: false, not_guessed: false, type: "Capital"});
        }
        buttons.sort(() => Math.random() - 0.5);
        setButtons(buttons)
    }

    const handleSelect = (i) => {
        const buttonsCopy = [...buttons];
        buttonsCopy[i].selected = !buttonsCopy[i].selected
        setButtons(buttonsCopy)
        const selected = buttonsCopy.filter(button => button.selected);
        setButtonsSelected(selected)
    }

    
    return <div>
    {buttons?.map((button, i) => (
        <button key={i} onClick={()=> handleSelect(i)} style={{height: '40px', margin: '5px', backgroundColor: button.not_guessed ? "#FD0503" : button.selected ? "#0000ff" : "#fff"}}>{button.legend}</button>
    ))}
    </div>;
}

