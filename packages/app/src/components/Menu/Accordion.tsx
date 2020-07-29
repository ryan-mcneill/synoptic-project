import React, { FC, ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { SongList } from "./";
import { Song } from "../../store/types";

interface AccordionProps {
  title: string;
  data: Song[];
}

const Accordion: FC<AccordionProps> = ({
  title,
  data
}): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          fontSize: "48px",
          padding: "1.5vh 0"
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ width: "calc(100% - 42px)" }}>{title}</div>
        <div style={{ width: "42px" }}>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
      </div>

      <SongList isVisible={isOpen} data={data} />
    </>
  );
};

export default Accordion;
