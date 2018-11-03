
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}) ;

class ListPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    fetch("/api/list").then(res => res.json()).then(res => {
      this.setState({ items: res.docs });
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>User Agent</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.items.map((item) => (
                <TableRow>
                  <TableCell>{item.userAgent}</TableCell>
                  <TableCell>{item.created}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


export default withStyles(styles)(ListPage);