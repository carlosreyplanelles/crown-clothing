import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { CartIcon } from "../../components/cart-icon/cart-icon.component";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import {
  NavigationContainer,
  NavLinksContainer,
  LogoContainer,
  NavLink,
} from "./navigationBar.styles";
import { SignOutHandler } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { getCart } from "../../store/cart/cart.selector";

const NavigationBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const showMiniCart = useSelector((state) => state.cart.showMiniCart);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={SignOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>

        {showMiniCart && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default NavigationBar;
