import React, { useEffect } from "react";
import Table from "../components/Table";

function Admin({ title, setPageTitle }) {
  useEffect(() => {
    // Set the page title when the component mounts or when 'title' changes
    setPageTitle(title);
    document.title = title;
  }, [title, setPageTitle]);
  return <Table key={title.toLowerCase()} title={title} />;
}

export default Admin;
