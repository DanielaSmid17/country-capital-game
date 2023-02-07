import React from 'react'
import africa from '../components/Icons/africa.png'
import america from '../components/Icons/america.png'
import asia from '../components/Icons/asia.png'
import australia from '../components/Icons/australia.png'
import europe from '../components/Icons/europe.png'
import { Continent } from './Continent'
import {Grid, Typography} from '@mui/material'

const continents = [
    {name: "Europe", icon: europe}, 
    {name: "America", icon: america}, 
    {name: "Africa", icon: africa}, 
    {name: "Oceania", icon: australia}, 
    {name: "Asia", icon: asia}, 
]

export const ChooseContinent = () => {
  return (
    <Grid container justifyContent='center' sx={{padding: '10px', marginTop: '40px'}}>
        <Grid item>
            <Typography sx={{fontFamily: "Poppins", fontWeight: 600, fontSize: '30px', color: '#048ABF'}}>Choose your Game</Typography>
        </Grid>
        <Grid item container justifyContent='center' sx={{marginTop: "10px"}}>
            {continents.map(continent=> (
            <Continent key={continent.name} continent={continent} />
            ))}
        </Grid>
    </Grid>
  )
}

export default ChooseContinent;
