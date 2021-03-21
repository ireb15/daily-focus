import React, { useState } from "react";
import Calendar from "react-calendar";
import EventView from "./EventView";
import NewEvent from "./NewEvent";
import initialEvents from "./initial-events.js";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./Calendar.scss";

const compareDate = (day1, day2) => {
    return (
        day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getDate() === day2.getDate()
    );
};

const gridStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "350px",
        maxWidth: "100%",
        background: "white",
        border: "1px solid #a0a096",
        borderRadius: "20px",
        boxShadow: "0px 4px 16px 8px rgba(0, 0, 0, 0.25)",
        padding: "0px",
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },

    circle: {
        width: "6px",
        height: "6px",
    },
}));

function CalendarWidget() {
    const [selected, setSelected] = useState(new Date());
    const [events, setEvents] = useState(initialEvents);

    //Declare grid styling
    const gridStyles = gridStyle();

    //Add content to the calendar tiles
    const tileContent = ({ date }) => (
        <div>
            {events.map((event) =>
                compareDate(event.date, date) ? (
                    <FiberManualRecordIcon className={gridStyles.circle} />
                ) : null
            )}
        </div>
    );

    const onAddNewEvent = (title, description) => {
        setEvents([
            ...events,
            {
                date: new Date(
                    selected.getMonth() +
                        1 +
                        " " +
                        selected.getDate() +
                        ", " +
                        (selected.getYear() + 1900) +
                        " " +
                        "00:00:00"
                ),
                title: title,
                description: description,
            },
        ]);
    };

    const onRemoveEvent = (index) => {
        events.splice(index, 1);
        setEvents([...events]);
    };

    return (
        <Grid className={gridStyles.root}>
            <Grid>
                <Calendar onClickDay={(value) => setSelected(value)} tileContent={tileContent} />
            </Grid>
            <Grid>
                <EventView selected={selected} events={events} onRemoveEvent={onRemoveEvent} />
                <NewEvent onAddNewEvent={onAddNewEvent} />
            </Grid>
        </Grid>
    );
}

export default CalendarWidget;
