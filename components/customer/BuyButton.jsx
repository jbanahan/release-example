import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const styleBuyButton = {
  margin: '10px 20px 0px 0px',
};

const port = process.env.NEXT_PUBLIC_PORT || 8000;
const ROOT_URL = `http://localhost:${port}`;

const propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    textNearButton: PropTypes.string,
  }),
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  redirectToCheckout: PropTypes.bool,
};

const defaultProps = {
  book: null,
  user: null,
  redirectToCheckout: false,
};

class BuyButton extends React.Component {
  componentDidMount() {
    if (this.props.redirectToCheckout) {
      this.handleCheckoutClick();
    }
  }

  onLoginClicked = () => {
    const { user } = this.props;

    if (!user) {
      const redirectUrl = `${window.location.pathname}?buy=1`;
      window.location.href = `${ROOT_URL}/auth/google?redirectUrl=${redirectUrl}`;
    }
  };

  handleCheckoutClick = async () => {
    return true;
  };

  render() {
    const { book, user } = this.props;

    if (!book) {
      return null;
    }

    if (!user) {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            style={styleBuyButton}
            onClick={this.onLoginClicked}
          >
            {`Buy book for $${book.price}`}
          </Button>
          <p style={{ verticalAlign: 'middle', fontSize: '15px' }}>{book.textNearButton}</p>
          <hr />
        </div>
      );
    }
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          style={styleBuyButton}
          onClick={this.handleCheckoutClick}
        >
          {`Buy book for $${book.price}`}
        </Button>
        <p style={{ verticalAlign: 'middle', fontSize: '15px' }}>{book.textNearButton}</p>
        <hr />
      </div>
    );
  }
}

BuyButton.propTypes = propTypes;
BuyButton.defaultProps = defaultProps;

export default BuyButton;
