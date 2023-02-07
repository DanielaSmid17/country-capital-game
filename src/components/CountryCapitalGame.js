import React, {useState, useEffect, useMemo} from "react";
import { africanCountries, europeanCountries, oceaniaCountries, americanCountries, asianCountries } from "../data/countries";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography } from "@mui/material";
import {Grid} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import WinnerAlert from "./WinnerAlert";

export default function CountryCapitalGame() {
    const [buttons, setButtons] = useState([])
    const [buttonsSelected, setButtonsSelected] = useState([])
    const { search: searchParam } = useLocation();
    const history = useNavigate()
    const continentChosen = useMemo(() => new URLSearchParams(searchParam).get('continent'), [searchParam]);
    
    
    const dataSet = () => {
        switch(continentChosen){
            case "Africa":
                return africanCountries;
                case "Europe":
                    return europeanCountries;
                    case "Oceania": 
                    return oceaniaCountries;
                    case "America": 
                    return americanCountries;
                    case "Asia": 
                return asianCountries;
            default: 
            break; 
        }
    }
    
    const data = useMemo(() => dataSet(), [continentChosen]);
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

    const goBack = () => {
        history('/')
    }

    const shuffle = () => {
        const buttonsCopy = [...buttons];
        const shuffledArray = buttonsCopy.sort((a, b) => 0.5 - Math.random());
        setButtons(shuffledArray)
    }



    
    return (
    <div style={{marginTop: "40px"}}>
        {buttons.length === 0 ?
            <WinnerAlert /> :
        <React.Fragment>
        <Typography sx={{fontFamily: 'Pacifico', fontSize: '25px'}}>Let's crack this {continentChosen} map!</Typography>
        <Grid item container alignItems='center' sx={{marginLeft: '40px'}}>
            <Typography sx={{fontFamily: 'Poppins', fontSize: '18px'}}>{buttons.length / 2} {buttons.length === 2 ? 'country' : 'countries'} to go! </Typography>
            <Button onClick={shuffle} sx={{marginLeft: '45px', padding: '10px', borderRadius: '3px', border: '1px solid #000000', textTransform: 'none', height: '40px', color: '#000000', backgroundColor: "#fff", fontFamily: 'Poppins', fontWeight: 600}}><ShuffleOutlinedIcon />Shuffle</Button>
        </Grid>
        <Grid item container justifyContent='center' sx={{padding: '20px'}}>
        {buttons?.map((button, i) => (
            <Button key={i} onClick={()=> handleSelect(i)} sx={{padding: '10px', borderRadius: '3px', border: `1px solid ${button.not_guessed || button.selected ? '#fff' : '#048ABF'}`, textTransform: 'none', height: '40px', margin: '5px', color: button.not_guessed || button.selected ? '#fff' : '#048ABF', "&:hover": {backgroundColor: button.not_guessed ? "#E23636" : button.selected ? "#4A90E4" : "#fff"},  backgroundColor: button.not_guessed ? "#E23636" : button.selected ? "#4A90E4" : "#fff", fontFamily: 'Poppins', fontWeight: 600}}>{button.legend}</Button>
            ))}
        </Grid>
        </React.Fragment>
        }
        <Grid item container>
            <Button onClick={goBack} sx={{marginLeft: '45px', padding: '10px', borderRadius: '3px', border: '1px solid #000000', textTransform: 'none', height: '40px', color: '#000000', backgroundColor: "#fff", fontFamily: 'Poppins', fontWeight: 600}}><ArrowBackIcon />Go Back</Button>
        </Grid>
    {/* {buttons.length === 0 && 
    } */}
    </div>);
}

