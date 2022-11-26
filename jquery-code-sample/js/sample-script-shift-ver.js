$(document).ready(function () {
  $("input[type='text']").keypress(function (e) {
    if (e.which === 13) {
      e.preventDefault();
      let n = $("input[type='text']").length;
      let Index = $("input[type='text']").index(this);
      let nextIndex =
        $("input[type='text']").index(this) + (e.shiftKey ? -1 : 1);
      if (nextIndex < 0 || n <= nextIndex) {
        $("input[type='text']")[Index].blur(); // 最後の要素ではフォーカスを外す
      } else {
        $("input[type='text']")[nextIndex].focus(); // 次の要素へフォーカスを移動
      }
    }
  });
});
