$(function(){
	// リンク集の編集前の状態を保持するオブジェクト
	var saveCollectionOfLinks;
	
	/**
	 * リンク集の編集リンク押下処理
	 */
	$("#link-edit").on("click", function(){
		saveCollectionOfLinks = $("#sortable").html();
		$("#span-link-edit").hide(100);
		$("#span-link-commit-cancel").show(100);
		$("#sortable").sortable("enable");
		$("<span class='ui-icon ui-icon-arrowthick-2-n-s' style='cursor: move;'></span>").prependTo("#sortable li");
        $("<div class='div-icon-del-edit'><a href='#' class='link-icon-edit'><i class='icon-edit' title='編集'></i></a> <a href='#' class='link-icon-trash'><i class='icon-trash' title='削除'></i></a></div>").appendTo("#sortable li");
        $("#sortable li div.separator + div.div-icon-del-edit .link-icon-edit").addClass("visibleHidden");
		$("#link-operation-btns").slideDown(400);
		$("#sortable li a").each(function(){
			$(this).attr("data-href", $(this).attr("href"));
			$(this).attr("href", "#");
		});
	});
    
    /**
     * リンク集の完了リンク押下処理
     */
	$("#link-commit").on("click", function(){
		$("#span-link-edit").show(100);
		$("#span-link-commit-cancel").hide(100);
		$("#sortable").sortable("disable");
		$("#sortable li > span").remove();
        $("#sortable .div-icon-del-edit").remove();
		$("#link-operation-btns").slideUp(400);
		$("#sortable li a").each(function(){
			$(this).attr("href", $(this).attr("data-href"));
			$(this).removeAttr("data-href");
		});
	});
    
    /**
     * リンク集のキャンセルリンク押下処理
     */
	$("#link-cancel").on("click", function(){
		$("#span-link-edit").show(100);
		$("#span-link-commit-cancel").hide(100);
		$("#sortable").sortable("disable");
		$("#sortable li > span").remove();
		$("#link-operation-btns").slideUp(400);
		
		$("#sortable").html(saveCollectionOfLinks);
		saveCollectionOfLinks = null;
	});
    
	/**
	 * リンク集の『区切りの追加』押下処理
	 */
	$("#link-separate-add").on("click", function(){
		// セパレーターのテンプレートをクローンして追加処理を行う
		$("<li style='display: none;'></li>").wrapInner($("#linkSeparatorTemplate").children().clone(true)).appendTo("#sortable");
		$("#sortable li:last").slideDown(400);
	});
    
	/**
	 * リンク集の編集処理（鉛筆アイコン押下時）
	 * ** jQuery1.7より「live()」は非推奨となり、1.9から仕様不可となったようで、
	 * ** live()の部分をon()に書き換えています。
	 */
    $(document).on("click", ".link-icon-edit", function(event){
    	// TODO:[山口] 編集はまだ未実装
    });
    
    /**
     * リンク集の削除処理（ゴミ箱アイコン押下時）
     */
    $(document).on("click", ".link-icon-trash", function(event){
    	var $target = $(this).closest("li");
        $target.slideUp(
            250
            , function(){
                $target.remove();
            });
    });

    /**
     * リンクの登録画面 登録ボタン押下時のイベント
     */
	$("#btn-reg").on("click", function(){
		if ($("#frm-edit-link form").valid()) {
			// リンクのテンプレートをセット
			var $template = $("<li style='display: none;'></li>").wrapInner($("#linkTemplate").children().clone(true));
			
			// リンクの値をセット
			$template.find("div.linkItem a").attr("data-href", $("#linkUrl").val()).text($("#linkTitle").val());
			
			// 一覧に追加
			$template.appendTo("#sortable");
			
			// アニメーションで追加処理を明示
			$("#frm-edit-link").modal("hide");
			$("#sortable li:last").slideDown(400);
			
			resetForm4Bootstrap($("#frm-edit-link form")[0], validator);
		}
	});
	
	/**
	 * リンクの登録画面 キャンセルボタン押下時のイベント
	 */
	$("#frm-edit-link #btn-cancel").on("click", function(){
		$("#frm-edit-link").modal("hide");
		resetForm4Bootstrap($("#frm-edit-link form")[0], validator);
	});
	
	/**
	 * リンク登録画面表示中の黒い背景エリア押下時のイベント
	 */
	$(document).on("click", "div.modal-backdrop", function(){
		resetForm4Bootstrap($("#frm-edit-link form")[0], validator);
	});
	
	/**
	 * リンク登録・編集画面のバリデーション
	 */
    var validator = $("#frm-edit-link form").validate({
        rules: {
            linkTitle: {
    			maxlength: 30
    			, required: true
    		}
            , linkUrl: {
            	maxlength: 2048
            	, url: true
            	, required: true
            }
        }
	    , highlight: function(element) {
			$(element).closest('.control-group').removeClass('success').addClass('error');
		}
		, success: function(element) {
			element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
		}
    });
});