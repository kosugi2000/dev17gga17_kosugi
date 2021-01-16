import React, { useState, useEffect } from "react";
import { Button, FormControl, TextField, Typography, Avatar ,Box ,makeStyles,Grid, CssBaseline, Paper,Link} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { auth } from "./firebase";
//スタイル

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login = (props) => {

  //ログイン状態の保持
  const [isLogin, setIsLogin] = useState(true);
  // メールの状態を保持
  const [email, setEmail] = useState("");
  // パスワードの状態を保持
  const [password, setPassword] = useState("");
  //スタイル
    const classes = useStyles();
  useEffect(() => {
    // 認証関係に対して何かしらの変更があったときに実行されるfirebaseの機能
    // onAuthStateChangedは→ログインしていたとか、ログアウトしたとかで呼び出される
    // userというパラメーターがあり、これには「ログインが成功したときに」この部分に全部格納される
    // userに何らかの情報がはいっていればログインに成功、入ってなければログイン失敗、ログインしていない
    const unSub = auth.onAuthStateChanged((user) => {
      // 判定の条件は何らかの情報が入っていた時→ルートの画面（App）に遷移させる(逆にuserにない場合は常にこの画面に止まり続ける)
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);
  return (
    <div>

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "ログインする" : "新規登録する"}
          </Typography>
          <form className={classes.form} noValidate>
<form>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoFocus
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
          }}
            />

            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

<Button
        variant="outlined"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={
          isLogin
            ? async () => {
                try {
                  // ログイン時 firebaseに[signInWithEmailAndPassword]というものがあるのでそれに
                  // email, passwordで保持した状態を送り→成功すればhistoryによって画面遷移が実行される
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  // ログインできない、失敗したときはエラーで表示される
                  console.log(error.code, "error sign with");
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  // 作成時 firebaseに[createUserWithEmailAndPassword]というものがあるのでそれに
                  // email, passwordで保持した状態を送り→成功すればhistoryによって画面遷移が実行される
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  // ログインできない、失敗したときはエラーで表示される
                  console.log(error.code, "error");
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? "login" : "register"}
      </Button>

      </form>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>
                <Button 
                              fullWidth
 
                              color="primary"
 
                onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "新規登録（アカウントをお持ちでない方）" : "ログイン（アカウントをお持ちの方）"}
        </Button>
                
              </Grid>
            </Grid>
            <Box mt={5}>

            </Box>
          </form>
        </div>
      </Grid>
    </Grid>


    </div>
  );
};
export default Login;
      