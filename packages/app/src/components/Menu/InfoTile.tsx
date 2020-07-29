import React, { FC, ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { SongMenu } from "./";

interface InfoTile {
  selected?: boolean;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  id: string;
}

const InfoTile: FC<InfoTile> = ({
  title,
  subtitle = "",
  onClick,
  selected = false,
  id
}): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = () => {
    setIsMenuOpen(true);
    onClick && onClick();
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          fontSize: "48px",
          padding: "2vh 0"
        }}
        onClick={handleClick}
      >
        <div style={{ width: "57px", height: "auto", paddingRight: "32px" }}>
          {selected && <FontAwesomeIcon icon={faChevronCircleRight} />}
        </div>
        <div>
          <div style={{ fontSize: "48px" }}>{title}</div>
          {subtitle !== "" && (
            <div style={{ fontSize: "36px" }}>{subtitle}</div>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <SongMenu
          songName={title}
          artists={subtitle}
          id={id}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default InfoTile;
