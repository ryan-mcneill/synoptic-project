import React, { FC, ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { SongMenu } from "./";
import { Song } from "../../store/types";
import { artistsToString } from "../../utils";

interface InfoTile {
  selected?: boolean;
  onClick?: () => void;
  hasMenu?: boolean;
  data: Song;
}

const InfoTile: FC<InfoTile> = ({
  data,
  onClick,
  selected = false,
  hasMenu = true
}): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const artists = data.artists ? artistsToString(data.artists) : "";

  const handleClick = () => {
    setIsMenuOpen(true);
    onClick && onClick();
  };

  return (
    <div>
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
          <div style={{ fontSize: "48px" }}>{data.name}</div>
          {artists !== "" && <div style={{ fontSize: "36px" }}>{artists}</div>}
        </div>
      </div>
      {hasMenu && isMenuOpen && (
        <SongMenu
          artists={artists}
          data={data}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default InfoTile;
