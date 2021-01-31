import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import BugIcon from '@material-ui/icons/BugReportOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  header: {
    fontSize: '32px',
    fontWeight: '600'
  }
}));

export default function NestedList({list}) {
  const classes = useStyles();
  const [openIndex, setOpenIndex] = React.useState(null);

  const handleClick = (index) => {
    if (index === openIndex) {
        setOpenIndex(null)
        return
    }
    setOpenIndex(index);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader className={classes.header} component="div" id="nested-list-subheader">
          Последние угрозы
        </ListSubheader>
      }
      className={classes.root}
    >
        {list.map((item, index) => (
        <React.Fragment key={index}>
        <ListItem button onClick={(e) =>handleClick(index)}>
        <ListItemIcon>
          <BugIcon />
        </ListItemIcon>
        <ListItemText primary={`${item.label} ${new Date(item.date).toLocaleString()}`} />
        {openIndex === index ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {Object.entries(item.data).map((entry, index) => (
                <ListItem key={index} button className={classes.nested}>
                <ListItemText primary={`${entry[0]}: ${entry[1]} `} />
                </ListItem>
            ))}
                <ListItem  button className={classes.nested}>
                <ListItemText primary={`Отчет:`} />
                <Link href={item.reportLink}>Ссылка на документ</Link>
                </ListItem>
        </List>
      </Collapse>
      </React.Fragment>
        ))}

    </List>
  );
}