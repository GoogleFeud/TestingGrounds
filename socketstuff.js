//Variable to track connection
connection = false;
//Players on list
var users = [];
//Mod
var mod = false;
var paused = false;
var currentphase = undefined;
var daynumber = 1;
//Connect attempts
var connectAttempt = 0;
var kicked = false;
//Notify sound
var hey = new Audio('6ballStart.mp3');
//Halloween
//var hey = new Audio('Giratina.wav');
var mpregame = new Audio('Alfheim.mp3');
var whoami = new Audio('Cascades.mp3');
var mmodtime = new Audio('Valkyrie.mp3');
//Halloween
//var mmodtime = new Audio('Bewitching.mp3');
var mdaytime = new Audio('Piglets.mp3');
var mvoting = new Audio('Deceitful.mp3');
var mtrial = new Audio('Truth.mp3');
var mnight = new Audio('Chaos.mp3');
var musicon = 1;
mpregame.loop = true;
whoami.loop = true;
mdaytime.loop = true;
mnight.loop = true;
mmodtime.loop = true;
function clearAllInfo()
{
	var all = $('.controlbutton');
	for (var i=0; i<all.length;i++)
	{
		var classes = all[i].className.split(' ');
		for (x in classes)
		{
			if (classes[x].indexOf('buttondown') != -1)
			{
				classes[x] = '';
			}
		}
		all[i].className = classes.join(' ');
	}
}
function modInterface()
{
	//Add play/pause button to the clock
	if ($('#clock').length > 0)
	{
		addPauseButton(currentphase);
	}
	addModControls();
	for (x = 0; x < users.length; x++)
	{
		var li = $("<li></li>");
		var num = (x==0)?'MOD':x;
		if ($($('#userlist li')[x]).find('.dev').length)
		{
			var name = '<span class="name dev">'+users[x]+'</span>';
		}
		else
		{
			var name = '<span class="name">'+users[x]+'</span>';
		}
		var info = $(`<div class="info" id="p-${users[x]}"><span class="num">${num}</span>${name}</div>`);
		$('#userlist li')[x].innerHTML='';
		$($('#userlist li')[x]).removeClass('deadplayer');
		//Add in a rolelist button if it is does not already exist
		if ($('#rolelistbutton').length == 0)
		{
			var rlbutton = $('<div id="rolelistbutton"></div>');
			rlbutton.click(function()
			{
				openRolelist();
			});
			$('#inputarea').append(rlbutton);
		}
		//Add in an automod settings button if it doesn't exist
		if ($('#automodsettingsbutton').length == 0)
		{
			var ambutton = $('<div id="automodsettingsbutton"></div>');
			ambutton.click(function()
			{
				autoModSettings();
			});
			$('#inputarea').append(ambutton);
		}
		//Addition to the top row
		var kill = $('<div class="controlbutton killbutton"><span>Kill</span></div>');
		kill.click(function()
		{
			var index = $('.killbutton, .revivebutton').index($(this))
			socket.sendMessage(Type.TOGGLELIVING,users[index],!$(this).hasClass('killbutton'));
		});
		var jail= $('<div class="controlbutton jailbutton"><span>Jail</span></div>');
		jail.click(function()
		{
			var index = $('.jailbutton, .releasebutton').index($(this))
			socket.sendMessage(Type.TOGGLE,users[index],'jailed',$(this).hasClass('jailbutton'));
		});
		var will = $('<div class="controlbutton modwillbutton"><span>W</span></div>');
		var more = $('<div class="controlbutton more"></div>');
		var arrow = $('<span class="downarrow"></span>');
		more.append(arrow);
		more.click(function(e)
		{
			openModList(e.target);
		});
		will.click(function(e)
		{
			openUserWill(e.target);
		});

		info.append(more);
		info.append(will);
		info.append(jail);
		info.append(kill);

		//Adding bottom row
		var modcontrols = $('<div class="modcontrols"></div>');
		var rolechanger = $('<input type="text" class="role"></li>');
		rolechanger.keydown(function(e)
		{
			if (e.keyCode==13) //Enter
			{
				var index = $('.role').index($(this));
				var name = $('.name')[index].innerHTML;
				socket.sendMessage(Type.SETROLE,name,this.value);
				this.style.background='teal';
				this.old = this.value;
			}
		});
		rolechanger.keyup(function(e){
			if (this.old != this.value)
			{
				this.style.background='white';
			}
			else
			{
				this.style.background='teal';
			}
		});
		modcontrols.append(rolechanger);
		var entangle= $('<div class="controlbutton entanglebutton"><span>Entangle</span></div>');
		entangle.click(function()
		{
			var index = $('.entanglebutton, .disentanglebutton').index($(this))
			socket.sendMessage(Type.TOGGLE,users[index],'entangled',$(this).hasClass('entanglebutton'));
		});

		modcontrols.append(entangle);
		$($('#userlist li')[x]).append(info);
		$($('#userlist li')[x]).append(modcontrols);
	}
	$('.name').addClass('shorten');
}
var urlParams = new URLSearchParams(window.location.search);
var player_name = urlParams.get("name");
if(!player_name) window.location = '/';
var listeners = {};
function addSocketListener(type, callback)
{
	listeners[type] = callback;
}
var socket;
function connectSocket(reconnecting)
{
	var protocol = (window.location.protocol === 'https:') ? 'wss:' : 'ws:';
	socket = new WebSocket(protocol+'//'+window.location.host+'/');
	socket.addEventListener('open', function()
	{
		socket.sendMessage(Type.JOIN, player_name, reconnecting);
	});
	socket.addEventListener('close',function()
	{
		kittyReconnect();
	});
	socket.addEventListener('message', function(event)
	{
		var [type, ...args] = JSON.parse(event.data);
		var display = msgToHTML(type, args);
		if(display) {
			addMessage(display);
		}
		if(listeners[type]) {
			listeners[type].apply(socket, args);
		}
	});
	socket.sendMessage = function()
	{
		this.send(JSON.stringify(Array.prototype.slice.call(arguments)));
	}
}
connectSocket();
addSocketListener(Type.HELP,function(commands)
{
	var helpmsgs = [
		"The Mod does not bite, they are only killing people.",
		"The Mod can make mistakes, if you believe there has been a mod error, message them using /mod.",
		"Please keep your last will closed during Modtime.",
		"You can tell the mod what you would like to do at night using /mod or /target",
		"Be patient as Modtime can last for a while, depending on the player number and roles in play.",
	];
	var tldrchanges = [
		"None at the moment lol.",
	];
	var controls = $("<div class='helppanel shrink aChanges' id='helpListPanel'></div>");
	var controldetails = [
		'You can kill or jail a player using the bigger buttons.',
		'Assign a player a role manually using the textbox under their name.',
		'You have access to a player\'s will using the W button. Use this to forge or clean a will.',
		'The white button labelled with a V allows you to send preset messages to a player. You can also access the modifiers and actions here.'
	];
	for (i in controldetails)
	{
		controls.append('<li>'+controldetails[i]+'</li>');
	}
	var controlslink = $("<a href='#'>As the mod, you have control over every player.</a>");
	var rlinfolink= $("<a href='#'>You can access the rolelist using the button to the right of the chatbox.</a>");
	var rlinfo = [
		"You can edit each entry in the rolelist using the pencil button to the right of each role.",
		"The button with a dice will roll a role for all players.",
		"The green ticlk will assign the roles to each player.",
		"Show List will show the rolelist to all of the players in the game. It is recommended that you use this before starting.",
		"Show Roles will show the roles of all players. It is recommended that you use this after the game is over.",
		"'Custom roles' allows you to toggle the rolling of non-standard roles. When unchecked, only roles actually in the game will roll.",
		"The Autolist button sets the rolelist to the recommended list for that amount of players."
	];
	var rlpanel = $("<div class='helppanel shrink aChanges' id='helpListPanel'></div>");
	for (i in rlinfo)
	{
		rlpanel.append('<li>'+rlinfo[i]+'</li>');
	}
	rlinfolink.click(function(){
		showPanel(rlpanel);
	});
	controlslink.click(function(){
		showPanel(controls);
	});
	var modhelp = [
		"The following information is only neccessary if you are planning to mod a Testing Grounds game.",
		"If you are using manual mode, have a separate file open to take note of night actions and results to check if you have given everyone their feedback.",
		controlslink,
		controls,
		rlinfolink,
		rlpanel,
		'Each game begins with a "Roles" phase. In this phase you distribute the roles, set the modifiers and wait for everyone to confirm their role.',
		'You may need to tell them about the /confirm command, if there are new players present.',
		'After everyone has confirmed, select Day 1 to start the game.',
		'Phases will end in Modtime, where it is your call to perform the actions before setting the phase to Day/Night.',
	];
	var changespan = $("<div class='helppanel shrink aChanges' id='helpListPanel'></div>");
	for (i in tldrchanges)
	{
		changespan.append('<li>'+tldrchanges[i]+'</li>');
	}
	var abridgedChanges = $('<a href="#" class="backline">Or see the tldr version.</a>');
	abridgedChanges.click(function(){
		showPanel(changespan);
	});
	//Help
	var helpmsg = "";
	for (i in helpmsgs)
	{
		helpmsg += '<li>'+helpmsgs[i]+"</li>";
	}
	var com = $("<div class='helppanel shrink helpPanel' id='helpListPanel'>"+helpmsg+"</div>");
	com.prepend(changespan);
	com.prepend(abridgedChanges);
	com.prepend("<li>Read the standard changes of the Testing Grounds <a target='_blank' href='https://docs.google.com/document/d/1d_a-R-lhKQpQe_fYD3XyBnCx4WQETI9GokBjscB96mk/edit'>here</a>.</li>");
	var com2 = $("<div class='helppanel shrink' id='modListPanel'></div>");
	for ( i in modhelp)
	{
		var li = $('<li></li>');
		li.append(modhelp[i]);
		com2.append(li);
	}
	var com3 = $("<div class='helppanel shrink' id='commandListPanel'></div>");
	var txt1 = $('<a href="#">General help</a>');
	var txt2 = $('<a href="#">Modding help</a>');
	var txt3 = $('<a href="#">List of commands</a>');
	//Command list.
	for (i in commands)
	{
		var f = i[0].toUpperCase() + i.substring(1,i.length);
		com3.append($('<li class="commandheader"><b>'+f+'</b></li>'));
		for (j in commands[i])
		{
			com3.append($('<li><b>/'+j+': </b>'+commands[i][j]+'</li>'));
		}
	}
	txt1.click(function(){
		showPanel(com);
	});
	txt2.click(function(){
		showPanel(com2);
	});
	txt3.click(function(){
		showPanel(com3);
	});
	[txt1,com,txt2,com2,txt3,com3].map(function(msg) {
		var li = $('<li></li>');
		li.append(msg);
		addMessage(li);
	});
});
addSocketListener(Type.PING,function()
{
	socket.sendMessage(Type.PONG);
});
addSocketListener(Type.HEY,function(){
	hey.play();
});
addSocketListener(Type.JOIN,function(name)
{
	users.push(name);
	var num = $('#userlist').children().length;
	if (num==0)
	{
		num='MOD';
		//Player is first. They are mod.
		mod=true;
		//Add in a rolelist button if it is does not already exist
		if ($('#rolelistbutton').length == 0)
		{
			var rlbutton = $('<div id="rolelistbutton"></div>');
			rlbutton.click(function()
			{
				openRolelist();
			});
			$('#inputarea').append(rlbutton);
		}
		//Add in an automod settings button if it doesn't exist
		if ($('#automodsettingsbutton').length == 0)
		{
			var ambutton = $('<div id="automodsettingsbutton"></div>');
			ambutton.click(function()
			{
				autoModSettings();
			});
			$('#inputarea').append(ambutton);
		}
		addModControls();
	}
	//Top row, normal users.
	var li = $('<li></li>');
	var info = $(`<div class="info" id="p-${name}"></div>`);
	var name = $('<span class="name">'+name+'</span>');
	var num = $('<span class="num">'+num+'</span>');
	info.append(num);
	info.append(name);
	//Bottom row
	if (mod)
	{
		//Addition to the top row
		var kill = $('<div class="controlbutton killbutton"><span>Kill</span></div>');
		kill.click(function()
		{
			var index = $('.killbutton, .revivebutton').index($(this))
			socket.sendMessage(Type.TOGGLELIVING,users[index],!$(this).hasClass('killbutton'));
		});
		var jail= $('<div class="controlbutton jailbutton"><span>Jail</span></div>');
		jail.click(function()
		{
			var index = $('.jailbutton, .releasebutton').index($(this))
			socket.sendMessage(Type.TOGGLE,users[index],'jailed',$(this).hasClass('jailbutton'));
		});
		var will = $('<div class="controlbutton modwillbutton"><span>W</span></div>');
		var more = $('<div class="controlbutton more"><span class="downarrow"></span></div>');
		more.click(function(e)
		{
			openModList(e.target);
		});
		will.click(function(e)
		{
			openUserWill(e.target);
		});
		info.append(more);
		info.append(will);
		info.append(jail);
		info.append(kill);
		//Adding bottom row
		var modcontrols = $('<div class="modcontrols"></div>');
		var rolechanger = $('<input type="text" class="role"></li>');
		rolechanger.keydown(function(e)
		{
				if (e.keyCode==13) //Enter
				{
					var index = $('.role').index($(this));
					var name = $('.name')[index].innerHTML;
					socket.sendMessage(Type.SETROLE,name,this.value);
					this.style.background='teal';
					this.old = this.value;
				}
		});
		rolechanger.keyup(function(e){
			if (this.old != this.value)
			{
				this.style.background='white';
			}
			else
			{
				this.style.background='teal';
			}
		});
		modcontrols.append(rolechanger);
		var entangle= $('<div class="controlbutton entanglebutton"><span>Entangle</span></div>');
		entangle.click(function()
		{
			var index = $('.entanglebutton, .disentanglebutton').index($(this))
			socket.sendMessage(Type.TOGGLE,users[index],'entangled',$(this).hasClass('entanglebutton'));
		});

		modcontrols.append(entangle);
	}
	li.append(info);
	if (mod) {
		li.append(modcontrols);
	}
	$('#userlist').append(li);
	if (mod)
	{
		$('.name').addClass('shorten');
	}
});
addSocketListener(Type.LEAVE,function(name)
{
	var index = users.indexOf(name);
	$($('#userlist').children()[index]).remove();
	//Recalculate the numbering.
	var nums = $('.num');
	for (var i = index; i < nums.length; i++ )
	{
		if (i!=0)
		{
			nums[i].innerHTML=''+i;
		}
		else
		{
			nums[i].innerHTML='MOD';
		}
	}
	//Remove from list
	users.splice(index,1);
});
addSocketListener(Type.DISCONNECT,function(name)
{
	$(`#p-${name}`).append(`<span class="emoji" id="${name}-disconnected">🚫</span>`);
});
addSocketListener(Type.RECONNECT,function(name)
{
	$(`#${name}-disconnected`).remove();
});
addSocketListener(Type.SETROLE,function(role)
{
	if(!mod)
	{
		var li = $(`#p-${player_name}`).closest('li');
		li.find('.roledisplay').remove();
		var role_safe = sanitize(role.role);
		li.append(`<div class="roledisplay"><span style="color: ${role.rolecolor}">${role_safe}</span></div>`);
	}
});
addSocketListener(Type.SETMOD,function(val)
{
	if (val && !mod)
	{
		mod = true;
		modInterface();
	}
	else if (mod && !val)
	{
		$('.pausebutton, .playbutton').remove();
		$('#modnumbering').empty();
		mod = false;
		var buttons = $('.killbutton, .revivebutton');
		var roles = $('.role');
		for (i = 0; i < users.length; i++)
		{
			var num = i==0?'MOD':i;
			if ($($('#userlist li')[i]).find('.dev').length)
			{
				var name ='<span class="name dev">'+users[i]+'</span>';
			}
			else
			{
				var name ='<span class="name">'+users[i]+'</span>';
			}
			if ($(buttons[i]).hasClass('killbutton'))
			{
				//Top row, normal users.
				var info = $(`<div class="info" id="p-${users[i]}"><span class="num">${num}</span>${name}</div>`);
			}
			else
			{
				var role = roles[i].value==''?'NoRole':roles[i].value;
				var info = $(`<div class="info" id="${users[i]}"><span class="num">${num}</span><span class="name">${name}</span></div><div>${role}</div>`);
				$($('#userlist li')[i]).addClass('deadplayer');
			}
			$('#userlist li')[i].innerHTML='';
			$($('#userlist li')[i]).append(info);

		}
		if ($('#rolelist').length != 0)
		{
			$('#rolelist').remove();
		}
		if ($('#rolelistbutton').length != 0)
		{
			$('#rolelistbutton').remove();
		}
		if ($('#automodsettingsbutton').length != 0)
		{
			$('#automodsettingsbutton').remove();
		}
		$('.name').removeClass('shorten');
	}
});
addSocketListener(Type.ROOMLIST,function(list)
{
	if (!mod)
	{
		users = [];
		$('#userlist').empty();
		for (i in list)
		{
			var num = (i==0)?'MOD':i; //Num is MOD if i is 0, otherwise num is equal to i.
			if (list[i].role)
			{
				//Player is dead.
				var role_safe = sanitize(list[i].role);
				$('#userlist').append(`<li class="deadplayer"><div class="info" id="p-${list[i].name}"><span class="num">${num}</span><span class="name">${list[i].name}</span></div><div class="roledisplay"><span style="color: ${list[i].rolecolor}">${role_safe}</span></div></li>`);
				if(list[i].haswill) {
					$(`#p-${list[i].name}`).append(`<span class="emoji" id="${list[i].name}-will">📜</span>`);
					$(`#${list[i].name}-will`).click((e) => {
						openUserWill(e.target);
					});
				}
			}
			else
			{
				$('#userlist').append(`<li><div class="info" id="p-${list[i].name}"><span class="num">${num}</span><span class="name">${list[i].name}</span></div></li>`);
			}
			if(list[i].spectate)
			{
				$($('#userlist').children()[i]).addClass('spectator');
			}
			if(list[i].dev)
			{
				$($('#userlist').children()[i]).find('.name').addClass('dev');
			}

			users.push(list[i].name);
		}
	}
	else
	{
		var user_names = {};
		$('#userlist').children().each((i,el)=>user_names[users[i]] = el);
		users = [];
		for(i in list)
		{
			if(user_names[list[i].name])
			{
				$(user_names[list[i].name]).find('.num').text(+i || 'MOD');
				$('#userlist').append(user_names[list[i].name]);
				delete user_names[list[i].name];
				users.push(list[i].name);
			}
			else
			{
				listeners[Type.JOIN](list[i].name);
			}
			if(list[i].spectate)
			{
				$($('#userlist').children()[i]).addClass('spectator');
			}
			else
			{
				$($('#userlist').children()[i]).removeClass('spectator');
			}
			if(list[i].dev)
			{
				$($('#userlist').children()[i]).find('.name').addClass('dev');
			}
		}
		for(i in user_names)
		{
			$(user_names[i]).remove();
		}
	}
});
addSocketListener(Type.TOGGLELIVING,function(p)
{
	if (!mod)
	{
		var index = users.indexOf(p.name);
		var li = $($('#userlist').children()[index]);
		index = index==0?'MOD':index;
		if (p.hasOwnProperty('role'))
		{
			var role_safe = sanitize(p.role);
			li.addClass('deadplayer');
			li.find('.roledisplay').remove();
			li.append(`<div class="roledisplay"><span style="color: ${p.rolecolor}">${role_safe}</span></div>`);
			if(p.haswill) {
				$(`#p-${p.name}`).append(`<span class="emoji" id="${p.name}-will">📜</span>`);
				$(`#${p.name}-will`).click(() => {
					openUserWill($(`#p-${p.name}`));
				});
			}
		}
		else
		{
			li.removeClass('deadplayer');
			if(p.name != player_name) {
				li.find('.roledisplay').remove();
			}
			li.find(`#${p.name}-will`).remove();
		}
	}
	else
	{
		var index = users.indexOf(p.name);
		var li = $($('#userlist').children()[index]);
		var button = li.find('.killbutton, .revivebutton');
		if (p.hasOwnProperty('role'))
		{
			button.removeClass('killbutton');
			button.addClass('revivebutton');
			button.html('<span>Revive</span>');
		}
		else
		{
			button.removeClass('revivebutton');
			button.addClass('killbutton');
			button.html('<span>Kill</span>');
		}
	}
});
addSocketListener(Type.KICK,function()
{
	kicked = true;
});
addSocketListener(Type.DENY,function(reason){
	addMessage('<li><b>'+reason+'</b></li>');
	kicked = true;
});
addSocketListener(Type.SETDAYNUMBER,function(num){
	daynumber = num;
	$('#dayli').html('Day '+num);
	if (num % 2 == 0)
	{
		$('#nightli').html('Night '+num+'<div class="moonimg" />');
	}
	else
	{
		$('#nightli').html('Night '+num);
	}

});
addSocketListener(Type.SETPHASE,function(phase,silent,time)
{
	currentphase = phase;
	if (phase == 0)
{
	if (musicon == 1)
	{
	mpregame.currentTime = 0;
	mpregame.volume = 1;
	}
}
else
{
	mpregame.volume = 0;
}
	if (phase == 1)
	{
		whoami.play();
		whoami.currentTime = 0;
		if (musicon == 1)
		{
		whoami.volume = 1;
		}
	}
	else
	{
		whoami.volume = 0;
	}
	if (phase == 2)
	{
		if (musicon == 1)
	{
		mmodtime.currentTime = 0;
		mmodtime.volume = 1;
	}
	}
	else
	{
		mmodtime.volume = 0;
	}
	if (phase == 3 || phase == 9)
	{
		mdaytime.play();
		mdaytime.currentTime = 0;
		if (musicon == 1)
		{
		mdaytime.volume = 1;
		}
	}
	else
	{
		mdaytime.volume = 0;
	}
	if (phase == 4)
	{
		mvoting.play();
		mvoting.currentTime = 0;
		if (musicon == 1)
		{
		mvoting.volume = 1;
		}
	}
	else
	{
		mvoting.volume = 0;
	}
	if (phase >= 5 && phase <= 7)
	{
		if (phase == 5)
		{
		mtrial.play();
		mtrial.currentTime = 0;
		if (musicon == 1)
		{
		mtrial.volume = 1;
		}
		}
	}
	else
	{
		mtrial.volume = 0;
	}
	if (phase == 8)
	{
		mnight.play();
		mnight.currentTime = 0;
		if (musicon == 1)
		{
		mnight.volume = 1;
		}
	}
	else
	{
		mnight.volume = 0;
	}
	//Remove any remaining voting interfaces
	$('.votinginterface').remove();
	//Remove any remaining night interfaces
	$('.nightinterface').remove();
	//Remove any remaining verdict interfaces
	$('.verdictinterface').remove();
	$('header ul li').removeClass('current');
	$($('header ul li')[phase]).addClass('current');
	$('#clock').remove();
	$('.pausebutton, .playbutton').remove();
	//Move the clock.
	if (time > 0)
	{
		$($('header ul li')[phase]).append('<div id="clock">'+time+'</div>');
		if (mod)
		{
			addPauseButton(phase);
		}
	}
	if (phase == 4 && !mod) //Voting
	{
		//Add the voting interface
		for (i = 1; i < users.length; i++)
		{
			if (!$($('#userlist li')[i]).is('.deadplayer, .spectator'))
			{
				var li = $('#userlist').children()[i];
				var votinginterface = $('<div class="votinginterface"></div>');
				if(users[i] !== player_name && !$($('#userlist li')[i]).find('.angel').length && !$(`#p-${player_name}`).closest('li').is('.deadplayer, .spectator')) {
					var button = $('<div class="votebutton">Vote</div>');
					button.click(function()
					{
						var index = $('#userlist li').index(this.parentNode.parentNode.parentNode);
						var name = users[index];
						socket.sendMessage(Type.VOTE,name);
					});
					votinginterface.append(button);
				}
				var count = $('<div class="votecount">0</div>');
				votinginterface.append(count);
				$($(li).children()[0]).append(votinginterface);
			}
		}
	}
	if (phase == 6 && !mod && !$(`#p-${player_name}`).closest('li').is('.deadplayer, .spectator')) //Verdicts, guilty/inno/abstain
	{
		//Add verdict interface
		var verdict = $('<div class="verdictinterface"></div>');
		var guilty = $('<div class="verdictbutton guiltybutton"></div>');
		guilty.click(function()
		{
			socket.sendMessage(Type.VERDICT,false); //false for guilty
		});
		var inno = $('<div class="verdictbutton innobutton"></div>');
		inno.click(function()
		{
			socket.sendMessage(Type.VERDICT,true); //true for inno
		});

		verdict.append(guilty);
		verdict.append(inno);
		$('#main').append(verdict);
	}

	//Initially start all songs.
			mpregame.play();
			whoami.play();
			mmodtime.play();
			mdaytime.play();
			mvoting.play();
			mtrial.play();
			mnight.play();

});
addSocketListener(Type.TARGETING_OPTIONS,function(legal_targets,current_targets) {
	$('.nightinterface').remove();
	if(mod) {
		// The mod cannot target
		return;
	}
	if(!legal_targets.length || !legal_targets[0].length) {
		// No legal targets
		return;
	}
	var n, i;
	var targets_chosen = legal_targets.map(()=>'');
	for(n = legal_targets.length-1; n >= 0; n--) {
		targetlist = legal_targets[n];
		//Add the night buttons
		for (i = 1; i < users.length; i++)
		{
			var name = users[i];
			var player_el = $(`#p-${name}`);
			var nightinterface = $('<div class="nightinterface"></div>');
			if(targetlist.includes(users[i])) {
				var button = $('<div class="nightbutton">Target</div>');
				button.data('target-name', name);
				button.data('target-num', n);
				if(current_targets && current_targets[n] == name) {
					targets_chosen[n] = name;
					button.addClass('pressed');
				}
				button.click(function()
				{
					var n = $(this).data('target-num');
					var name = $(this).data('target-name');
					if($(this).hasClass('pressed')) {
						targets_chosen[n] = '';
						$(this).removeClass('pressed');
					} else {
						if(targets_chosen[n]) {
							$('#p-'+targets_chosen[n]).find('.nightbutton').filter((i,a)=>$(a).data('target-num') == n).removeClass('pressed');
						}
						targets_chosen[n] = name;
						$(this).addClass('pressed');
					}
					socket.sendMessage(Type.TARGET, targets_chosen.filter(a=>a).join(' ') || '0');
				});
				nightinterface.append(button);
			}
			player_el.append(nightinterface);
		}
	}
});
addSocketListener(Type.SWITCH,function(name1,name2)
{
	var i1=users.indexOf(name1);
	var i2=users.indexOf(name2);
	users[i1] = name2;
	users[i2] = name1;
	//Swap li's
	var a = $($('#userlist li')[i1]);
	var b = $($('#userlist li')[i2]);
	//Swap list items
	b.before(a);
	$('#userlist li:first-child').before(b);
	//Swap numbers
	$('.num')[i1].innerHTML = (i1==0)?'MOD':i1;
	$('.num')[i2].innerHTML = (i2==0)?'MOD':i2;
});
addSocketListener(Type.TOGGLE, function(to, chat, state) {
	if(!mod)
		return;

	var li = $(`#p-${to}`).closest('li');
	switch(chat) {
	case 'jailed':
		var button = li.find('.jailbutton, .releasebutton');
		if (state)
		{
			button.removeClass('jailbutton');
			button.addClass('releasebutton');
			button.html('<span>Release</span>');
		}
		else
		{
			button.removeClass('releasebutton');
			button.addClass('jailbutton');
			button.html('<span>Jail</span>');
		}
		break;
	case 'entangled':
		var button = li.find('.entanglebutton, .disentanglebutton');
		if (state)
		{
			button.removeClass('entanglebutton');
			button.addClass('disentanglebutton');
			button.html('<span>Disentangle</span>');
		}
		else
		{
			button.removeClass('disentanglebutton');
			button.addClass('entanglebutton');
			button.html('<span>Entangle</span>');
		}
		break;
	case 'douse':
		if(state) {
			$(`#p-${to}`).append(`<span class="emoji" id="${to}-fire">🔥</span>`);
			$(`#${to}-fire`).click(() => {
				if (mod) {
				    socket.sendMessage(Type.TOGGLE, to, 'douse', false);
				}
			});
		} else {
			$(`#${to}-fire`).remove();
		}
		break;
	default:
		var controlbutton = li.find('.controlbutton');
		if (state)
		{
			controlbutton.addClass(chat+'buttondown');
		}
		else
		{
			controlbutton.removeClass(chat+'buttondown');
		}
	}
});
addSocketListener(Type.MAYOR, function(name) {
	$(`#p-${name}`).append(`<span class="emoji" id="${name}-mayor" style="color:#7fff00">(Mayor)</span>`)
	$(`#${name}-mayor`).click(() => {
		if (mod) {
			$(`#${name}-mayor`).remove();
			socket.sendMessage(Type.REMOVE_EMOJI, `${name}-mayor`);
		}
	});
});
addSocketListener(Type.GARDENIA, function(name) {
	$(`#p-${name}`).append(`<span class="emoji" id="${name}-gardenia" style="color:#228f41">(Gardenia)</span>`)
	$(`#${name}-gardenia`).click(() => {
		if (mod) {
			$(`#${name}-gardenia`).remove();
			socket.sendMessage(Type.REMOVE_EMOJI, `${name}-gardenia`);
		}
	});
});
addSocketListener(Type.VOTE,function(voter,msg,voted,prev,power)
{
	if (!mod)
	{
		if (prev)
		{
			var index = users.indexOf(prev);
			var li =$('#userlist li')[index];
			if (li.childNodes[0].childNodes[2])
			{
				var count = li.querySelector('.votecount');
				var num = parseInt(count.innerHTML);
				num -= power;
				count.innerHTML=num;
			}
		}
		if (voted)
		{
			var index = users.indexOf(voted);
			var li =$('#userlist li')[index];
			var count = li.querySelector('.votecount');
			var num = parseInt(count.innerHTML);
			num += power;
			count.innerHTML=num;
		}
	}
});
addSocketListener(Type.CLEARVOTES,function()
{
	$('.votecount').html('0');
});
addSocketListener(Type.PAUSEPHASE,function(p){
		paused = p;
});
addSocketListener(Type.GUARDIAN_ANGEL, function(name, yourName) {
	if ($(`#${name}-angel`).length) return;
	$(`#p-${name}`).append(`<span class="emoji angel" id="${name}-angel" style="color:#FFFFFF">👼</span>`);
	$(`#${name}-angel`).click(() => {
		if (mod) {
			$(`#${name}-angel`).remove();
			socket.sendMessage(Type.REMOVE_EMOJI, `${name}-angel`);
		}
	});
});
addSocketListener(Type.PHLOX, function(name, yourName) {
	if ($(`#${name}-phlox`).length) return;
	$(`#p-${name}`).append(`<span class="emoji phlox" id="${name}-phlox" style="color:#df00ff">🌺</span>`);
	$(`#${name}-phlox`).click(() => {
		if (mod) {
			$(`#${name}-phlox`).remove();
			socket.sendMessage(Type.REMOVE_EMOJI, `${name}-phlox`);
		}
	});
});

