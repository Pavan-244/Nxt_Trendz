import {Component} from 'react'

import CartContext from '../../context/CartContext'
import PaymentPopup from '../PaymentPopup'

import './index.css'

class CartSummary extends Component {
  state = {
    isPopupOpen: false,
  }

  onOpenPopup = () => {
    this.setState({isPopupOpen: true})
  }

  onClosePopup = () => {
    this.setState({isPopupOpen: false})
  }

  render() {
    const {isPopupOpen} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })

          return (
            <>
              <div className="cart-summary-container">
                <h1 className="order-total-value">
                  <span className="order-total-label">Order Total:</span> Rs{' '}
                  {total}
                  /-
                </h1>
                <p className="total-items">{cartList.length} Items in cart</p>
                <button
                  type="button"
                  className="checkout-button d-sm-none"
                  onClick={this.onOpenPopup}
                >
                  Checkout
                </button>
              </div>
              <button
                type="button"
                className="checkout-button d-lg-none"
                onClick={this.onOpenPopup}
              >
                Checkout
              </button>
              {isPopupOpen && (
                <PaymentPopup
                  itemCount={cartList.length}
                  totalPrice={total}
                  onClose={this.onClosePopup}
                />
              )}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
