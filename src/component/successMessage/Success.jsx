
import './Success.scss';
const Success = ({ handleSent, totalPrice}) => {
    return (
        <div className='success-box'>
            <div className='success-header'>
                <img src='./assets/confirm.png' alt='img'></img>
                <span className='success-title'>Thanks for your order!</span>
                <span className='success-content'>The order confirmation has been sent to your @email</span>
            </div>
            <hr></hr>
            <div className='success-transactionDate'>
                <span className='success-title'>Transaction Date</span>
                <span className='success-content'>3/12/2023 Sunday</span>
            </div>
            <hr></hr>
            <div className='success-method'>
                <span className='success-title'>Payment Method</span>
                <span className='success-content'>Mastercard</span>
            </div>
            <hr></hr>
            <div className='success-price'>
                <span className='success-title'>Sub total:</span>
                <span className='success-content'>${totalPrice.toFixed(2)}$</span>
            </div>
            <hr></hr>
            <div className='success-tax'>
                <span className='success-content'>Tax collected</span>
                <span className='success-content'>$0.80</span>
            </div>
            <div className='success-shipment'>
                <span className='success-content'>Shipment cost</span>
                <span className='success-content'>$6.50</span>
            </div>
            <hr></hr>
            <div className='success-total'>
                <span className='success-title'>Grand total:</span>
                <span className='suceess-title'>${(totalPrice + 0.8 + 6.5).toFixed(2)}$</span>
            </div>
            <div className='success-button' onClick={handleSent}>Continue Shopping</div>
        </div>
    )
}

export default Success
