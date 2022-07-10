window.onbeforeunload = function(){
	if(socket.readyState == socket.OPEN) {
		return 'If you are in a game and need to leave, please inform the mod before closing this page.';
	}
};
mod = false;
var current_rolelist = [
	"Town Investigative",
	"Town Protective",
	"Random Town",
	"Random Town",
	"Random Town ",
	"Godfather",
	"Random Mafia",
	"Neutral Evil",
	"Town Support",
	"Random Mafia",
	"Town Killing",
	"Neutral Killing",
	"Town Power",
	"Neutral Benign",
	"Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any",
    "Any"
];
var autorolelists = {
	3:["Citizen","Citizen","Godfather"],
	8: ["Town Investigative", "Town Protective", "Random Town","Random Town","Random Town", "Godfather","Random Mafia","Neutral Benign"],
	9: ["Town Investigative", "Town Protective", "Town Support","Random Town","Random Town","Random Town", "Godfather","Random Mafia","Neutral Benign"],
	10: ["Town Investigative", "Town Protective", "Town Support","Random Town","Random Town","Random Town", "Godfather","Random Mafia","Neutral Evil","Neutral Benign"],
}
//Globals
var customRolesRollable = true;
var rolelist_names = [];
var rolelist_result = [];
$(document).ready(function(){	
	$('header ul li').on('click',function(e)
	{
		if ($(e.target).is('li') || $(e.target).is('span'))
		{
			var phase = $('header ul li').index(this);
			socket.sendMessage(Type.SETPHASE,phase);
		}
	});
	$('body').on('keypress',function(e)
	{
		if ($(':focus-within:read-write').length == 0) {
			$('#c').focus();
		}
	});
});
//Check if the window is infocus
var isActive = true;
window.onfocus = function()
{
	isActive=true;
};
window.onblur = function()
{
	isActive=false;
}
function openWill()
{
	if ($('#will').css('display') == 'none')
	{
		$('#will').show();
	}
	else
	{
		closeWill();
	}
}
function openNotes()
{
	if ($('#notes').css('display') == 'none') {
		$('#notes').show();
	}
	else
	{
		closeNotes();
	}
}

function mutemusic(phase)
{
	if (musicon == 0)
	{
		var tr = $(this).parent().parent();
		var to = $($(tr.children()[1]).children()[0]).html();
		var index = users.indexOf(to);
		var buttons = $('.musicbutton');
		buttons[0].src="music.png";
		
		musicon = 1;
		if (currentphase == 0)
		{
			mpregame.play();
			mpregame.currentTime = 0;
			mpregame.volume = 1;
		}
		if (currentphase == 1)
		{
			whoami.volume = 1;
		}
		if (currentphase == 2)
		{
			mmodtime.play();
			mmodtime.currentTime = 0;
			mmodtime.volume = 1;
		}
		if (currentphase == 3)
		{
			mdaytime.volume = 1;
		}
		if (currentphase == 4)
		{
			mvoting.volume = 1;
		}
		if (currentphase == 5)
		{
			mtrial.volume = 1;
		}
		if (currentphase == 6)
		{
			mtrial.volume = 1;
		}
		if (currentphase == 7)
		{
			mtrial.volume = 1;
		}
		if (currentphase == 8)
		{
			mnight.volume = 1;
		}
		if (currentphase == 9)
		{
			mdaytime.volume = 1;
		}
	}
	else
	{
		var tr = $(this).parent().parent();
		var to = $($(tr.children()[1]).children()[0]).html();
		var index = users.indexOf(to);
		var buttons = $('.musicbutton');
		buttons[0].src="nomusic.png";
		mpregame.volume = 0;
		whoami.volume = 0;
		mmodtime.volume = 0;
		mdaytime.volume = 0;
		mvoting.volume = 0;
		mtrial.volume = 0;
		mnight.volume = 0;
		musicon = 0;
	}
}

