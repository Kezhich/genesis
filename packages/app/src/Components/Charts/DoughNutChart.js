import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Doughnut, Bar } from 'react-chartjs-2';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const generateColors = (data) => {
    let colorsArr = []
    for (let val in data) {
        colorsArr.push(getRandomColor())
    }
    return colorsArr
}

const useStyles = makeStyles((theme) => ({
    heading: {
        fontWeight: 600,
        fontSize: '32px',
        marginBottom: '10px',
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
  }));

const DoughNutChart = ({heading, dataBar, dataRound}) => {
    const classes = useStyles();

    const backgroundColorsArrRound = generateColors(dataRound.datasets[0].data)
    const backgroundColorsArrBar = generateColors(dataRound.datasets[0].data)

    dataRound.datasets[0].backgroundColor = backgroundColorsArrRound
    dataBar.datasets[0].backgroundColor = backgroundColorsArrBar
    return (
    <div>
        <div className={classes.heading}>{heading}</div>
        <Doughnut
        data={dataRound}
        />
        <Bar
        data={dataBar} options={{legend: {display: false}}}
        />
    </div>
    )
}

export default DoughNutChart