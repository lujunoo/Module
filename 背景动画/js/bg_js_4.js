window.requestAnimationFrame =
				window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
				window.msRequestAnimationFrame;
			var width = window.innerWidth,
				height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
			var count = 60;
			var arr = [];
			var t = 0;
			var ctx = document.getElementById('canvas').getContext('2d');
			window.onload = function() {
				requestAnimationFrame(draw);
			};
			for(var i = 0; i < count; i++) {
				arr[i] = {
					pos: {
						x: ~~rn(0, width),
						y: ~~rn(0, height)
					},
					r: ~~rn(0, 50),
					color: getcolor(),
					speed: rn(.3, 1)
				}
			}

			function draw() {
				ctx.globalCompositeOperation = 'source-over';
				ctx.fillStyle = 'rgba(0,0,0,.1)';
				ctx.fillRect(0, 0, width, height);
				ctx.globalCompositeOperation = 'lighter';
				arr.forEach(function(el) {
					ctx.strokeStyle = el.color;
					if(el.r != 0) {
						ctx.beginPath();
						ctx.arc(el.pos.x, el.pos.y, el.r, 0, 2 * Math.PI);
						ctx.stroke();
					}
					if(el.r >= 50) {
						el.r = 0;
						el.pos = {
							x: ~~rn(0, width),
							y: ~~rn(0, height)
						};
						el.color = getcolor();
						el.speed = rn(.3, 1);
					}
					if(el.r < 50) {
						el.r += el.speed;
					}
				})
				t++;
				requestAnimationFrame(draw);
			}

			function rn(min, max) {
				return Math.random() * (max - min) + min;
			}

			function getcolor() {
				var temp = (rn(0, 1) > .5) ? ~~rn(0, 20) : ~~rn(180, 200);
				return "hsla(" + temp + ",100%,60%,1)";
			}
			window.addEventListener('resize', function() {
				canvas.width = width = window.innerWidth;
				canvas.height = height = window.innerHeight;
			})