import { FormControl, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import PrimarySearchAppBar from "./Topbar";
import Feed from "./Feed";
import { db, auth } from "./firebase"; //追加
import ExitToAppIcon from "@material-ui/icons/ExitToApp"; //ログアウト用のボタン画像
const App = (props) => {
  useEffect(() => {
    // onAuthStateChanged→何らかのユーザー認証変化があったら実行される
    // その際に[user]内に格納される＝空だったら何も起こらない→つまりログインされていない状態
    const unSub = auth.onAuthStateChanged((user) => {
      // !user = falseとなる、つまりユーザーがログインしていない状態の時はログインページに飛ばす
      !user && props.history.push("login");
    });
    return () => unSub();
  });
  return (
    <div>
      <PrimarySearchAppBar />
      {/* ログアウト用のボタンを追加 */}
      <button
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        <ExitToAppIcon />
      </button>
      <span onClick={()=> window.open("https://meeting.eeasy.jp/lifecareer2021/booking", "_blank")}>自己理解コーチング（90分）を予約する</span><br/>
      <span onClick={()=> window.open("https://meeting.eeasy.jp/lifecareer2021/testcoaching", "_blank")}>ご案内・お試しコーチング（30分・無料）を予約する</span>
      <Feed />
    </div>
  );
};

export default App;