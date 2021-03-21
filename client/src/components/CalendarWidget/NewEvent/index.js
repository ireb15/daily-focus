import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";

function NewEvent({ onAddNewEvent }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const AddEventHandler = () => {
        onAddNewEvent(title, description);
        setTitle("");
        setDescription("");
    };

    const buttonStyle = makeStyles({
        buttonStyle: {
            background: "#30A0F5",
            border: 0,
            borderRadius: 32,
            color: "white",
            height: 64,
            padding: "5px 10px",
        },
    });

    const inputStyle = makeStyles((theme) => ({
        input: {
            "& > *": {
                margin: theme.spacing(1),
                width: "20ch",
                height: "5ch",
            },
        },
    }));

    const button = buttonStyle();
    const classes = inputStyle();

    return (
        <div>
            <div>
                <TextField
                    className={classes.input}
                    label="Title"
                    variant="filled"
                    type="text"
                    value={title}
                    onInput={(e) => setTitle(e.target.value)}
                ></TextField>

                <TextField
                    className={classes.input}
                    label="Description"
                    variant="filled"
                    type="text"
                    value={description}
                    onInput={(e) => setDescription(e.target.value)}
                ></TextField>
            </div>

            <Button className={button.buttonStyle} onClick={() => AddEventHandler()}>
                <AddIcon></AddIcon>
            </Button>
        </div>
    );
}

NewEvent.propTypes = {
    onAddNewEvent: PropTypes.func,
};

export default NewEvent;
