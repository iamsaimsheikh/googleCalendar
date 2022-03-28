import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PlusButton from "../components/PlusButton";
import SmallCalender from "../components/SmallCalender";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TextField from "@mui/material/TextField";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import "../assets/Style.css";
import Labels from "../components/Labels";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

const Sidebar = () => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");

  const handleClickOpen = () => {
    setOpenDialogue(true);
  };

  const handleClose = () => {
    setOpenDialogue(false);
  };

  useEffect(() => {
    setOpenDialogue(openDialogue);
  }, [openDialogue]);

  const { open, apt, setApt } = useContext(GlobalContext);

  return (
    <Box sx={{ flexGrow: 1, zIndex: "0" }}>
      <Paper sx={{ height: "100vh", zIndex: "0" }}>
        <Box sx={{ height: "100px", flexGrow: 1 }}>
          <div onClick={handleClickOpen}>
            <PlusButton />
          </div>
        </Box>
        <Dialog
          open={openDialogue}
          onClose={handleClose}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Create Task / Event</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1, marginBottom: "10px" }}>
              <TextField
                id="standard-basic"
                label="Title"
                variant="standard"
                autoFocus
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <div style={{ marginTop: "30px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start"
                    value={start}
                    onChange={(newValue) => {
                      setStart(newValue);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <div style={{ marginTop: "30px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End"
                    value={end}
                    onChange={(newValue) => {
                      setEnd(newValue);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <div style={{ marginTop: "20px" }}>
                <TextField
                  id="standard-basic"
                  label="Description"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  multiline
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <div style={{ marginTop: "12px" }}>
                <Typography
                  variant="p"
                  fontSize={14}
                  color="rgba(0, 0, 0, 0.6)"
                >
                  Type
                </Typography>
              </div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Events"
                  name="radio-buttons-group"
                >
                  <div style={{ marginTop: "7px" }}>
                    <FormControlLabel
                      value="Event"
                      control={<Radio />}
                      label="Events"
                      color="primary"
                      onClick={(e) => setType(e.target.value)}
                    />
                    <FormControlLabel
                      value="Task"
                      control={<Radio />}
                      label="Tasks"
                      color="secondary"
                      onClick={(e) => setType(e.target.value)}
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                setApt([
                  ...apt,
                  {
                    id: apt[apt.length - 1].id + 1,
                    members: [1],
                    title: title,
                    startDate: start,
                    endDate: end,
                    type: type,
                  },
                ]);
                console.log(apt);
                handleClose();
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <Box sx={open === false ? { display: "none" } : null}>
          <SmallCalender />
        </Box>
        <Box
          className="searchBox"
          sx={open === false ? { display: "none" } : null}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleAltOutlinedIcon />
                </InputAdornment>
              ),
            }}
            id="filled-basic"
            variant="filled"
            size="small"
            placeholder="Search For People"
          />
        </Box>
        <Box
          className="searchBox labels"
          sx={open === false ? { display: "none" } : null}
        >
          <Labels />
        </Box>
      </Paper>
    </Box>
  );
};

export default Sidebar;
