const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    margin: "2%",
    fontWeight: "bold",
  };

  return (
    <div className="notification" style={notificationStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
