/*Author: Benjamin Wong*/

/*
The MIT License (MIT)

 * Copyright (c) 2015 Benjamin Wong benjamin-w@hotmail.com
 * https://github.com/yben56/final_countdown

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function($){
	$.fn.final_countdown = function(options){	
		//Settings
		var settings = $.extend({
			date: '2020/1/1 00:00:00',
			still: false,
			d: 'Days',
			h: 'Hours',
			m: 'Mins',
			s: 'Sec'
		}, options);
		
		var now, total,
			self = $(this),
			date = settings.date;
				
		//convert string to ymd his
		date = date.split(' ');	
		var y = date[0].split('/')[0];
		var m = date[0].split('/')[1] - 1;
		var d = date[0].split('/')[2];
		
		var h = Number(date[1].split(':')[0]);
		var i = Number(date[1].split(':')[1]);
		var s = Number(date[1].split(':')[2]);
				
		function dhms(){
			//convert to timestamp
			date =  new Date(y, m, d, h, i, s).getTime() / 1000;
			now = new Date().getTime() / 1000;
	
			//convert to dhms
			total = date - now;
			if ( total <= 0 ) { return [0, 0, 0, 0] } 
			
			dd = Math.floor(total / 86400);
			hh = Math.floor(total / 3600) % 24;
			mm = Math.floor(total / 60) % 60;
			ss = Math.floor(total % 60);
			
			return [
				[dd, hh, mm, ss],
				dd + settings.d + ', ' + hh + settings.h + ', ' + mm  + settings.m + ', '+ ss + settings.s
			];
		}
		
		//if not selector, return dhms array
		if ( !self.prop("tagName") ) { return dhms()[0]; }

		//with selector
		if ( settings.still ) {
			$(self).text(dhms()[1]);
		} else {
			setInterval(function(){
				$(self).text(dhms()[1]);
			},1000);
		}
	};
}(jQuery));