import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function PizzaCategory() {
  const classes = useStyles();
  return (
    <Box>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={7}>
          <img
            className={classes.img}
            src="../assets/img/pizzacategory.jpg"
            alt="pizza category"
          ></img>
        </Grid>
        <Grid item xs>
          <Box p={3}>
            <h2>The pizza</h2>
            <p>
              a type of bread and tomato dish; often serve with cheese that has
              existed since time immemorial in Middle Eastern and Mediterranean
              cuisine.
            </p>
            <Button mr="auto">
              <Link to="/pizza">See more</Link>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
