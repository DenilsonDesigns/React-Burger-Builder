import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Classes from "./ContactData.css";
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Max Schwarzmuller",
        address: {
          street: "Steert 1",
          zipCode: "54541",
          country: "Gerania"
        },
        email: "test@gmail.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  render() {
   let form = (
      <form>
      <input
        className={Classes.Input}
        type="text"
        name="name"
        placeholder="Your Name"
      />
      <input
        className={Classes.Input}
        type="email"
        name="email"
        placeholder="Your Email"
      />
      <input
        className={Classes.Input}
        type="text"
        name="street"
        placeholder="Street"
      />
      <input
        className={Classes.Input}
        type="text"
        name="postal"
        placeholder="Postal Code"
      />
      <Button btnType="Success" clicked={this.orderHandler}>
        ORDER
      </Button>
    </form>
   );
   if(this.state.loading){
      form = <Spinner />;
   }
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your Contact Data</h4>
         {form}
      </div>
    );
  }
}

export default ContactData;
