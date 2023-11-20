$(document).ready(function () {
  /**
   * 登録可能なオーサー SNS リスト
   */
  const AUTHOR_LIST = {
    twitter: {
      index: 0,
      url: "https://twitter.com",
    },
    facebook: {
      index: 1,
      url: "https://twitter.com",
    },
    instagram: {
      index: 2,
      url: "https://twitter.com",
    },
  };

  /**
   * オーサー SNS リスト
   */
  const authorSnsData = [
    {
      name: "twitter",
      url: "https://twitter.com/xxxxx",
    },
    {
      name: "facebook",
      url: "https://www.facebook.com/xxxxx",
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/xxxxx",
    },
  ];

  /**
   * オーサー SNS リストを更新する
   * @returns {void}
   */
  function updateSnsList() {
    $("#author-sns-list").empty();
    //$("#author-sns-list").sort;

    authorSnsData.forEach((sns) => {
      $("#author-sns-list").append(
        `<li class="author-sns-list-item">
          <div class="sns-info ${sns.name}">
            <div class="sns-name">${sns.name}</div>
            <div class="sns-url">${sns.url}</div>
            <div class="sns-delete-btn">❌</div>
          </div>
        </li>`
      );
    });
  }

  /**
   * オーサー SNS アイテムを削除する
   * @returns {void}
   */
  function removeAuthorSnsDataItem() {
    const snsName = $(this).parent().find(".sns-name").text();
    const deleteSnsIndex = authorSnsData.findIndex(
      (authorSnsData) => authorSnsData.name === snsName
    );

    if (deleteSnsIndex === -1) {
      alert("削除対象のSNSが見つかりません。");
      return;
    }

    authorSnsData.splice(deleteSnsIndex, 1);
    updateSnsList();
  }

  /**
   * オーサー登録フォームをクリアする
   * @returns {void}
   */
  function clearAuthorRegistForm() {
    $("select[name='sns']").val("no-selected");
    $("#sns-url").val("");
  }

  /**
   * オーサー SNS 初期化
   */
  function authorSnsDataInit() {
    if (0 < authorSnsData.length) {
      updateSnsList();
    }
  }

  /**
   * オーサー SNS 削除ボタンクリックイベント
   */
  $("#author-sns-list").on("click", ".sns-delete-btn", removeAuthorSnsDataItem);

  /**
   * オーサー登録ボタンクリックイベント
   */
  $("#sns-regist-btn").click(function () {
    const sns = $('select[name="sns"]').val();
    const snsUrl = $("#sns-url").val();

    if (sns === null) {
      alert("SNS を選択してください。");
      return;
    }

    if (authorSnsData.some((authorSnsData) => authorSnsData.name === sns)) {
      alert(`${sns} は既に登録されています。`);
      return;
    }

    if (snsUrl === "") {
      alert("URLを入力してください。");
      return;
    }

    //const baseUrl = AUTHOR_LIST[sns].url;
    // URL の妥当性チェック
    // if () {
    // }

    // ソート用に index を付与
    // const snsIndex = AUTHOR_LIST[sns].index;

    authorSnsData.push({ name: sns, url: snsUrl });
    updateSnsList();
    clearAuthorRegistForm();
  });

  authorSnsDataInit();
});
