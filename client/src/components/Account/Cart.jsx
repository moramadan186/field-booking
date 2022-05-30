import { useState, useEffect } from "react";
import { useAuth } from "../Auth/Auth";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import emptyCart from "../../assets/empty-cart.png";
import axios from "axios";
const cartItemSt = {
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};
const hrStyle = {
  width: " 80%",
  margin: "0 auto",
  border: "none",
  borderBottom: "1px solid #c0c0c0",
};

const clubImgStyle = {
  width: "100px",
  height: "75px",
  objectFit: "cover",
  borderRadius: "10px",
};

const CardItem = ({
  bookedId,
  fieldImage,
  fieldName,
  date,
  time,
  price,
  head,
  handleRemoveCart,
}) => {
  return (
    <>
      {!head ? <hr style={hrStyle} /> : ""}
      <Box
        textAlign="center"
        sx={{
          ...cartItemSt,
          fontWeight: head ? "bold" : "normal",
          py: head ? 1 : 2,
        }}
      >
        <Box flexBasis={200}>
          {!head ? (
            <img style={clubImgStyle} src={fieldImage} alt={fieldImage} />
          ) : (
            ""
          )}
        </Box>
        <Box flexBasis={200}>{fieldName}</Box>
        <Box flexBasis={200}>{date}</Box>
        <Box flexBasis={200}>{time}</Box>
        <Box flexBasis={200}>{price}</Box>
        <Box
          flexBasis={100}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {!head ? (
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleRemoveCart(bookedId)}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

const Cart = () => {
  const user = useAuth().user;
  const [cartItems, setCardItems] = useState(
    []
    // user !== null ? user.cartItems : null
  );
  const [open, setOpen] = useState(false);
  const [currentCartId, setCurrentCartId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user !== null) {
        const response = await axios.post("http://localhost:8080/cart", {
          userId: user.userId,
        });
        if (response.status === 200) {
          setCardItems(response.data);
        }
      }
    };
    fetchData().catch(console.error);
  }, []);

  let agree = false;
  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveCart = (bookedId) => {
    setCurrentCartId(bookedId);
    setOpen(true);
  };
  const handleAgree = async () => {
    agree = true;
    setOpen(false);
    const oldCartItems = cartItems;
    // remove from frontend
    if (agree) {
      setCardItems(cartItems.filter((item) => item.bookedid !== currentCartId));
    }

    try {
      // remove from backend
      await axios.delete(`http://localhost:8080/deletecart/${currentCartId}`);
    } catch (error) {
      alert(error);
      setCardItems(oldCartItems);
    }
  };
  return (
    <>
      <Paper elevation={2} sx={{ minWidth: 500, padding: "20px 25px" }}>
        {cartItems.length > 0 ? (
          <>
            <CardItem
              head={true}
              key="headerNames"
              fieldName="Club Name"
              date="Date"
              time="Time"
              price="Price"
            />
            {cartItems.map((cartItem) => (
              <CardItem
                key={cartItem.bookedid}
                bookedId={cartItem.bookedid}
                fieldImage={cartItem.fieldimage}
                fieldName={cartItem.fieldname}
                date={cartItem.date}
                time={cartItem.booked_time_start}
                price={cartItem.price}
                handleRemoveCart={handleRemoveCart}
              />
            ))}
          </>
        ) : (
          <Box
            style={{
              textAlign: "center",
              padding: "4rem 0",
              width: "70%",
              margin: "0 auto",
            }}
          >
            <img
              src={emptyCart}
              alt="empty-cart"
              style={{ width: "90%", margin: "0 auto" }}
            />
            <p
              style={{
                marginTop: "3rem",
                color: "#035a33",
                fontSize: "1.2rem",
              }}
            >
              Your cart is empty
            </p>
          </Box>
        )}
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ padding: "2rem 4rem 2rem 2rem" }}
          id="alert-dialog-title"
        >
          Remove this cart item?
        </DialogTitle>
        <DialogActions sx={{ padding: "1rem 2rem " }}>
          <Button onClick={handleAgree} autoFocus>
            OK
          </Button>
          <Button onClick={handleClose}>Cancle</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
