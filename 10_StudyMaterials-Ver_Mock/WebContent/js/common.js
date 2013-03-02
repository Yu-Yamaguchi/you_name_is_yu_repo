$(function(){
	// aタグ無効化対象[href=#]のものを処理
	$(document).on("click", "a[href=#]", function(){
		return false;
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