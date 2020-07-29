import React, { FC, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface TabButtonProps {
  icon?: IconProp;
  title?: string;
  onClick: any;
  isSelected?: boolean;
  type?: string;
}

const TabButton: FC<TabButtonProps> = ({
  onClick,
  isSelected,
  icon,
  title,
  type
}): ReactElement => {
  const width = icon ? (isSelected ? "200%" : 0) : isSelected ? "100%" : 0;
  return (
    <div title={title ? title : type} onClick={() => onClick()}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {!icon && title && <span>{title}</span>}
      <div
        style={{
          width: width,
          height: "8px",
          backgroundColor: "black",
          position: "relative",
          left: icon ? "-50%" : 0,
          marginTop: "8px",
          transition: "all 0.5s ease"
        }}
      />
    </div>
  );
};

export default TabButton;
