import Link from "next/link";
import SectionContainer from "./SectionContainer";
import { getTextAlign } from "../utils/helper";

const BadgeGroup2 = ({ alignment, link, children, className }) => {
  const Element = link ? Link : "div";
  const href =
    typeof link === "string" ? link : link?.href != null ? link.href : "";
  const alignClass = getTextAlign(alignment);

  return (
    <SectionContainer className="badge-group w-full">
      <Element
        href={href}
        className={`badge-group--container2 ${link ? "badge-group--link" : ""} ${
          alignClass ? alignClass : ""
        } ${className && className}`}
      >
        {children}
      </Element>
    </SectionContainer>
  );
};

export default BadgeGroup2;
