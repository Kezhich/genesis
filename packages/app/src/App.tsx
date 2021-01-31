import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import NavBar from './Components/NavBar/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DoughNutChart from './Components/Charts/DoughNutChart'
import ThreatsList from './Components/Lists/ThreatsList'
import TicketsTable from './Components/TicketsTable'
import DataRound from './TestDataRound.json'
import DataBar from './TestDataBar.json'
import Threats from './ThreatsList.json'
import Tickets from './Tickets.json'
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '30px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <NavBar />
      <Container maxWidth="xl">
        <div className={classes.root}> 
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <DoughNutChart dataRound={DataRound} dataBar={DataBar} heading="Статистика угроз" />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}><TicketsTable ticketsData={Tickets.data} /></Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <ThreatsList list={Threats.threats} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default App;
