import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target, list) => list.removeChild(target);

const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButtonMove(completeButton);

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButtonMove(deleteButton);

  // divタグの子要素に各要素を設定する。
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

let completeButtonMove = (completeButton) => {
  completeButton.addEventListener("click", () => {
    const deleteTarget = completeButton.parentNode;
    deleteFromIncompleteList(
      deleteTarget,
      document.getElementById("incomplete-list")
    );
    const addTarget = completeButton.parentNode;
    const text = addTarget.firstElementChild.innerText;
    addTarget.textContent = null;
    const li = document.createElement("li");
    li.innerText = text;

    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButtonMove(backButton);

    // divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });
};

let deleteButtonMove = (deleteButton) => {
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ（div)を未完了リストから削除
    const deleteTarget = deleteButton.parentNode;
    deleteFromIncompleteList(
      deleteTarget,
      document.getElementById("incomplete-list")
    );
  });
};

const backButtonMove = (backButton) => {
  backButton.addEventListener("click", () => {
    deleteFromIncompleteList(
      backButton.parentNode,
      document.getElementById("complete-list")
    );
    const incompleteTarget = backButton.parentNode;
    const text = incompleteTarget.firstElementChild.innerText;
    createIncompleteList(text);
  });
};
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
