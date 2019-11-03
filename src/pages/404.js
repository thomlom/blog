import React from "react";
import { navigate } from "gatsby";

function NotFoundPage() {
  React.useEffect(() => {
    navigate("/");
  }, []);

  return null;
}

export default NotFoundPage;
