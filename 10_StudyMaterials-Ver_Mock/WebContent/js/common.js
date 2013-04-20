$(function(){
	// aタグ無効化対象[href=#]のものを処理
	$(document).on("click", "a[href=#]", function(){
		return false;
	});

	// バルス
	var ballshCmd = "38,38,40,40,37,39,37,39,66,65";
	var keyList = [];

	$(document).on("keydown", function(e){
		keyList.push(e.keyCode);
		if (keyList.toString().indexOf(ballshCmd) >= 0) {
			$(document).off("keydown");
			$("#body").effect("shake", "slow");
			$("body").append("<div id='ballshBg' class='modal-backdrop' style='opacity: 0;'><div style='position: absolute; font-size: 200px; color: #ffffff; top: 50%; left: 50%; margin-left: -300px;'>バルス！</div></div>");

			var colmap = $(".ballsh").map(function(){
				var $this = $(this);
				$this.collapse = function(){
					$this.effect("drop",{ direction: "down" });
				}
				return $this;
			});

			var collapseDur = 500;
			var interval = collapseDur;
			for(var i = colmap.length; i--;){
				var self = colmap[i];
				self.collapse.applyTimeout(interval,self);
				interval+=collapseDur;
			}

			setTimeout(function(){
				$("#ballshBg").animate({
					"opacity": "1"
				}, 3000);
			}, interval);
			interval += 3000;

			setTimeout(function(){
			});

		}
	});
});

/**
 * フォームに対するバリデーション処理をリセット（クリア）
 * @param form $(form)[0] オブジェクト
 * @param validator jQUery Validatorオブジェクト（validate()の戻り値）
 */
function resetForm4Bootstrap(form, validator) {
	validator.resetForm();
	$("div.control-group").removeClass("error");
	$("div.control-group").removeClass("success");
	$("input.valid, textarea.valid").removeClass("valid");
	form.reset();
}

/**
 * twitter bootstrap用 confirmダイアログ表示共通部品
 */
function confirm(heading, question, okCallback) {
	var confirmModal =
	  $('<div class="modal hide fade">' +
			'<div class="modal-header">' +
				'<a class="close" data-dismiss="modal" >&times;</a>' +
				'<h3>' + heading +'</h3>' +
			'</div>' +

			'<div class="modal-body">' +
				'<p>' + question + '</p>' +
			'</div>' +

			'<div class="modal-footer">' +
				'<a href="#" id="okButton" class="btn btn-primary">OK</a>' +
				'<a href="#" class="btn" data-dismiss="modal">CANCEL</a>' +
			'</div>' +
		'</div>');

	confirmModal.find('#okButton').click(function(event) {
		okCallback();
		confirmModal.modal('hide');
	});
	confirmModal.modal('show');
};

/**
 setTimesoutをFunctionのプロトタイプとして拡張する。
 */
Function.prototype.applyTimeout = function (msec, self, args) {
  var fnc = this;
  return setTimeout(
    function () {
      fnc.apply(self, args);
    },
    msec);
};