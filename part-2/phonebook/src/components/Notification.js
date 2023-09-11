import { useEffect } from "react";

const Notification = ({message, setMessage}) => {
 
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) {
    return null;
  }

  return (
    <div className='notif'>{message}</div>
  )
}

export default Notification