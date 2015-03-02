(function($, window, document, undefined){

	$.fn.moreButton = function(o){
		var defaults = {
			lineHeight : 16,
			maxLines : 3
		}, opt = $.extend(defaults, o || {});

		return this.each(function(){
			var $p = $('<p />');
			if ($(this).attr('data-more') == 'prev'){
				$p = $(this).prev();
			} else if ($(this).attr('data-more') == 'next'){
				$p = $(this).next();
			} else if ($(this).attr('data-more').substring(0, 1) == '.'){
				$p = $(this).closest($(this).attr('data-more'));
			} else {
				$p = $($(this).attr('data-more'));
			}
			var h = $p.height(), 
				lines = parseInt($(this).attr('data-lines')) || opt.maxLines, 
				lineHeight = parseInt($p.css('line-height')) || opt.lineHeight;

			if (h <= lines * lineHeight) {
				$(this).hide();
				return true;
			}

			$p.height(lines * lineHeight).css('overflow', 'hidden');
			$(this).find('[data-show=true]').show();
			$(this).find('[data-show=false]').hide();

			$(this).on('click', function(){
				var $true = $(this).find('[data-show=true]');
				if ($true.size() && !$true.is(':visible')){
					$p.animate({'height' : lines * lineHeight + 'px'});
					$(this).find('[data-show=true]').show();
					$(this).find('[data-show=false]').hide();
				} else {
					$p.animate({'height' : h + 'px'});
					$(this).find('[data-show=true]').hide();
					$(this).find('[data-show=false]').show();
					if (!$true.size()) $(this).hide();
				}
				return false;
			});
		});
	}

})(jQuery, window, document);