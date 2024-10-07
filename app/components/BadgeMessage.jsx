const BadgeMessage = ({ children, className }) => {
  // return <div className="badge-group--message text-black">{children}</div>;
  return (
    <div className={`badge-group--message text-black ${className}`}>
      {children}
    </div>
  );
};

export default BadgeMessage;
