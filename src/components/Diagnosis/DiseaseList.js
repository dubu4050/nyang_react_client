import React from 'react'
import dummy from '../../db/disease.json';
import { Card, makeStyles, Table, TableBody, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const useStyles = makeStyles((theme)=>({
      table:{
          width:'50%',
          margin:'0 auto',
          borderBottom:'none',
      },
      index:{
          width:'10%',
          height:'55px',
          textAlign:'center',
          borderBottom: 'none'
      },
      circle:{
          width: '45px',
          height:'30px',
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
      },
      root: {
        width:'70%',
        margin:'0 auto',
        minWidth: 275,
        marginTop: '50px',
        borderRadius: '20px'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
  }))

const DiseaseList = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    console.log({dummy});
        return(
        <div>
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
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                 </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                 </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                 </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>
        </div>

        );
}
export default DiseaseList
