import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../Redux/action";
import { useHistory } from "react-router-dom";
dayjs.extend(advancedFormat)

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,

    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
 
  img: {
    borderRadius: "50%",
  },
}));

export default function ProfileCard({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const changeFormat = (dates) => {
    const date = dayjs(dates);
    let dat = dayjs(date).format('D')
    if(Number(dat) === 1){
        dat = `${dat} st`
    }
    if(Number(dat) === 2){
        dat = `${dat} nd`
    }
    if(Number(dat) === 3){
        dat = `${dat} rd`
    }
    if(Number(dat) >= 4 ){
        dat = `${dat} th`
    }
    
    const dated = dayjs(date).format("MMM YYYY");
    return `${dat} ${dated}`;
};

const handleDelete = (id) => {
    console.log("id", id);
    if (window.confirm("Are you sure wanted to delete the user ?")) {
      dispatch(deleteUser(id));
    }
  };

  return (

    <Card className={classes.root}>
      <div>
        <div className={classes.divwidth}>
          <img
            className={classes.img}
            src="https://via.placeholder.com/150"
            alt="placeholder"
          />
        </div>
        <div className={classes.divwidth}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {data["Full Name"]}
          </Typography>
          <Typography className={classes.id} color="textSecondary" gutterBottom>
            {data["Email"]}
          </Typography>
          <Typography
            className={classes.name}
            color="textSecondary"
            gutterBottom
          >
            {changeFormat(data["Date of birth"])}
          </Typography>
          <Typography
            className={classes.country}
            color="textSecondary"
            gutterBottom
          >
            {data["Country"]}
          </Typography>
          <div className={classes.root}>
                      <ButtonGroup
                        variant="contained"
                        aria-label="contained primary button group"
                      >
                        <Button
                          style={{ marginRight: "5px" }}
                          color="secondary"
                          onClick={() => handleDelete(data["Id"])}
                        >
                          Delete
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => history.push(`/editUser/${data["Id"]}`)}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </div>
        </div>
      </div>
    </Card>
  );
}