addSocketListener(Type.REMOVE_EMOJI, function(emojiId) {
	$(`#${emojiId}`).remove();
});

addSocketListener(Type.TICK,function(time)
{
	$('#clock').html(time);
});
addSocketListener(Type.SETDEV,function(name)
{
	var index = users.indexOf(name);
	$($('.name')[index]).addClass('dev');
});
addSocketListener(Type.SETSPEC, function (name) {
	var index = users.indexOf(name);
	$($('#userlist').children()[index]).addClass('spectator');
});
addSocketListener(Type.REMSPEC, function (name) {
	var index = users.indexOf(name);
	$($('#userlist').children()[index]).removeClass('spectator');
});
addSocketListener(Type.ROLEUPDATE,function(send){
	var index = users.indexOf(send.name);
	for (i in send)
	{
		if (send[i])
		{
			$($('.controlbutton.more')[index]).addClass(i+'buttondown');
		}
	}
	if (send.role)
	{
		$($('.role')[index]).val(send.role);
		$('.role')[index].style.background = 'teal';
	}
	if (!send.alive)
	{
		var button = $($('.killbutton')[index]);
		button.removeClass('killbutton');
		button.addClass('revivebutton');
		button.html('<span>Revive</span>');
	}
	if (send.jailed)
	{
		var button = $($('.jailbutton')[index]);
		button.removeClass('jailbutton');
		button.addClass('releasebutton');
		button.html('<span>Release</span>');
	}
	if (send.entangled)
	{
		var button = $($('.entanglebutton')[index]);
		button.removeClass('entanglebutton');
		button.addClass('disentanglebutton');
		button.html('<span>Disentangle</span>');
	}
});
addSocketListener(Type.MASSROLEUPDATE,function(people){
	if (mod)
	{
		clearAllInfo();
		for (j in people)
		{
			var send = people[j];
			var index = users.indexOf(send.name);
			for (i in send)
			{
				if (send[i])
				{
					$($('.controlbutton.more')[index]).addClass(i+'buttondown');
				}
			}
			if (send.hasOwnProperty('role'))
			{
				$($('.role')[index]).val(send.role);
				$('.role')[index].style.background = 'teal';
			}
			if (send.alive)
			{
				var button = $($('.killbutton, .revivebutton')[index]);
				button.addClass('killbutton');
				button.removeClass('revivebutton');
				button.html('<span>Kill</span>');
			}
			else
			{
				var button = $($('.killbutton, .revivebutton')[index]);
				button.addClass('revivebutton');
				button.removeClass('killbutton');
				button.html('<span>Revive</span>');
			}
			if (send.jailed)
			{
				var button = $($('.jailbutton')[index]);
				button.addClass('releasebutton');
				button.removeClass('jailbutton');
				button.html('<span>Release</span>');
			}
			if (send.entangled)
			{
				var button = $($('.entanglebutton')[index]);
				button.addClass('disentanglebutton');
				button.removeClass('entanglebutton');
				button.html('<span>Disentangle</span>');
			}
			else
			{
				var button = $($('.releasebutton')[index]);
				button.addClass('jailbutton');
				button.removeClass('releasebutton');
				button.html('<span>Jail</span>');
			}
		}
	}
});
addSocketListener(Type.GETWILL,function(name,willcontent){
	if (name)
	{
		var will = $('<div id="modwill"></div>');
		will.name = name;
		var close = $('<div id="closewill"></div>');
		close.click(function()
		{
			var txt = $('#modwill textarea');
			if(txt.data('dirty')) socket.sendMessage(Type.WILL,txt.val(),name);
			$(this.parentNode).remove();
		});
		var txt = $('<textarea id="willcontent"></textarea>');
		txt.val(willcontent);
		if(mod)
		{
			txt.change(function() {
				$(this).data('dirty', true);
			});
		}
		else
		{
			txt.attr('readonly', true);
		}
		will.append(close);
		will.append(txt);
		$('body').append(will);
		will.show();
	}
	else
	{
		$('#willcontent').val(willcontent);
	}
});
addSocketListener(Type.GETNOTES, function (name, notescontent) {
	if (name) {
		var notes = $('<div id="modnotes"></div>');
		notes.name = name;
		var close = $('<div id="closenotes"></div>');
		close.click(function () {
			socket.sendMessage(Type.NOTES, $('#modnotes textarea').val(), name);
			$(this.parentNode).remove();
		});
		var txt = $('<textarea id="notescontent"></textarea>');
		txt.val(notescontent);
		notes.append(close);
		notes.append(txt);
		$('body').append(notes);
		notes.show();
	}
	else {
		$('#notescontent').val(notescontent);
	}
});
addSocketListener(Type.ACCEPT,function()
{
	connectAttempt = 0;
	$('.blocker').remove();
});
addSocketListener(Type.ROLL,function(result,names)
{
	rolelist_result = [];
	for (i in result)
	{
		$($('.person')[i]).html(names[i]);
		$($('.myrole')[i]).html(result[i]);
		if ($(result[i]).html() !== undefined)
		{
			rolelist_result.push($(result[i]).html());
		}
		else
		{
			rolelist_result.push(result[i]);
		}
	}
	rolelist_names = names;
1});
addSocketListener(Type.SUGGESTIONS,function(results){
	//Check if scrolled to bottom.
	var atBottom = ( 10 +$('#main').scrollTop() + $('#main').prop('offsetHeight') >= $('#main').prop('scrollHeight'));
	var container = $('<div class="automodcontainer"><header><p>Automod</p></header></div>');
	//Target list
	var table = createTable('actiontable');
	table.addRow(['<b>Name</b>','<b>Role</b>','<b>Target</b>'],true); //Header
	for (i in results.targets)
	{
		var data = [];
		data.push('<span class="playername">'+i+'</span>'); //Name
		data.push(sanitize(results.targets[i][0])); //Role
		if (results.targets[i][1] && results.targets[i][1].length != 0)
		{
			data.push(results.targets[i][1].join(', ')); //Target
		}
		else
		{
			data.push('No Action');
		}
		table.addRow(data,results.targets[i][2], results.targets[i][3]);
		data = [];
	}
	container.append(table.object);
	if (results.messages)
	{
		//Suggested messages
		container.append('<h2>Suggested Messages</h2>');
		var messageTable = createTable('messagetable');
		messageTable.addRow(['<b>To</b>','<b>Message</b>','<b>Send</b>'],true); //Header
		data = [];
		for (i in results.messages)
		{
			var to = results.messages[i][0];
			//Remove the <> surrounding special names like <All>
			if (to[0] == '<')
			{
				to = to.substring(1,to.length-1);
			}
			else
			{
				//If it's not special, add it as a normal name
				to = '<span class="playername">'+to+'</span>';
			}
			data.push(to); //Name
			var msg = $("<span class='editableMessage'>"+results.messages[i][1]+"</span>");
			var editMessage = function(){ //Make message editable
				var m = $(this).html();
				var parent = $(this).parent();
				$(this).remove();
				var edit = $('<textarea class="editingMessage" type="text">');
				edit.blur(function(e){
					revert(e)
				});
				edit.keydown(function(e){
					if (e.keyCode == 13)
					{
						revert(e);
					}
				});
				edit.val(m);
				parent.append(edit);
				edit.focus();
				//Keep the size
				var tr = parent.parent();
				parent.height($(tr.children()[0]).height());
			};
			var revert = function(e)
			{
				var self = $(e.target);
				var parent = $(self.parent());
				var v = self.val();
				self.remove();
				var msg = $("<span class='editableMessage'>"+v+"</span>");
				msg.click(editMessage);
				parent.append(msg);
				//Make some hacky css fixes
				var trs = $('.messagetable tr:not(:first-child');
				for (x=0; x<trs.length; x++)
				{
					var tds = $(trs[x]).children();
					var theight = $(tds[1]).height();
					$(tds[0]).height(theight);
					$(tds[2]).height(theight);
				}
				//--
			};
			msg.click(editMessage);
			data.push(msg); //Message
			//Choose a button action.
			var button = chooseAutoButton(results.messages[i], 'Send');
			data.push(button); //Send button
			messageTable.addRow(data,true,['messagetabletr']);
			data = [];
		}
		container.append(messageTable.object);
	}
	if (results.actions)
	{
		//Suggested actions
		container.append('<h2>Suggested Actions</h2>');
		var actionsTable = createTable('actiontable');
		actionsTable.addRow(['<b>Action</b>','<b>Player</b>','<b>Act</b>'], true); //Header
		for (i in results.actions)
		{
			var type = results.actions[i][0];
			//Remove the <> surrounding actions
			if (type[0] == '<')
			{
				type = type.substring(1,type.length-1);
			}
			data.push(type); //Type
			data.push('<span class="playername">'+results.actions[i][1]+'</span>'); //Person
			//Choose a button action.
			var label = results.actions[i][0].substring(1,results.actions[i][0].length-1); //Cut off the < > around the action.
			var button = chooseAutoButton(results.actions[i], label);
			data.push(button); //Button
			actionsTable.addRow(data, true);
			data = [];
		}
		container.append(actionsTable.object);
	}
	$('#main').append(container);
	//Make some hacky css fixes
	var trs = $('.messagetable tr:not(:first-child');
	for (x=0; x<trs.length; x++)
	{
		var tds = $(trs[x]).children();
		var theight = $(tds[1]).height();
		$(tds[0]).height(theight);
		$(tds[2]).height(theight);
	}
	//--
	if (atBottom)
	{
		//Scroll down.
		var end = $("#main").prop('scrollHeight');
		$("#main").prop('scrollTop',end);
	}
});
function kittyReconnect()
{
	if (!kicked)
	{
		if (connectAttempt == 0)
		{
			connectSocket(true);
			connectAttempt++;
		}
		else if (connectAttempt < 10)
		{
			if ($('.blocker').length == 0)
			{
				var blocker = $('<div class="blocker"></div>');
				var kitteh = $('<img src="http://media.giphy.com/media/zwmeWxShpVVyU/giphy.gif">');
				kitteh.on('error',function()
				{
					//Problem with the giphy gif, load from server.
					this.src = 'dancingkitteh.gif';
				});
				var notify = $('<div class="alert"></div>');
				notify.append($('<h3>You have disconnected!</h3>'));
				notify.append(kitteh);
				notify.append($('<p id="try">Please wait while this dancing kitty reconnects you... <p id="count">'+connectAttempt+'/10</p></p>'));
				blocker.append(notify);
				$('body').append(blocker);
			}
				setTimeout(function()
				{
				connectSocket(true);
					connectAttempt++;
					$('#count').html(connectAttempt+'/10');
				},1000);
			}
		else
		{
			$('#try').html('<p>Our dancing kitty has failed to reconnect you. No milk for him tonight. Please rejoin.</p>');
		}
	}
}
