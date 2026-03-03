import {Component} from 'react'

import CartContext from '../../context/CartContext'
import PaymentPopup from '../PaymentPopup'

import './index.css'

// eslint-disable-next-line
let Popup
try {
  // eslint-disable-next-line
  Popup = require('reactjs-popup').default
} catch (e) {
  Popup = null
}

class CartSummary extends Component {
  state = {
    showPopup: false,
  }

  onOpenPopup = () => {
    this.setState({showPopup: true})
  }

  onClosePopup = () => {
    this.setState({showPopup: false})
  }

  render() {
    const {showPopup} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })

          return (
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}
                /-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              {Popup ? (
                <Popup
                  modal
                  trigger={
                    <button type="button" className="checkout-button">
                      Checkout
                    </button>
                  }
                >
                  {close => (
                    <PaymentPopup
                      itemCount={cartList.length}
                      totalPrice={total}
                      onClose={close}
                    />
                  )}
                </Popup>
              ) : (
                <>
                  <button
                    type="button"
                    className="checkout-button"
                    onClick={this.onOpenPopup}
                  >
                    Checkout
                  </button>
                  {showPopup && (
                    <PaymentPopup
                      itemCount={cartList.length}
                      totalPrice={total}
                      onClose={this.onClosePopup}
                    />
                  )}
                </>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
