import {Component} from 'react'

import './index.css'

class PaymentPopup extends Component {
  state = {
    selectedPayment: '',
    isOrderPlaced: false,
  }

  onSelectPayment = event => {
    this.setState({selectedPayment: event.target.value})
  }

  onConfirmOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  renderPaymentOptions = () => {
    const {selectedPayment} = this.state

    const paymentMethods = [
      {id: 'card', label: 'Card', disabled: true},
      {id: 'netBanking', label: 'Net Banking', disabled: true},
      {id: 'upi', label: 'UPI', disabled: true},
      {id: 'wallet', label: 'Wallet', disabled: true},
      {id: 'cod', label: 'Cash on Delivery', disabled: false},
    ]

    return (
      <ul className="payment-methods-list">
        {paymentMethods.map(method => (
          <li key={method.id} className="payment-method-item">
            <input
              type="radio"
              id={method.id}
              name="paymentMethod"
              value={method.id}
              disabled={method.disabled}
              checked={selectedPayment === method.id}
              onChange={this.onSelectPayment}
              className="payment-radio"
            />
            <label
              htmlFor={method.id}
              className={`payment-label ${
                method.disabled ? 'payment-label-disabled' : ''
              }`}
            >
              {method.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  renderOrderSummary = () => {
    const {itemCount, totalPrice} = this.props

    return (
      <div className="order-summary-section">
        <h1 className="summary-heading">Order Summary</h1>
        <div className="summary-details">
          <p className="summary-text">
            Items: <span className="summary-value">{itemCount}</span>
          </p>
          <p className="summary-text">
            Total Price:{' '}
            <span className="summary-value">Rs {totalPrice}/-</span>
          </p>
        </div>
      </div>
    )
  }

  renderSuccessView = () => (
    <div className="success-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-icon"
      />
      <p className="success-message">Your order has been placed successfully</p>
    </div>
  )

  render() {
    const {selectedPayment, isOrderPlaced} = this.state
    const {onClose} = this.props
    const isConfirmDisabled = selectedPayment !== 'cod'

    return (
      <div className="popup-container">
        <button
          type="button"
          className="popup-close-btn"
          onClick={onClose}
          data-testid="close-button"
        >
          &times;
        </button>
        {isOrderPlaced ? (
          this.renderSuccessView()
        ) : (
          <>
            <h1 className="popup-heading">Payment Details</h1>
            <hr className="popup-separator" />
            <h1 className="payment-section-heading">Payment Method</h1>
            {this.renderPaymentOptions()}
            <hr className="popup-separator" />
            {this.renderOrderSummary()}
            <hr className="popup-separator" />
            <button
              type="button"
              className="confirm-order-btn"
              disabled={isConfirmDisabled}
              onClick={this.onConfirmOrder}
            >
              Confirm Order
            </button>
          </>
        )}
      </div>
    )
  }
}

export default PaymentPopup
