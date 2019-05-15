import React from "react";
import Header from "../Header";

const layoutStyle = {
  border: "1px solid #DDD",
  margin: 20,
  padding: 20,
};

interface IProps {
  children: any;
}

const Layout: React.SFC<IProps> = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
