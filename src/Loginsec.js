import React, { useState, useEffect } from "react";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { auth } from "./firebase";
const Login = (props) => {
  //ログイン状態の保持
  const [isLogin, setIsLogin] = useState(true);
  // メールの状態を保持
  const [email, setEmail] = useState("");
  // パスワードの状態を保持
  const [password, setPassword] = useState("");
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
      {/* ログインしているときのタイトの切り替え */}
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="email"
          label="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
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
      <br />
      <Typography align="center">
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create new account ?" : "Back to login"}
        </span>
      </Typography>
    </div>
  );
};
export default Login;