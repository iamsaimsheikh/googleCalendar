import * as React from "react";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import "./assets/Style.css";
import { useState } from "react";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  ViewSwitcher,
  Toolbar as MToolBar,
  TodayButton,
  DateNavigator,
  MonthView,
  DayView,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { appointments } from "./demo-data/appointments";
import { useContext } from "react";
import { GlobalContext } from "./contexts/GlobalContext";

const PREFIX = "Demo";
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
};
const StyledDiv = styled("div")(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: "flex",
    marginBottom: theme.spacing(2),
    justifyContent: "flex-end",
  },
  [`& .${classes.text}`]: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
}));

const ResourceSwitcher = ({ mainResourceName, onChange, resources }) => (
  <StyledDiv className={classes.container}>
    <div className={classes.text}>Main resource name:</div>
    <Select
      variant="standard"
      value={mainResourceName}
      onChange={(e) => onChange(e.target.value)}
    >
      {resources.map((resource) => (
        <MenuItem key={resource.fieldName} value={resource.fieldName}>
          {resource.title}
        </MenuItem>
      ))}
    </Select>
  </StyledDiv>
);

export default () => {
  const {
    date,
    setDate,
    apt,
    eventCheck,
    taskCheck,
    eventFiltered,
    taskFiltered,
    setApt,
    setEventFiltered,
    setTaskFiltered,
  } = useContext(GlobalContext);
  const [data, setData] = React.useState(apt);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
    React.useState(true);

  const [mainResourceName, setMainResourceName] = useState("type");
  const [resources, setResources] = useState([
    {
      fieldName: "type",
      title: "Type",
      instances: [
        { id: "Event", text: "Event" },
        { id: "Task", text: "Task" },
      ],
    },
  ]);

  function changeMainResource(mainResourceName) {
    setMainResourceName({ mainResourceName });
  }

  const currentDate = date;
  const editingOptionsList = [
    { id: "allowAdding", text: "Adding" },
    { id: "allowDeleting", text: "Deleting" },
    { id: "allowUpdating", text: "Updating" },
    { id: "allowResizing", text: "Resizing" },
    { id: "allowDragging", text: "Dragging" },
  ];

  React.useEffect(() => {
    setDate(date);
    setApt(apt);
    setData(data);
  }, [date, apt, data]);

  const EditingOptionsSelector = ({ options, onOptionsChange }) => (
    <StyledDiv className={classes.container}>
      <Typography className={classes.text}>Enabled Options</Typography>
      <FormGroup row>
        {editingOptionsList.map(({ id, text }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={options[id]}
                onChange={onOptionsChange}
                value={id}
                color="primary"
              />
            }
            classes={{ label: classes.formControlLabel }}
            label={text}
            key={id}
            disabled={
              (id === "allowDragging" || id === "allowResizing") &&
              !options.allowUpdating
            }
          />
        ))}
      </FormGroup>
    </StyledDiv>
  );

  const {
    allowAdding,
    allowDeleting,
    allowUpdating,
    allowResizing,
    allowDragging,
  } = editingOptions;

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
        setApt([...apt, { id: startingAddedId, members: [1], ...added }]);
        setEventFiltered(apt.filter((item) => item.type === "Event"));
        setTaskFiltered(apt.filter((item) => item.type === "Task"));
        console.log(apt);
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
        setApt(
          apt.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
        setEventFiltered(apt.filter((item) => item.type === "Event"));
        setTaskFiltered(apt.filter((item) => item.type === "Task"));
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
        setApt(apt.filter((appointment) => appointment.id !== deleted));
        setEventFiltered(apt.filter((item) => item.type === "Event"));
        setTaskFiltered(apt.filter((item) => item.type === "Task"));
      }
      setIsAppointmentBeingCreated(false);
    },
    [setData, setIsAppointmentBeingCreated, data]
  );
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });
  const handleEditingOptionsChange = React.useCallback(({ target }) => {
    const { value } = target;
    const { [value]: checked } = editingOptions;
    setEditingOptions({
      ...editingOptions,
      [value]: !checked,
    });
  });

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell
        {...restProps}
        onDoubleClick={allowAdding ? onDoubleClick : undefined}
      />
    )),
    [allowAdding]
  );

  const CommandButton = React.useCallback(
    ({ id, ...restProps }) => {
      if (id === "deleteButton") {
        return (
          <AppointmentForm.CommandButton
            id={id}
            {...restProps}
            disabled={!allowDeleting}
          />
        );
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    },
    [allowDeleting]
  );

  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating]
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating]
  );

  // if (eventCheck && taskCheck === true) {
  //   return apt;
  // } else if (eventCheck === true && taskCheck === false) {
  //   return apt.filter((item) => item.type === "Event");
  // } else if (eventCheck === false && taskCheck === true) {
  //   return apt.filter((item) => item.type === "Task");
  // } else {
  //   return null;
  // }

  return (
    <React.Fragment>
      <Paper>
        <Scheduler
          data={
            eventCheck && taskCheck === true
              ? apt
              : eventCheck === true && taskCheck === false
              ? eventFiltered
              : eventCheck === false && taskCheck === true
              ? taskFiltered
              : [{}]
          }
          height={620}
          width={580}
        >
          <ViewState defaultCurrentDate="2018-06-27" />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />

          <IntegratedEditing />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={TimeTableCell}
          />
          <MToolBar />
          <TodayButton />
          <ViewSwitcher />
          <DateNavigator />
          <MonthView />
          <DayView />

          <Appointments />

          <Resources data={resources} mainResourceName={mainResourceName} />

          <AppointmentTooltip showOpenButton showDeleteButton={allowDeleting} />
          <AppointmentForm
            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
          />
          <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
};
