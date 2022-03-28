import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function Labels() {
  const { setEventCheck, setTaskCheck, eventCheck, taskCheck } =
    useContext(GlobalContext);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            defaultChecked="true"
            onClick={() => setEventCheck(!eventCheck)}
          />
        }
        label="Events"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="secondary"
            defaultChecked="true"
            onClick={() => setTaskCheck(!taskCheck)}
          />
        }
        label="Tasks"
      />
    </FormGroup>
  );
}
