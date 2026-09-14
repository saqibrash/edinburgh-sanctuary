import { MouseEvent, ReactNode } from "react";
import { TREATWELL_WIDGET_URL } from "@/data/site";

type TreatwellBookButtonProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

const TreatwellBookButton = ({
  className,
  children = "Book on Treatwell",
  onClick,
}: TreatwellBookButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    if (window.wahanda?.openOnlineBookingWidget) {
      window.wahanda.openOnlineBookingWidget(TREATWELL_WIDGET_URL);
      return;
    }
    window.open(
      TREATWELL_WIDGET_URL,
      "treatwell-booking",
      "width=970,height=760,resizable=0,scrollbars=yes,menubar=0,status=0,directories=0,toolbar=0,location=0",
    );
  };

  return (
    <a href={TREATWELL_WIDGET_URL} onClick={handleClick} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default TreatwellBookButton;