$(function() {
	$('#willcontent').change(function() {
		$(this).data('dirty', true);
	});
});
function closeWill()
{
	$('#will').hide()
	if($('#willcontent').data('dirty')) {
		var will = $('#willcontent').val()
		socket.sendMessage(Type.WILL,will)
		$('#willcontent').removeData('dirty')
	}
}
function postWill()
{
	var will = $('#willcontent').val()
	socket.sendMessage(Type.MSG,will)
}
function closeNotes()
{
	$('#notes').hide()
	var notes = $('#notescontent').val()
	socket.sendMessage(Type.NOTES,notes)
}
function postNotes()
{
	var notes = $('#notescontent').val()
	socket.sendMessage(Type.MSG,notes)
}
function highlightTitle()
{
	var arr=["!-Testing Grounds-!","Testing Grounds","!-Testing Grounds-!","Testing Grounds"];
	var c=0;
	var func=function()
	{
		document.title=arr[c];
		c++;
		if (c<arr.length)
		{
			setTimeout(func,500);
		}
	};
	func();
}
function showPanel(panel)
{
	panel.toggle();
	if (panel.hasClass('grow'))
	{
		panel.removeClass('grow');
		panel.addClass('shrink');
	}
	else if (panel.hasClass('shrink'))
	{
		panel.removeClass('shrink');
		panel.addClass('grow');
	}
}
function checkKey(e)
{
	if (e.keyCode==13 && $('#c').val() != '' ) //Enter
	{
		var msg = $('#c').val();
		$('#c').val('');
		socket.sendMessage(Type.MSG,msg);
	}	
	//Limit length
	if ($('#c').val().length >= 200)
	{
		$('#c').val($('#c').val().substring(0,199));
	}
}
function addMessage(msg)
{
	//Check if scrolled to bottom.
	var atBottom = ( 10 +$('#main').scrollTop() + $('#main').prop('offsetHeight') >= $('#main').prop('scrollHeight'));
	if (!isActive)
	{
		highlightTitle();
	}
	$('#main').append(msg);
	if (atBottom)
	{
		//Scroll down.
		var end = $("#main").prop('scrollHeight');
		$("#main").prop('scrollTop',end);
	}
}
function openModList(targ)
{
	if ($(targ).hasClass('more') || $(targ).hasClass('downarrow'))
	{
		if ($(targ).hasClass('downarrow'))
		{
			targ = $(targ).parent()[0];
		}
		var alreadyOpen = $('#morelist').length > 0;
		$('#morelist').remove();
		if (!alreadyOpen)
		{
			var attributes = {
				mafia: 'Mafia Chat',
				coven: 'Coven Chat',
				vamp: 'Vampire Chat',
				linked: 'Linked',
				jailor: 'Jailor',
				mayor: 'Mayor',
				blackmailer: 'Read Whispers',
				blackmail: 'Blackmailed',
				deafen: 'Deafened',
				medium: 'Hear Dead',
				wisteria: 'Wisteria',
				gardenia: 'Gardenia',
				klepto: 'Name Hidden',
				positive: 'Positive Chat',
				negative: 'Negative Chat',
			};
			var actions = {
				'Douse': function () {
					if ($(`#${name}-fire`).length) return;
				    var name = $(this.parentNode).attr('name');
				    socket.sendMessage(Type.TOGGLE, name, 'douse', true);
				},
				'Hex': function () {
					if ($(`#${name}-hex`).length) return;
					var name = $(this.parentNode).attr('name');
					$(`#p-${name}`).append(`<span class="emoji" id="${name}-hex">文</span>`);
					$(`#${name}-hex`).click(() => {
						if (mod) {
							$(`#${name}-hex`).remove();
							socket.sendMessage(Type.REMOVE_EMOJI, `${name}-hex`);
						}
					});
				},
				"Infect": function() {
					if ($(`#${name}-infect`).length) return;
					var name = $(this.parentNode).attr('name');
					$(`#p-${name}`).append(`<span class="emoji" id="${name}-infect">☢️</span>`);
					$(`#${name}-infect`).click(() => {
						if (mod) {
							$(`#${name}-infect`).remove();
							socket.sendMessage(Type.REMOVE_EMOJI, `${name}-infect`);
						}
					});
				},
				"Poison": function() {
					if ($(`#${name}-poison`).length) return;
					var name = $(this.parentNode).attr('name');
					$(`#p-${name}`).append(`<span class="emoji" id="${name}-poison">☠️</span>`);
					$(`#${name}-poison`).click(() => {
						if (mod) {
							$(`#${name}-poison`).remove();
							socket.sendMessage(Type.REMOVE_EMOJI, `${name}-poison`);
						}
					});
				},
				"GA (Vote Immunity)": function() {
					socket.sendMessage(Type.GUARDIAN_ANGEL, $(this.parentNode).attr('name'));
				},
				"Phlox": function() {
					socket.sendMessage(Type.PHLOX, $(this.parentNode).attr('name'));
				}
			};
			var notifications = {
				'Roleblocked':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'RB');
				},
				'Witched':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'WITCHED');
				},
				'Transported':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'TRANSPORT');
				},
				'Innocent':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'INNO');
				},
				'Suspicious':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'SUS');
				},
				'Attacked(Healed)':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'HEAL');
				},
				'Attacked(Saved By BG)': function() {
					socket.sendMessage(Type.PRENOT,$(this.parentNode).attr('name'),'SAVED_BY_BG');
				},
				'Attacked(Protected)': function() {
					socket.sendMessage(Type.PRENOT,$(this.parentNode).attr('name'),'PROTECTED');
				},
				'Attacked(Saved By Trap)': function() {
					socket.sendMessage(Type.PRENOT,$(this.parentNode).attr('name'),'SAVED_BY_TRAP');
				},
				'Attacked(Saved By GA)': function() {
					socket.sendMessage(Type.PRENOT,$(this.parentNode).attr('name'),'SAVED_BY_GA');
				},
				'Target Attacked': function() {
					socket.sendMessage(Type.PRENOT,$(this.parentNode).attr('name'),'TARGET_ATTACKED');
				},
				'Attacked(Immune)':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'IMMUNE');
				},
				'Target Immune':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'TARGETIMMUNE');
				},
				'Doused in gas':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'DOUSE');
				},
				'Shot by Vet':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'SHOTVET');
				},
				'Veteran Shot':function()
				{
				   var name = $(this.parentNode).attr('name');
				   socket.sendMessage(Type.PRENOT,name,'VETSHOT');
				},
				'GA Watching': function() {
					socket.sendMessage(Type.PRENOT,  $(this.parentNode).attr('name'), 'GUARDIAN_ANGEL');
				},
				'Poisoned(Curable)': function() {
					socket.sendMessage(Type.PRENOT,  $(this.parentNode).attr('name'), 'POISON_CURABLE');
				},
				'Poisoned(Uncurable)': function() {
					socket.sendMessage(Type.PRENOT,  $(this.parentNode).attr('name'), 'POISON_UNCURABLE');
				},
				'Medusa Stone': function() {
					socket.sendMessage(Type.PRENOT,  $(this.parentNode).attr('name'), 'MEDUSA_STONE');
				}
			};
			var list = $('<ul id="morelist"></ul>');
			//Set name
			var li = targ.parentNode.parentNode;
			var index = $('#userlist li').index(li);
			var name = users[index];
			list.attr('name',name);
			list.css('top',$(targ).height());
			//Attributes
			list.append($('<li class="morelistheading">Attributes</li>'));
			Object.entries(attributes).map(function([chat, i]) {
				var tmp = $('<li class="morelistitem">'+i+'</li>');
				tmp.addClass(chat+'button');
				tmp.click(function() {
					var name = $(this).closest(".info").find(".name").html();
					var controlbutton = $(this).closest('.controlbutton.more');
					socket.sendMessage(Type.TOGGLE,name,chat,!controlbutton.hasClass(chat+'buttondown'));
				});
				list.append(tmp);
			});
			//Actions
			list.append($('<li class="morelistheading">Actions</li>'));
			for (i in actions)
			{
				var tmp = $('<li class="morelistitem">'+i+'</li>');
				tmp.click(actions[i]);
				list.append(tmp);
			}
			//Notifications
			list.append($('<li class="morelistheading">Notifications</li>'));
			for (i in notifications)
			{
				var tmp = $('<li class="morelistitem">'+i+'</li>');
				tmp.click(notifications[i]);
				list.append(tmp);
			}
			//Append
			$(targ).append(list);
		}
	}
}
function autoModSettings()
{
	//Remove the role list, if it exists
	if ($('#rolelist').length > 0)
	{
		$('#rolelist').remove();
	}
	if ($('#automodsettings').length > 0)
	{
		$('#automodsettings').remove();
	}
	else
	{
		var ams = $('<ul id="automodsettings"></ul>');
		var levels = {
			'Manual': 'Turn automod off.',
			'Targetting': 'Automod will listen for night actions sent in using /target and present you with a table at the end of the night.',
			'Targetting + Suggestions': 'AutoMod will listen for night actions sent in using /target and present you with a table at the end of the night, as well as suggested actions.',
            'Full Automod': 'AutoMod will perform all actions by himself. No interaction required.'
		};
		for (i in levels)
		{
			var li = $('<li><div><h3>'+i+'</h3><p>'+levels[i]+'</p></div></li>');
			li.click(function(){
				var index = $(this).parent().children().index($(this));
				socket.sendMessage(Type.AUTOLEVEL,index);
				$('#automodsettings').remove();	
			});
			ams.append(li);
		}
		$('body').append(ams);
	}
}
function openRolelist()
{
	//Remove the automod settings, if they exist, prevents layering
	if ($('#automodsettings').length > 0)
	{
		$('#automodsettings').remove();
	}
	if ($('#rolelist').length > 0)
	{
		$('#rolelist').remove();
	}
	else
	{
		var rolelist = $('<ul id="rolelist"></ul>');
		var roll = $('<div class="roll"></div>');
		roll.click(function()
		{
			var custom = $('#customRolesChk').is(':checked');
			socket.sendMessage(Type.ROLL,current_rolelist.slice(0,users.length-1), custom);
		});
		var showList = $('<div class="showlist">Show List</div>');
		showList.click(function()
		{
			socket.sendMessage(Type.SHOWLIST,current_rolelist.slice(0,users.length-1));
		});
		var showRoles = $('<div class="showroles">Show Roles</div>');
		showRoles.click(function()
		{
			socket.sendMessage(Type.SHOWALLROLES);
		});
		var setRoles = $('<div class="setroles"></div>');
		setRoles.click(function()
		{
			for (i = 1; i < users.length; i++)
			{
				var index = rolelist_names.indexOf($('.name')[i].innerHTML);
				$($('.role')[i]).val(rolelist_result[index]);
				$($('.role')[i]).css('background','green');
				$('.role')[i].old = rolelist_result[index];
			}
			socket.sendMessage(Type.SETROLESBYLIST,rolelist_result,rolelist_names);
		});
		var controls = $('<li class="rolelistcontrols"></li>');
		
		controls.append(roll);
		controls.append(showList)
		controls.append(showRoles);
		controls.append(setRoles);
		
		rolelist.append(controls); 
		for (var i = 1; i< users.length; i++)
		{
			var top = $('<div class="top"></div>');
			top.append($('<span class="rolealignment">'+formatAlignment(current_rolelist[i-1])+'</span>'));
			var edit = $('<div class="editbutton"></div>');
			edit.click(function()
			{
				var li = this.parentNode.parentNode;
				var index = $('#rolelist li').index(li);
				var p = this.parentNode;
				var align = $($(p).children('.rolealignment')[0]);
				var val = current_rolelist[index-1];
				
				var editing = $('<input class="rolealignmentedit" type="text" value="'+val+'"></input>');
				align.html(editing);
				
				editing.keydown(function(e)
				{
					if (e.keyCode == 13) //Enter
					{
						var li = this.parentNode.parentNode.parentNode;
						var index = $('#rolelist li').index(li);
						current_rolelist[index-1] = this.value;
						var newrole = formatAlignment(this.value);
						$(this.parentNode).html(newrole);
					}
				});
			});
			top.append(edit);
			var bot = $('<div class="bottom"><span class="person"></span><span class="myrole"></span></div>');
			var li = $('<li></li>');
			li.append(top);
			li.append(bot);
			rolelist.append(li);
		}
		var extraControls = $('<div class="extracontrols"></div>');
		var optionsPanel = $('<div class="options"></div>');
		var customRoles = $('<div class="customroles"></div>');
		var p = $('<p>Custom roles: </p>');
		var chk = $('<input id="customRolesChk" type="checkbox" />');
		var autoButton = $('<div id="autoRolesButton"><p>Autolist</p></div>');
		autoButton.click(function(){
			autoList();
		});
		chk.prop('checked', customRolesRollable)
		customRoles.append(p);
		customRoles.append(chk);
		extraControls.append(optionsPanel);
		optionsPanel.append(customRoles);
		extraControls.append(autoButton);
		rolelist.append(extraControls);
		$('body').append(rolelist);
	}
}
function openUserWill(e)
{
	var li = e;
	while ( ! $(li).is('li'))
	{
		li = $(li).parent();
	}
	var index = $('#userlist').children().index(li);
	socket.sendMessage(Type.GETWILL,index);
}
function autoList()
{
	var num = users.length-1;
	if (autorolelists[num])
	{
		current_rolelist = autorolelists[num];
		var list = $(".rolealignment");
		for (i=0; i < list.length ; i++)
		{
			$($(".rolealignment")[i]).html( autorolelists[num][i] );
		}
	}
	else
	{
		alert('There is no preset rolelist for this number of players.');
	}
}
function grabDivider()
{
	grabbed = true;
	$('body').mousemove(function(e)
	{
		if (grabbed)
		{
			resizeDivider(e);
		}
	});
	$('body').mouseup(function(){
		releaseDivider();
	});
}
function releaseDivider()
{
	grabbed = false;
}
function resizeDivider(e)
{
	$('#main').css('width',e.pageX);
	$('#adjustabledivider').css('left',e.pageX);
}
function formatAlignment(str)
{                       
	//colors
	var towncolor="#7fff00";
	var mafiacolor="#dd0000";
	var covencolor="#bf5fff";
	var randcolor="#49a9d0";
	var neutcolor='#cccccc';
	var hilitecolor="orange";
	str=str.replace(/[Tt]own/,"<span style='color:"+towncolor+"'>Town</span>");
	str=str.replace(/[Ii]nvestigative/,"<span style='color:"+randcolor+"'>Investigative</span>");
	str=str.replace(/[Ss]upport/,"<span style='color:"+randcolor+"'>Support</span>");
	str=str.replace(/[Pp]rotective/,"<span style='color:"+randcolor+"'>Protective</span>");
	str=str.replace(/[Pp]ower/,"<span style='color:"+randcolor+"'>Power</span>");
	str=str.replace(/[Cc]asual/,"<span style='color:"+randcolor+"'>Casual</span>");
	str=str.replace(/[Rr]andom/,"<span style='color:"+randcolor+"'>Random</span>");
	str=str.replace(/[Kk]illing/,"<span style='color:"+randcolor+"'>Killing</span>");
	str=str.replace(/[Mm]afia/,"<span style='color:"+mafiacolor+"'>Mafia</span>");
	str=str.replace(/[Dd]eception/,"<span style='color:"+randcolor+"'>Deception</span>");
	str=str.replace(/[Hh]ead/,"<span style='color:"+randcolor+"'>Head</span>");
	str=str.replace(/[Cc]oven/,"<span style='color:"+covencolor+"'>Coven</span>");
	str=str.replace(/[Ee]vil/,"<span style='color:"+randcolor+"'>Evil</span>");
	str=str.replace(/[Cc]haos/,"<span style='color:"+randcolor+"'>Chaos</span>");
	str=str.replace(/[Bb]enign/,"<span style='color:"+randcolor+"'>Benign</span>");
	str=str.replace(/[Nn]eutral/,"<span style='color:"+neutcolor+"'>Neutral</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	str = str.replace(/[Aa]ny/, "<span style='color:white'>Any</span>");
	return str;      
}
function createTable(cls)
{
	var table = {
		object: $('<table class="'+cls+'"></table>'),
		body: $('<tbody></tbody>'),
		addRow:function(data, automated, classes){
			var tr;
			if (automated === true)
			{
				if (classes)
				{
					var classstr = classes.join(' ');
					tr = $('<tr class="'+classstr+'"></tr>');
				}
				else
				{
					tr = $('<tr></tr>');
				}
			}
			else
			{
				if (classes)
				{
					var classstr = classes.join(' ');
					tr = $('<tr class="unauto '+classstr+'"></tr>');
				}
				else
				{
					tr = $('<tr class="unauto"></tr>');
				}
				//Hover handlers
				tr.mouseenter(function(e){
					var tooltip = $('<div class="tooltip"></div>');
					var p = "<p>Could not automate.</p><p><b>Reason</b>: "+automated.reason+"</p>"
					tooltip.append(p);
					$('body').append(tooltip);
					tooltip.css('top',e.pageY);
					tooltip.css('left',e.pageX);
				}).mouseleave(function(){
					$('.tooltip').remove();
				}).mousemove(function(e){
					var tooltip = $('.tooltip');
					tooltip.css('top',e.pageY);
					tooltip.css('left',e.pageX);
				});
			}
			for (var i in data)
			{
				var td = $('<td></td>');
				td.append(data[i]);
				tr.append(td);
			}
			this.body.append(tr);
		}
	};
	table.object.append(table.body);
	return table;
}
function chooseAutoButton(info, label)
{
	var func;
	switch (info[0])
	{
		/*Messages*/
		case '<All>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				socket.sendMessage(Type.MSG,'/a '+to);
			};
		break;
		/*Actions*/
		case '<Kill>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				socket.sendMessage(Type.TOGGLELIVING,to,false);
			};
		case'<Revive>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				socket.sendMessage(Type.TOGGLELIVING,to,true);
			};
		break;
	    case '<Douse>':
	        func = function () {
	            var tr = $(this).parent().parent();
	            var to = $($(tr.children()[1]).children()[0]).html();
	            socket.sendMessage(Type.TOGGLE, to, 'douse', true);
	        };
	    break;
	    case '<Set Role>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				var arr = to.split('/');
				socket.sendMessage(Type.SETROLE,arr[0],arr[1]);
				//Change the input box
				var index = users.indexOf(arr[0]);
				var input = $('.role');
				$(input[index]).val(arr[1]);
			}
		break;
		case '<Blackmail>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				socket.sendMessage(Type.TOGGLE,to,'blackmail',true);
			};
		break;
		case '<Jail>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				var index = users.indexOf(to);
				var buttons = $('.jailbutton, .releasebutton');
				socket.sendMessage(Type.TOGGLE,to,'jailed', $(buttons[index]).hasClass('jailbutton'));
			};
		break;
		case '<Entangle>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				var index = users.indexOf(to);
				var buttons = $('.entanglebutton, .disentanglebutton');
				socket.sendMessage(Type.TOGGLE,to,'entangled',$(buttons[index]).hasClass('entanglebutton'));
			};
		break;
		case '<Linked>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				socket.sendMessage(Type.TOGGLE,to,'linked', true);
			};
		break;
		case '<Clean>':
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[1]).children()[0]).html();
				socket.sendMessage(Type.MSG,'/clean '+to);
			};
		break;
		/*Default is to treat it as a name*/
		default:
			func = function(){
				var tr = $(this).parent().parent();
				var to = $($(tr.children()[0]).children()[0]).html();
				var msg = $($(tr.children()[1]).html()).html();
				socket.sendMessage(Type.MSG,'/sys '+to+' '+msg);
			};
		break;
	}
	var button = $('<div class="automodbutton">'+label+'</div>');
	button.click(func);
	return button;
}
function addModControls()
{
	//Add numbering interface
	var spn = $('<input type="number" min="1" max="99" value="'+daynumber+'"/>');
	spn.change(function(){
		socket.sendMessage(Type.SETDAYNUMBER,$(this).val());
	});
	var lbl = $('<span>Day/Night:</span>');
	$('#modnumbering').empty();
	$('#modnumbering').append(lbl);
	$('#modnumbering').append(spn);
}
function addPauseButton(phase)
{
	if (paused)
	{
		var pause = $('<div class="playbutton"></div>');
	}
	else
	{
		var pause = $('<div class="pausebutton"></div>');
	}	
	pause.click(function(){
		socket.sendMessage(Type.PAUSEPHASE);
		if ($(this).hasClass('playbutton'))
		{
			$(this).removeClass('playbutton');
			$(this).addClass('pausebutton');
		}
		else if ($(this).hasClass('pausebutton')){
			$(this).removeClass('pausebutton');
			$(this).addClass('playbutton');
		}
	});
	$($('header ul li')[phase]).append(pause);
}
