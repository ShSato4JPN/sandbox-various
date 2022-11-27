$(document).ready(function () {
  $("input[type='text']").keypress(function (e) {
    if (e.which === 13) {
      e.preventDefault();
      // 行数を取得
      let maxRowCount = $("tbody tr").length - 1;
      //　行に含まれる input[type='text'] の数を取得
      let maxColCount =
        $("tbody tr:nth-child(1) input[type='text']").length - 1;

      // 参照されている input　から一番近い tr　要素を取得する
      let tr = $(this).closest("tr");
      if (tr[0]) {
        // カレントの行番号を取得
        let rowNo = $("tbody tr").index(tr[0]);
        //　カレントの列番号を取得 (nth-child() は １スタート)
        let colNo = $(`tbody tr:nth-child(${rowNo + 1}) input`).index(this);
        // 遷移先の列番号を取得する
        let nextColNo = colNo + (e.shiftKey ? -1 : 1);
        // 遷移先の行データを取得する ※　行番号を取得しているのではない。
        let nextRow = e.shiftKey ? $(tr).prev() : $(tr).next();

        // 左上、右下　のフォーカスアウト処理
        if (
          (rowNo === 0 && colNo === 0 && e.shiftKey) ||
          (rowNo === maxRowCount && colNo === maxColCount && !e.shiftKey)
        ) {
          // アクティブな要素からカーソルを外す
          document.activeElement.blur();
          return;
        }
        // 行番変更処理 （nextRow　が存在する場合は、length　が 1　以上の値になる）
        if (nextRow.length) {
          $("input", nextRow[0]).get(colNo).focus();
          return;
        }
        // 列番号変更処理
        if (!nextRow.length && 0 <= nextColNo) {
          //　遷移先の　tr　オブジェクトを取得する
          let nextRt = e.shiftKey
            ? $("tbody tr:last-child")
            : $("tbody tr:first-child");
          $("input", nextRt[0]).get(nextColNo).focus();
          return;
        }
      }
    }
  });
});
