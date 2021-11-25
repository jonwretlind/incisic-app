import './AppWindow.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  sidebar: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

function AppWindow()  {
    return (
    <div className="AppWindow">
      <div className={styles.root}>
        <Container>
          <Item xs={12} sm={2} md={2}>
            <Paper className={styles.sidebar}>Sidebar</Paper>
          </Item>

          <Item xs={12} sm={10} md={10}>
            <Paper className={styles.paper}>Main application window</Paper>
          </Item>
        </Container>
      </div>
    </div>
    )
}

export default AppWindow;
