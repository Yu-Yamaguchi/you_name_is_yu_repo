var flgShowTips = true;

$(function(){
	
	var saveCollectionOfLinks;
	
	$("#link-edit").click(function(){
		saveCollectionOfLinks = $("#sortable").html();
		$("#span-link-edit").hide(100);
		$("#span-link-commit-cancel").show(100);
		$("#sortable").sortable("enable");
		$("<span class='ui-icon ui-icon-arrowthick-2-n-s' style='cursor: move;'></span>").prependTo("#sortable li");
		$("#link-operation-btns").slideDown(400);
		$("#sortable li a").each(function(){
			$(this).attr("data-href", $(this).attr("href"));
			$(this).attr("href", "javascript:void(0);");
		});
	});

	$("#link-commit").click(function(){
		$("#span-link-edit").show(100);
		$("#span-link-commit-cancel").hide(100);
		$("#sortable").sortable("disable");
		$("#sortable li > span").remove();
		$("#link-operation-btns").slideUp(400);
		$("#sortable li a").each(function(){
			$(this).attr("href", $(this).attr("data-href"));
			$(this).removeAttr("data-href");
		});
	});

	$("#link-cancel").click(function(){
		$("<div id='confirm-dialog'>キャンセルします。よろしいですか？</div>").appendTo("body");
		$("#confirm-dialog").dialog({
			title: "キャンセル"
			, resizable: false
			, modal: true
			, buttons: {
				"はい": function() {
					$(this).dialog("close");
					$("#confirm-dialog").remove();
					$("#span-link-edit").show(100);
					$("#span-link-commit-cancel").hide(100);
					$("#sortable").sortable("disable");
					$("#sortable li > span").remove();
					$("#link-operation-btns").slideUp(400);
					
					$("#sortable").html(saveCollectionOfLinks);
					saveCollectionOfLinks = null;
				},
				"キャンセル": function() {
					$(this).dialog("close");
					$("#confirm-dialog").remove();
				}
			}
		});
	});
	
	$("#link-add").click(function(){
        $("#frm-edit-link form")[0].reset();
		$("#frm-edit-link").dialog({
			title: "リンク集の登録"
			, resizable: true
			, modal: true
			, width: 600
			, buttons: {
				"登録": function() {
                    flgShowTips = false;
                    if (!$("#frm-edit-link form").validate().form()) {
                        alert('入力エラー');
                        return;
                    }
					$("<li style='display: none;'><span class='ui-icon ui-icon-arrowthick-2-n-s' style='cursor: move;'></span><a href='" + $("#linkUrl").val() + "' target='_blank'>" + $("#linkTitle").val() + "</a></li>").appendTo("#sortable");
					$(this).dialog("close");
					$("#sortable li:last").slideDown(400);
				},
				"キャンセル": function() {
					$(this).dialog("close");
				}
			}
		});
	});
	
	$("#link-separate-add").click(function(){
		$("<li style='display: none;'><span class='ui-icon ui-icon-arrowthick-2-n-s' style='cursor: move;'></span><div class='separator'></div></li>").appendTo("#sortable");
		$("#sortable li:last").slideDown(400);
	});
    
    $("#frm-edit-link form").validate({
        rules: {
            linkTitle: { required: true }
            , linkUrl: { required: true, url: true }
        }
        , errorElement: "span"
        , highlight: function(element, errorClass) {
            $(element).parents('.control-group').addClass('error');
        }
        , success: function(wrapper) {
            $(wrapper).text('').closest('.control-group').removeClass('error');
            $(wrapper).remove();
        }
        , showErrors: function(errorMap, errorList){
            this.defaultShowErrors(errorMap);
            tips();
        }
        , onfocusout: false
    });
    
    function tips() {
        var $target = $('span[generated="true"] img');
        $target.powerTip({
            mouseOnToPopup: true
            , fadeInTime: 500
            , fadeOutTime: 1000
            , placement: "e"
        });
        // ボタン押下時ではtooltipを自動で表示しない
        if (flgShowTips) {
            $.powerTip.showTip($target);
            $target.data('displayController').hide(true);
        }
        flgShowTips = true;
    }
});
