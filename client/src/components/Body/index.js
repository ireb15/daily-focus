import { Grid, makeStyles } from "@material-ui/core";
import SelectedWidgetsModal from "../SelectWidgetsModal";
import styles from "./style.module.scss";

import Timer from "../Timer";
import ToDoList from "../ToDoList";

const useStyles = makeStyles({
    grid: {
        width: "80%",
    },
    label: {
        textTransform: "capitalize",
        fontSize: "1.25rem",
    },
});

function Body({ selectedWidgets, setSelectedWidgets }) {
    const classes = useStyles();

    return (
        <div className={styles.gridContainer}>
            {selectedWidgets && selectedWidgets.length ? (
                <Grid container justify="center" spacing={4} className={classes.grid}>
                    {selectedWidgets.includes("To Do List") && <ToDoList />}
                    {selectedWidgets.includes("Calendar") && <div>Calendar</div>}
                    {selectedWidgets.includes("Timer") && <Timer />}
                </Grid>
            ) : (
                <div className={styles.noWidgetContainer}>
                    <div className={styles.message}>Your focus page is empty</div>
                    <div className={styles.addWidget}>
                        <SelectedWidgetsModal
                            selectedWidgets={selectedWidgets}
                            setSelectedWidgets={setSelectedWidgets}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Body;
