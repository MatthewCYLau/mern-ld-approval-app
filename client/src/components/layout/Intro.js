import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const leverageStyles = makeStyles(theme => ({
    
    main: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    }
   
  }));

const Intro = ({ componentName, componentHeadline, username }) => {
    const classes = leverageStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h4" component="h3" gutterBottom>
        {componentName}
      </Typography>
      {username && <Typography variant="h6" component="h3" gutterBottom>
        {<div><i className="fas fa-user"/> Welcome {username}</div>}
      </Typography>} 
      <Typography >
        {componentHeadline}
      </Typography>
    </div>
  );
};
export default Intro;
