import gql from "graphql-tag";
const GET_ORDERS = gql`
  {
    orders {
      id
      user_id
      status
      shipping
      billing
      products
      date
      updated
      total
      subtotal
      paymentMethod
      customer_id
    }
  }
`;

const GET_ORDER = gql`
  query($id: ID!) {
    productCategory(id: $id) {
      id
      user_id
      status
      shipping
      billing
      products
      date
      updated
    }
  }
`;

const DELETE_ORDER = gql`
  mutation($id: ID!) {
    deleteOrder(id: $id){
      id
      user_id
      status
      shipping
      billing
      products
      date
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation(
    $id: ID!
    $billing: customObject
    $shipping: customObject
    $products: customArray
    $status: String
  ) {
    updateOrder(
      id: $id
      billing: $billing
      shipping: $shipping
      products: $products
      status: $status
    ) {
      id
      user_id
      status
      shipping
      billing
      products
      date
      updated
    }
  }
`;

export { GET_ORDERS, GET_ORDER, DELETE_ORDER, UPDATE_ORDER };
