import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scroll from "../components/Scroll";
import { Container, Box, Grid, Button, makeStyles } from "@material-ui/core";
import Navbar from "../components/Navbar";
import CartProduct from "./CartProduct";
import { updateCart, deleteCart, increase, decrease } from "../actions/index";

const defaultProps = {
  border: 1
};

const border = {
  p: 3
};

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));
   
function Cart(props) {
  const classes = useStyles();
  const total = props.cart_data.cart.reduce((total, pic) => {
    return (total = total + pic.quantity * pic.totalPrice);
  }, 0);
  function checkOut() {
    props.sum({
      totalPrice: total
    });
  }
  return (
    <div>
      <Scroll showBelow={250}></Scroll>
      <Container>
        <Box {...defaultProps} borderTop={0}>
          <Navbar></Navbar>
          <Box {...border} borderTop={1}>
            <h3>Product</h3>
            {props.cart_data.cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <Box>
                {props.cart_data.cart.map((cart_item) => {
                  return (
                    <Box m={3}>
                      <CartProduct
                        updateCart={props.updateCart}
                        deleteCart={props.deleteCart}
                        increase={props.increase}
                        decrease={props.decrease}
                        topping={props.topping}
                        cart={cart_item}
                        key={cart_item.id}
                      ></CartProduct>
                    </Box>
                  );
                })}
                <Box m={3}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item className={classes.margin}>
                      <h2>Total: </h2>
                    </Grid>
                    <Grid item className={classes.margin}>
                      <h2>€ {total}</h2>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                  >
                    <Button
                      variant="outlined"
                      size="medium"
                      className={classes.margin}
                    >
                      <Link to="/">Continue shopping</Link>
                    </Button>
                    {props.isLogged.username === "" ? (
                      <div>
                        <Button
                          variant="outlined"
                          size="medium"
                          className={classes.margin}
                          disabled
                        >
                          <Link to="/checkout"> Check out</Link>
                        </Button>
                        <p style={{ color: "#e84118" }}>You have to login!</p>
                      </div>
                    ) : (
                      <Button
                        variant="outlined"
                        size="medium"
                        className={classes.margin}
                        onClick={checkOut}
                      >
                        <Link to="/checkout">Check out</Link>
                      </Button>
                    )}
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cart_data: state.cart,
    isLogged: state.isLogged
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (id_cart, value) => {
      dispatch(updateCart(id_cart, value));
    },
    deleteCart: (id_cart) => {
      dispatch(deleteCart(id_cart));
    },
    increase: (id_cart) => {
      dispatch(increase(id_cart));
    },
    decrease: (id_cart) => {
      dispatch(decrease(id_cart));
    },
    sum: (totalPrice) => {
      dispatch({ type: "TOTAL_PRICE", payload: totalPrice });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
