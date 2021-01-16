//データ登録するファイル

import React, { useState } from "react";
import { storage, db ,auth} from "./firebase";
import firebase from "firebase/app";
import { Button, IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PrimarySearchAppBar from "./Topbar";
import "./styles.css";

const TweetInput = () => {
  // 記述3. useStateを用意します 画像を保持する箱、入力された文字列を保持する箱
  const [inputImage, setInputImage] = useState(null);
  const [ name ,setName] = useState("");
  const [ nametag, setNametag] = useState("");
  const [ age, setAge] = useState("");
  const [ region, setRegion] = useState("");
  const [ c1name, setC1name] = useState("");
  const [ c1term, setC1term] = useState("");
  const [ c1position, setC1position] = useState("");
  const [ c1job, setC1job] = useState("");
  const [ c2name, setC2name] = useState("");
  const [ c2term, setC2term] = useState("");
  const [ c2position, setC2position] = useState("");
  const [ c2job, setC2job] = useState("");
  const [ other, setOther] = useState("");
  const [ demand, setDemand] = useState("");

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
      e.target.value = "";
    }
  };
  var user = firebase.auth().currentUser;
  var  email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; }
  // 記述7.送信処理を記述
  const sendTweet = (e) => {
    // 状態を確認する
    e.preventDefault();
    if (inputImage) {
      // 画像 + テキストの処理
      // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
      // そのためにファイル名をランダムなファイル名を作る必要がある、それが下
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
      const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomMoji + "_" + inputImage.name;
      // firebase storageに登録する処理
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(inputImage);
      // firebaseのDBに登録する処理
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {}, //進捗度合いの管理するもの、
        (err) => {
          //エラーに関する処理
          alert(err.message);
        },
        async () => {
          //成功したとき
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection('posts').doc(uid).set({
                image: url,
                name: name,
                nametag: nametag,
                age: age,
                region: region,
                c1name: c1name,
                c1term: c1term,
                c1position: c1position,
                c1job: c1job,
                c2name: c2name,
                c2term: c2term,
                c2position: c2position,
                c2job: c2job,
                other: other,
                demand: demand,
                uid: uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    } else {
      // テキストだけの処理
      db.collection('posts').doc(uid).set({
        image: "",
        name: name,
        nametag: nametag,
        age: age,
        region: region,
        c1name: c1name,
        c1term: c1term,
        c1position: c1position,
        c1job: c1job,
        c2name: c2name,
        c2term: c2term,
        c2position: c2position,
        c2job: c2job,
        other: other,
        demand: demand,
        uid: uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInputImage(null);
    setName("");
  };
  return (
    <div>
          <PrimarySearchAppBar />
      {/* 記述1. formのタグを書く */}
      <form onSubmit={sendTweet}>
        {/* 記述2 inputタグを書きます */}
        <input
          className="max"
          placeholder="名前"
          type="text"
          autoFocus
          value={name}
          // eventを書きます onChange
          // 記述6 event
          onChange={(e) => setName(e.target.value)}
        /> 
        <br/>      
         <input
        className="habahiro"
        placeholder="フリガナ"
        type="text"
        autoFocus
        value={nametag}
        // eventを書きます onChange
        // 記述6 event
        onChange={(e) => setNametag(e.target.value)}
      />
      <br/>      
         <input
        className=""
        placeholder="年齢"
        type="text"
        autoFocus
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
            <br/>      
         <input
        className=""
        placeholder="地域"
        type="text"
        autoFocus
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
       <br/>  
               <input
        className=""
        placeholder="社名１"
        type="text"
        autoFocus
        value={c1name}
        onChange={(e) => setC1name(e.target.value)}
      />
             <br/>  
               <input
        className=""
        placeholder="在籍期間1"
        type="text"
        autoFocus
        value={c1term}
        onChange={(e) => setC1term(e.target.value)}
      />
             <br/>  
               <input
        className=""
        placeholder="役職階層１"
        type="text"
        autoFocus
        value={c1position}
        onChange={(e) => setC1position(e.target.value)}
      />
             <br/>  
               <input
        className=""
        placeholder="職務内容1（課題・手段・成果）"
        type="text"
        autoFocus
        value={c1job}
        onChange={(e) => setC1job(e.target.value)}
      />

<br/>  
               <input
        className=""
        placeholder="社名2"
        type="text"
        autoFocus
        value={c2name}
        onChange={(e) => setC2name(e.target.value)}
      />
             <br/>  
               <input
        className=""
        placeholder="在籍期間2"
        type="text"
        autoFocus
        value={c2term}
        onChange={(e) => setC2term(e.target.value)}
      />
             <br/>  
               <input
        className=""
        placeholder="役職階層2"
        type="text"
        autoFocus
        value={c2position}
        onChange={(e) => setC2position(e.target.value)}
      />
             <br/>  
               <input
        className=""
        placeholder="職務内容2（課題・手段・成果）"
        type="text"
        autoFocus
        value={c2job}
        onChange={(e) => setC2job(e.target.value)}
      />
      <br/>  
               <input
        className=""
        placeholder="その他職務内容記載蘭"
        type="text"
        autoFocus
        value={other}
        onChange={(e) => setOther(e.target.value)}
      />
      <br/>  
               <input
        className=""
        placeholder="ご要望"
        type="text"
        autoFocus
        value={demand}
        onChange={(e) => setDemand(e.target.value)}
      />
              <br/>  
        <IconButton>
          <label>
            <AddAPhotoIcon />
            <input type="file" onChange={onChangeImageHandler} />
          </label>
        </IconButton>
        <Button type="submit" disabled={!name}>
          送信
        </Button>
      </form>
      {/*  */}
    </div>
  );
};
export default TweetInput;