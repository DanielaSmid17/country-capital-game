import { Typography, Grid } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

export const Continent = ({continent}) => {
    const history = useNavigate();
    
    const Card = styled.div`
    border-radius: 5px;
    border: .5px solid #012326;
    margin: 0 1em;
    padding: 0.25em 1em;
    cursor: pointer;
    height: 200px;
    width: 200px;
    `

    const goToGame = (continent) => {
        history(`/game?continent=${continent}`);
    }

 

  return (
    <Card onClick={()=>goToGame(continent.name)}>
        <Grid item>
            <Typography sx={{fontFamily: 'Pacifico', color: '#049DBF', margin: "10px 0"}}>{continent.name}</Typography>
        </Grid>
        <Grid item>
            <img src={continent.icon} alt="icon" height='150px' />
        </Grid>

    </Card>
  )
}
