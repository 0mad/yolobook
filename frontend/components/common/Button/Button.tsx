import classNames from 'classnames/bind';
import { default as LinkElement } from 'next/link';
import React from 'react';
import styles from './Button.scss';

const cx = classNames.bind(styles);

const Div: React.FunctionComponent = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

const Link: React.FunctionComponent = ({ children, href, ...rest }) => (
  <LinkElement href={href}>
    <a {...rest}>{children}</a>
  </LinkElement>
);

interface IProps {
  disabled: boolean;
  inline: boolean;
  onClick: any;
  theme: string;
  shape: string;
  href: any;
  style: object;
}

const defaultProps = {
  disabled: false,
  href: null,
  inline: false,
  onClick: null,
  shape: '',
  style: {},
  theme: 'gray',
};

class Button extends React.Component<IProps> {
  public static defaultProps = defaultProps;

  public render() {
    const {
      children,
      href,
      onClick,
      theme,
      shape,
      disabled,
      inline,
      style,
    } = this.props;
    const isLink = href && !disabled;
    const Element = isLink ? Link : Div;
    return (
      <Element
        href={href}
        className={cx('button', theme, shape, { disabled }, { inline })}
        onClick={disabled ? () => null : onClick}
        style={style}
      >
        {children}
      </Element>
    );
  }
}

export default Button;
