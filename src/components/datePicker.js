import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import {
  format,
  addDays,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
  subDays,
} from "date-fns";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "20px 20px 0px 20px",
      width: theme.spacing(16),
      height: "auto",
    },
  },
  paper: {
    width: "100%",
  },
  calender: {
    float: "right",
    margin: "20px 10px",
  },
  heading: {
    marginLeft: "20px",
  },
  layout: {
    margin: "40px 20px",
  },
  icon: {
    border: "1px solid #ADD8E6",
    padding: "5px",
    color: "#0000FF",
  },
  Dateicon: {
    display: "inline-block",
    border: "1px solid #ADD8E6",
    padding: "5px",
    color: "#0000FF",
  },
  view: {
    padding: "5px",
    width: "120px",
    border: "1px solid",
  },
  week: {
    color: "#0000FF",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "18px",
  },
  day: {
    color: "#000000c9",
    fontSize: "15px",
  },
  main: {
    padding: "0px 20px",
  },
}));

function DateComponent() {
  const classes = useStyles();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [startDate, setStartDate] = useState(new Date());
  const [post, setPost] = useState(null);
//   const [date, setDate] = useState(AllDataDates)

  const baseUrl =
    "http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1";
  useEffect(() => {
    axios.get(`${baseUrl}`).then((response) => {
      setPost(response.data);
    });
  }, []);

console.log("post", post)

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setStartDate((date) => {
        return subDays(date, 7);
      });
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setStartDate((date) => {
        return addDays(date, 7);
      });
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };
  const ExampleCustomInput = ({ value, onClick }) => {
    return <CalendarTodayIcon className={classes.Dateicon} onClick={onClick} />;
  };

   const AllDataDates = post && post.map((data) => data.MatchDate)
  console.log("AllDataDates", AllDataDates)

  const renderCells = () => {
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d ";
    const dateFormatMonth = " MMM ";
    const dateFormatWeek = "EEE";
    const dateFormatYear = "YYY";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let formattedDateMonth = "";
    let formattedDateWeek = "";
    let formattedYear = "";
    // while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
    //   console.log(day);
      formattedDate = format(day, dateFormat);
      formattedDateMonth = format(day, dateFormatMonth);
      formattedDateWeek = format(day, dateFormatWeek);
      formattedYear = format(day, dateFormatYear);
      days.push(
        <div
          key={day}
          className={classes.view}
          style={{ display: "inline-block" }}
        >
          <div className={classes.day}>
            {formattedDate}
            {formattedDateMonth}
            {formattedYear}
          </div>
          <div></div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.pop();
    rows.push(<div key={day}>{days}</div>);
    days = [];
    // }

    return (
      <div className={classes.main}>
        <Grid container>
            <h4>Date</h4>
          <Grid item lg={10}>
            <div>{rows}</div>
            
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderCells2 = () => {
    const endDate = lastDayOfWeek(AllDataDates);
    const dateFormat = "d ";
    const dateFormatMonth = " MMM ";
    const dateFormatWeek = "EEE";
    const dateFormatYear = "YYY";
    const rows = [];
    let days = [];
    let day = AllDataDates;
    let formattedDate = "";
    let formattedDateMonth = "";
    let formattedDateWeek = "";
    let formattedYear = "";
    // while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      console.log(day);
      formattedDate = format(day, dateFormat);
      formattedDateMonth = format(day, dateFormatMonth);
      formattedDateWeek = format(day, dateFormatWeek);
      formattedYear = format(day, dateFormatYear);
    console.log("day",day)
      days.push(
        <div
          key={day}
          className={classes.view}
          style={{ display: "inline-block" }}
        >
          <div className={classes.day}>
            {formattedDate}
            {formattedDateMonth}
            {formattedYear}
          </div>
          <div></div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.pop();
    rows.push(<div key={day}>{days}</div>);
    days = [];
    // }

    return (
      <div className={classes.main}>
        <Grid container>
            <h4>Date</h4>
          <Grid item lg={10}>
            <div>{rows}</div>
            <div>{AllDataDates}</div>
            
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          
          <div className={classes.layout}>{renderCells()}</div>
          <div className={classes.layout}>{renderCells2()}</div>
          {/* <div className={classes.layout}>{AllDataDates}</div> */}
          
        </Paper>
      </div>
    </>
  );
}
export default DateComponent;
