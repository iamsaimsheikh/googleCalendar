import { createContext, useState, useEffect } from "react";
import React from "react";
import { appointments } from "../demo-data/appointments";

export const GlobalContext = createContext();

function GlobalContextProvider(props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [apt, setApt] = useState(appointments);
  const [eventCheck, setEventCheck] = useState(true);
  const [taskCheck, setTaskCheck] = useState(true);
  const [eventFiltered, setEventFiltered] = useState(
    apt.filter((item) => item.type === "Event")
  );
  const [taskFiltered, setTaskFiltered] = useState(
    apt.filter((item) => item.type === "Task")
  );

  useEffect(() => {
    setApt(apt);
  }, [apt]);

  return (
    <GlobalContext.Provider
      value={{
        open,
        setOpen,
        date,
        setDate,
        setEventCheck,
        setTaskCheck,
        eventCheck,
        taskCheck,
        apt,
        eventFiltered,
        taskFiltered,
        setApt,
        setEventFiltered,
        setTaskFiltered,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
