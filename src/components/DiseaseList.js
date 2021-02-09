import React from 'react'
import dummy from '../db/disease.json';
import { makeStyles, Table, TableBody } from '@material-ui/core'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const useStyles = makeStyles((theme)=>({
      table:{
          marginTop:'50px',
          width:'50%',
          margin:'0 auto',
          borderBottom:'none'
      },
      index:{
          width:'10%',
          height:'55px',
          textAlign:'center',
          borderBottom: 'none'
      },
      circle:{
          width: '45px',
          height:'45px',
          borderRadius:'75px',
          backgroundColor:"rgb(0,0,0,0.25)",
          display:'table-cell',
          textAlign:"center",
          verticalAlign:'middle',
          color:'white',
          fontWeight:'bold',
      },
      name:{
        fontWeight:'600',
        borderBottom:'none',
        height:'20%',
        paddingBottom:0
      },
      explan:{
        fontWeight:'400',
        borderBottom:'none',
        paddingTop:0
      }
  }))

const DiseaseList = () => {
    const classes = useStyles();
    console.log({dummy});
        return(
        <Table className={classes.table}>
            {dummy.disease.map(disease => (
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.index} rowspan="2"><div className={classes.circle}>{disease.id}</div></TableCell>
                        <TableCell className={classes.name}>{disease.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.explan}>{disease.explan}</TableCell>
                    </TableRow>
                </TableBody>
            ))}  
        </Table>
        );
}
export default DiseaseList
