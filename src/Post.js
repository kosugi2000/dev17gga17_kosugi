// 表示するためだけのファイル

import React,{useState, useEffect} from 'react'
import ImgPath1 from "./img/noImage.png";
import { db } from "./firebase";
import "./styles.css";
import ClearIcon from "@material-ui/icons/Clear";
// 表示される順番をuseEffectで制御する。データベースからデータとるときは必須

//削除ボタンの実装
const DeleteInputData = (id) => {
  db.collection("posts").doc(id).delete();
  console.log('削除が実行されました！', id);
};

//データがきますよ＝props
const Post = ({
  name,
  nametag,
  age,
  region,
  c1name,
  c1term,
  c1position,
  c1job,
  c2name,
  c2term,
  c2position,
  c2job,
  other,
  demand,
  image,
  uid,timestamp,id
}) => {
  
    return (
        <div>
          
           
     <div>

            {/* 画像があるときだけ表示 */}
      
            {image ? (
        <div>
          <img src={image} alt="" className="insta"/>
        </div>
      ) : (
        <div>
        <img src={ImgPath1} alt="" className="insta" />
        </div>
      )}
     
            {/* テキスト情報 */}
             <div>{name}</div> 
             <div>{nametag}</div>
             <div>{age}</div>
             <div>{region}</div>
            <div>{c1name}</div>
            <div>{c1term}</div>
            <div>{c1position}</div>
            <div>{c1job}</div>
            <div>{c2name}</div>
            <div>{c2term}</div>
            <div>{c2position}</div>
            <div>{c2job}</div>
            <div>{other}</div>
            <div>{demand}</div>

            {/* 日付を表示！ｊｓの形式 */}
              <div>
                {new Date(timestamp?.toDate()).toLocaleString()}
                <button onClick={() => DeleteInputData(id)}><ClearIcon /></button>
              </div>
         </div>
       </div>
    )
}

export default Post

