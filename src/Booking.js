import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "./Topbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
               <PrimarySearchAppBar />
      <h3>クリックすると外部のサイトへリンクします</h3>
      <Grid container spacing={3} justify="space-around">
        <Grid
          item
          xs={12}
          sm={4}
          onClick={() =>
            window.open(
              "https://meeting.eeasy.jp/lifecareer2021/booking",
              "_blank"
            )
          }
        >
          <Paper className={classes.paper}>
            <h3>自己理解コーチングを予約
            <br />
            ストレングスコーチング（90分）</h3>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          onClick={() =>
            window.open(
              "https://meeting.eeasy.jp/lifecareer2021/booking",
              "_blank"
            )
          }
        >
          <Paper className={classes.paper}>
            <h3>一度話を聞いてみたい
            <br />
            無料カウンセリング（30分）</h3>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
