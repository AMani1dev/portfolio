import { Link } from "react-router-dom";

const CircleBtn = ({
  text,
  textClr,
  to,
  backgroundColor = "#455ce9",
  allowTransition = true,
}) => {
  const link = String(to || "").trim();
  const isExternal = /^https?:\/\//i.test(link);
  const isRootOnly = link === "/";

  if (!link || isRootOnly) return null;

  const baseClasses = `w-[120px] aspect-square flex-center rounded-[50%] ${textClr}`;

  if (isExternal) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        style={{ backgroundColor }}
      >
        {text}
      </a>
    );
  }

  /* ------------------------------
     INTERNAL LINK (WITH TRANSITION)
  ------------------------------ */
  return (
    <Link
      to={link}
      data-to={link} 
      className={`${baseClasses} ${
        allowTransition ? "page-transition-link" : ""
      }`}
      style={{ backgroundColor }}
    >
      {text}
    </Link>
  );
};

export default CircleBtn;
