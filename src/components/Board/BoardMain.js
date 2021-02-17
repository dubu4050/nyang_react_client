import React from 'react'
import Container from '@material-ui/core/Container'
import BoardNav from './BoardNav'
import AnimalInfo from '../Board/AnimalInfo'
import FreeBoard from '../Board/FreeBoard'

export default function AnimalInfoMain(props){
    return (
        <Container>
            <BoardNav/>
            {/* <AnimalInfo/> */}
            <FreeBoard/>
        </Container>
    )
}
