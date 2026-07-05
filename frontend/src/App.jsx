import Layout from "./components/Layout/Layout";
import Modal from "./components/Modal/Modal";
import { useState } from "react";

export default function App() {
  // return <Layout />;
  const [open, setOpen] =
    useState(false);

  return (

    <>

      <button
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>

      <Modal
        open={open}
        title="Test Modal"
        onClose={() => setOpen(false)}
      >

        <p>Hello Modal!</p>

      </Modal>

    </>

  );


}