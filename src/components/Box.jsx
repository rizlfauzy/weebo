import { useState } from "react";
import PropTypes from "prop-types";

export default function Box({children}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}

// prop types
Box.propTypes = {
  children: PropTypes.node.isRequired,
};