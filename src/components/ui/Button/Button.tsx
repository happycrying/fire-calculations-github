
import React from "react";
import { Icon } from "~/components/icons";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface IButton extends React.HTMLProps<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
  color?: "primary" | "secondary" | "gray" | "blue" | "gold" | "black" | "white";
  variant?: "contained" | "outlined" | "text";
  upperCase?: boolean;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  small?: boolean;
}

const Button: React.FC<IButton> = ({
                                     loading,
                                     children,
                                     type = "button",
                                     fullWidth = false,
                                     className,
                                     variant = "contained",
                                     color = "primary",
                                     upperCase = true,
                                     small = false,
                                     ...props
                                   }) => {
  const primaryStyle = `${ styles.buttonColorPrimary }`;
  const secondaryStyle = `${ styles.buttonColorSecondary }`;
  const gray = `${ styles.buttonColorGray }`;
  const blue = `${ styles.buttonColorBlue }`;
  const gold = `${ styles.buttonColorGold }`;
  const white = `${ styles.buttonColorWhite }`;
  const black = `${ styles.buttonColorBlack }`;
  const smallStyle = `${ styles.buttonSizeSmall }`;

  return (
    <button
      disabled={ loading }
      className={ classNames(
        className,
        `flex items-center gap-2 justify-center p-2 font-bold ${ styles.buttonBase }`,
        {
          "w-full": fullWidth,
          uppercase: upperCase,
          [styles.outlined]: variant === "outlined",
          [styles.contained]: variant === "contained",
          [styles.text]: variant === "text",
          [primaryStyle]: color === "primary",
          [secondaryStyle]: color === "secondary",
          [gray]: color === "gray",
          [blue]: color === "blue",
          [black]: color === "black",
          [white]: color === "white",
          [gold]: color === "gold",
          [smallStyle]: small,
        }
      ) }
      { ...props }
      type={ type }
    >
      { loading && (
        <span className="text-currentColor  animate-spin">
          <Icon name="loading" size={ 18 }></Icon>
        </span>
      ) }
      { children }
    </button>
  );
};

export default Button;
