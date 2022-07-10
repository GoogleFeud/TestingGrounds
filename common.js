var Type = {
	PING:0,
	PONG:1,
	MSG:2,
	ROOMLIST:3,
	TOGGLE:4,
	JOINROOM:5,
	JOIN:6,
	LEAVE:7,
	SYSTEM:9,
	SETROLE:10,
	HIGHLIGHT:11,
	SETPHASE:12,
	WHISPER:13,
	MOD:14,
	TOGGLELIVING:15,
	PRENOT:16,
	VOTE:17,
	CLEARVOTES:18,
	VERDICT:19,
	TICK:20,
	JUDGEMENT:21,
	SETDEV:22,
	WILL:23,
	SETMOD:24,
	SWITCH:25,
	ACCEPT:26,
	ROLEUPDATE:27,
	DENY:28,
	KICK:29,
	ROLECARD:30,
	ROLL:31,
	SETROLESBYLIST:32,
	MASSROLEUPDATE:33,
	SHOWLIST:34,
	SHOWALLROLES:35,
	LATENCIES:36,
	GETWILL:37,
	HEY:38,
	TARGET:39,
	HUG:40,
	ME:41,
	ROLELIST:42,
	AUTOLEVEL:43,
	SUGGESTIONS:44,
	SYSSENT:45,
	CUSTOMROLES:46,
	HELP:47,
	PAUSEPHASE:48,
	SETDAYNUMBER:49,
	SETSPEC:50,
	REMSPEC: 51,
	LOGINDEXI: 52,
	LOGINDEXO: 53,
	MAYOR: 54,
	GUARDIAN_ANGEL: 55,
	REMOVE_EMOJI: 56,
	NOTES: 57,
	GETNOTES: 58,
	DISCONNECT: 59,
	RECONNECT: 60,
	GARDENIA: 61,
	PHLOX: 62,
	TARGETING_OPTIONS: 63,
	ROLERESULTS: 64,
};
/*
 * 0 = No auto
 * 1 = Semi auto
 * 2 = Full auto
 * */
var Phase = {
	PREGAME: 0,
	ROLES: 1,
	MODTIME: 2,
	DAY: 3,
	VOTING: 4,
	TRIAL: 5,
	VERDICTS: 6,
	LASTWORDS: 7,
	NIGHT: 8,
	FIRSTDAY: 9,
};

if(typeof jQuery !== 'undefined') {
	function sanitize(msg) {
		return $("<span>").text(msg).html()
	}
} else {
	function sanitize(msg) {
		msg = msg.replace(/&/g, '&amp'); //This needs to be replaced first, in order to not mess up the other codes.
		msg = msg.replace(/</g, '&lt;');
		msg = msg.replace(/>/g, '&gt;');
		msg = msg.replace(/\"/g, '&quot;');
		msg = msg.replace(/\'/g, '&#39;');
		msg = msg.replace(/:/g, '&#58;');
		return msg;
	}
}

function referenceToName(from) {
	if(from.num) {
		return '<span class="playernum">'+from.num+'</span> '+from.name;
	} else if(from.num === 0) {
		return '<span class="playernum modnum">M</span> '+from.name;
	} else if(from.name) {
		return from.name;
	} else if(typeof from === 'string') {
		return from;
	} else {
		return '';
	}
}

function processMessage(msg, type)
{
	switch (type)
	{
		case 'me':
			return '<li class="me">*<em>'+msg+'</em>*</li>';
		break;
		case 'rolecard':
			return '<li class="rolecardcontainer">'+msg+'</li>';
		break;
		case 'hug':
			return '<li>*<b>'+msg.name+' hugs '+msg.target+'</b>*</li>';
		break;
		case 'system':
			return '<li><b>'+msg+'</b></li>';
		break;
		case 'information':
			msg.styling = msg.styling || 'information';
			return '<li class="'+msg.styling+'">'+msg.msg+'</li>';
		break;
		case 'highlight':
			msg.msg = (function(msg) {
				var changes = ['maf','cov','arso','jester','ww','town','sk','neut'];
				for (i in changes)
				{
					var start = '['+changes[i]+']';
					var end = '[/'+changes[i]+']';
					var a = msg.indexOf(start);
					var b = msg.indexOf(end);
					while ( a!=-1 && b!=-1)
					{
						var a = msg.indexOf(start);
						var b = msg.indexOf(end);
						msg = msg.replace(start,'<'+changes[i]+'>');
						msg = msg.replace(end,'</'+changes[i]+'>');
					}
				}
				return msg;
			})(msg.msg);
			msg.styling = msg.styling || 'highlight';
			return '<li class="'+msg.styling+'"><b>'+msg.msg+'</b></li>';
		break;
		case 'whisper':
			if (!msg.msg)
			{
				return '<li><b>'+referenceToName(msg.from)+'</b><span class="whisper"> is whispering to </span><b>'+referenceToName(msg.to)+'</b></span>.</li>';
			}
			else if (msg.from && msg.to)
			{
				return '<li><span class="whispermessage">From</span> <b>'+referenceToName(msg.from)+'</b> <span class="whispermessage">to</span> <b>'+referenceToName(msg.to)+'</b> <span class="whispermessage"> '+msg.msg+' </span></li>';
			}
			else if (msg.from)
			{
				return '<li><span class="whispermessage">From</span> <b>'+referenceToName(msg.from)+'</b><span class="whispermessage"> '+msg.msg+' </span></li>';
			}
			else if (msg.to)
			{
				return '<li><span class="whispermessage">To</span> <b>'+referenceToName(msg.to)+'</b><span class="whispermessage"> '+msg.msg+' </span></li>';
			}
			else
			{
				return '<li><span class="whisper">A whisper in the wind</span></li>';
			}
		break;
		case 'mod':
			if (msg.from)
			{
				return '<li><span class="mod">From</span> <b>'+referenceToName(msg.from)+':</b><span class="mod"> '+msg.msg+' </span></li>';
			}
			else if (msg.to)
			{
				return '<li><span class="mod">To</span> <b>'+referenceToName(msg.to)+':</b><span class="mod"> '+msg.msg+' </span></li>';
			}
			else
			{
				return '<li><span class="mod">Malformed message.</span></li>';
			}
		break;
		case 'target':
			if (msg.target != '')
			{
				if (msg.role)
				{
					msg.role = '('+msg.role+') is';
				}
				else if(msg.role === '')
				{
					msg.role = ' is';
				}
				else
				{
					msg.role = ' are';
				}
				var str = msg.name+msg.role+' now targeting <b>'+msg.target+'</b>.';
			}
			else
			{
				if (msg.role)
				{
					var str = msg.name+'('+msg.role+') has changed their mind.';
				}
				else
				{
					var str = 'You have changed your mind.';
				}
			}
			return '<li><span class="mod">'+str+'</span></li>';
		break;
		case 'prenot':
			return '<li class="'+msg.styling+'">'+msg.msg+'</li>';
		break;
		case 'vote':
			if(msg.prev && msg.voted) {
				return '<li><b>'+msg.voter+'</b><span class="vote"> has changed their vote to </span><b>'+msg.voted+'</b></li>';
			} else if(msg.voted) {
				return '<li><b>'+msg.voter+'</b><span class="vote"> has voted for </span><b>'+msg.voted+'</b></li>';
			} else if(msg.prev) {
				return '<li><b>'+msg.voter+'</b><span class="vote"> has cancelled their vote.</span></li>';
			}
		break;
		case 'verdict':
			if (msg.val==0)
			{
				return '<li><b>'+msg.name+'</b> <span class="vote">has voted.</span>';
			}
			else if (msg.val==1)
			{
				return '<li><b>'+msg.name+'</b> <span class="vote">has changed their vote.</span>';
			}
			else
			{
				return '<li><b>'+msg.name+'</b> <span class="vote">has cancelled their vote.</span>';
			}
		break;
		case 'judgement':
			var message = '';
			for (i in msg.votes)
			{
				switch (msg.votes[i])
				{
					case -1: message += '<li>'+i+' <span class="vote">voted</span> <span class="guilty">guilty</span>.</li>'; break;
					case 0: message += '<li>'+i+' <span class="abstain">abstained</span>.</li>'; break;
					case 1: message += '<li>'+i+' <span class="vote">voted</span> <span class="inno">innocent</span>.</li>'; break;
				}
			}
			message += '<li class="vote">The Town has decided to '+(msg.result ? 'lynch' : 'pardon')+' '+msg.name+' by a vote of <span class="inno"><b>'+msg.innos+'</b></span> to <span class="guilty"><b>'+msg.guilties+'</b></span>.</li>';
			return message;
		break;
		case 'will':
			if (msg == '')
			{
				return '<li class="highlight"><span>We could not find a Last Will.</span></li>';
			}
			else
			{
				return '<li class="highlight"><span>We found a Will next to their body.</span></li><li><div class="will">'+msg+'</div></li>';
			}
		break;
		case 'allroles':
			var message = '';
			for (i in msg)
			{
				message += '<li class="displaylistitem allroles"><div class="innerlistitem">'+msg[i].name+'</div><div class="innerlistitem">'+msg[i].role+'</div></li>';
			}
			return '<li><ul class="allroleslist">'+message+'</ul></li>';
		break;
		case 'rolelist':
			var message = '';
			for (i in msg)
			{
				message += '<li class="displaylistitem">'+msg[i]+'</li>';
			}
			return '<li><ul class="displaylist">'+message+'</ul></li>';
		break;
		default:
			return '<li>Bad message type: '+type+'</li>';
	}
}
var messageHandlers = {};
function addMessageHandler(type,callback) {
	messageHandlers[type] = callback;
}
function msgToHTML(type, args) {
	if(messageHandlers[type]) {
		return messageHandlers[type].apply(this, args);
	}
}
addMessageHandler(Type.MSG,function(from,msg)
{
	from = referenceToName(from)+': ';
	if(msg.styling) {
		msg = '<span class="'+msg.styling+'">'+from+msg.msg+'</span>';
	} else if(msg.msg) {
		msg = from+msg.msg;
	} else {
		msg = from+msg;
	}
	return '<li>'+msg+'</li>';
});
addMessageHandler(Type.ME,function(name,msg)
{
	return processMessage(name+' '+msg,'me');
});
addMessageHandler(Type.HIGHLIGHT,function(msg, styling)
{
	return processMessage({msg: msg, styling: styling}, 'highlight');
});
addMessageHandler(Type.ROLERESULTS,function(msg, styling)
{
	return processMessage({msg: msg, styling: styling}, 'information');
});
addMessageHandler(Type.JOIN,function(name)
{
	return processMessage({
		msg: name +' has joined.',
		styling: 'msgsystem',
	},'information');
});
addMessageHandler(Type.DISCONNECT,function(name)
{
	return processMessage({
		msg: name +' has left.',
		styling: 'msgsystem',
	},'information');
});
addMessageHandler(Type.RECONNECT,function(name)
{
	return processMessage({
		msg: name +' has reconnected.',
		styling: 'msgsystem',
	},'information');
});
addMessageHandler(Type.SYSTEM,function(msg)
{
	return processMessage(msg,'system');
});
addMessageHandler(Type.SYSSENT,function(to,msg,styling)
{
	return processMessage({
		msg: 'To '+to+': '+msg,
		styling,
	},'information');
});
var phasetext = [
	'Pregame',
	'Roles',
	'Modtime',
	'Day',
	'Voting',
	'Trial',
	'Verdict',
	'Last Words',
	'Night',
	'Day 1',
];
addMessageHandler(Type.SETDAYNUMBER,function(num){
	phasetext[3] = 'Day '+num;
	phasetext[8] = 'Night '+num;
});
addMessageHandler(Type.SETPHASE,function(phase,silent,time)
{
	if (!silent)
	{
		return processMessage({msg: phasetext[phase], styling: 'phasechange'}, 'highlight');
	}
});
addMessageHandler(Type.WHISPER,function(msg)
{
	return processMessage(msg,'whisper');
});
addMessageHandler(Type.MOD,function(msg)
{
	return processMessage(msg,'mod');
});
addMessageHandler(Type.PRENOT,function(notification)
{
	switch (notification)
	{
	  case 'GUARDIAN_ANGEL':
		return processMessage({msg: "The Guardian Angel was watching over you!", styling: 'reviving'}, 'prenot');
		break;
	  case 'PHLOX':
		return processMessage({msg: "A Phlox has purified you!", styling: 'reviving'}, 'prenot');
		break;
	  case 'TRANSPORT':
		return processMessage({msg: "You were transported to another location.", styling: 'dying'}, 'prenot');
		break;
	  case 'POISON_CURABLE':
		return processMessage({msg: "You were poisoned. You will die tomorrow unless you are cured!", styling: 'dying'}, 'prenot');
		break;
	  case 'POISON_UNCURABLE':
		return processMessage({msg: "You were poisoned. You will die tomorrow!", styling: 'dying'}, 'prenot');
		break;
	  case 'PROTECTED':
		return processMessage({msg: "You were attacked but someone protected you!", styling: 'reviving'}, 'prenot');
		break;
	  case 'SAVED_BY_BG':
		return processMessage({msg: "You were attacked but someone fought off your attacker!", styling: 'reviving'}, 'prenot');
		break;
	  case 'SAVED_BY_TRAP':
		return processMessage({msg: "You were attacked but a trap saved you!", styling: 'reviving'}, 'prenot');
		break;
	  case 'SAVED_BY_GA':
		return processMessage({msg: "You were attacked but the Guardian Angel saved you!", styling: 'reviving'}, 'prenot');
		break;
	  case 'TARGET_ATTACKED':
		return processMessage({msg: "Your target was attacked!", styling: 'dying'}, 'prenot');
		break;
	  case 'MEDUSA_STONE':
		return processMessage({msg: "You turned someone to stone.", styling: 'dying'}, 'prenot');
		break;
	  case 'INNO':
		return processMessage({msg: "You could not find evidence of wrongdoing. Your target seems innocent.", styling: 'dying'}, 'prenot');
		break;
	  case 'SUS':
		return processMessage({msg: "Your target is suspicious!", styling: 'dying'}, 'prenot');
		break;
	  case 'DEAD':
		 return processMessage({msg:'You have died!',styling:'dying'},'prenot');
	  break;
	  case 'BLACKMAIL':
		 return processMessage({msg:'Someone threatened to reveal your secrets. You are blackmailed!',styling:'dying'},'prenot');
	  break;
	  case 'DOUSE':
		 return processMessage({msg:'You were doused in gas!',styling:'dying'},'prenot');
	  break;
	  case 'TARGETIMMUNE':
		 return processMessage({msg:'Your target\'s defense was too strong to kill.',styling:'dying'},'prenot');
	  break;
	  case 'IMMUNE':
		 return processMessage({msg:'Someone attacked you but your defense was too strong!',styling:'dying'},'prenot');
	  break;
	  case 'JESTER':
		 return processMessage({msg:'The Jester will have their revenge from the grave!',styling:'dying'},'prenot');
	  break;
	  case 'SHOTVET':
		 return processMessage({msg:'You were shot by the Veteran you visited!',styling:'dying'},'prenot');
	  break;
	  case 'VETSHOT':
		 return processMessage({msg:'You shot someone who visited you last night!',styling:'dying'},'prenot');
	  break;
	  case 'RB':
		 return processMessage({msg:'Someone occupied your night. You were roleblocked!',styling:'dying'},'prenot');
	  break;
	  case 'WITCHED':
		 return processMessage({msg:'You felt a mystical power dominating you. You were controlled by a Witch!',styling:'dying'},'prenot');
	  break;
	  case 'REVIVE':
		 return processMessage({msg:'You were revived!',styling:'reviving'},'prenot');
	  break;
	  case 'HEAL':
		 return processMessage({msg:'You were attacked but someone nursed you back to health!',styling:'reviving'},'prenot');
	  break;
	  case 'JAILED':
		 return processMessage({msg:'You were hauled off to jail!',styling:'hauled'},'prenot');
	  break;
	  case 'JAILING':
		 return processMessage({msg:'You dragged your target off to jail!',styling:'reviving'},'prenot');
	  break;
	  case 'ENTANGLED':
		 return processMessage({msg:'You were locked away in the Garden!',styling:'captured'},'prenot');
	  break;
	  case 'ENTANGLING':
		 return processMessage({msg:'You have locked away your target!',styling:'reviving'},'prenot');
	  break;
	  case 'LINKED':
		 return processMessage({msg:'You have been linked!',styling:'reviving'},'prenot');
	  break;
	  case 'FULLMOON':
		 return processMessage({msg:'There is a full moon out tonight.',styling:'moon'},'prenot');
	  break;
   }
});
addMessageHandler(Type.TARGET,function(name,role,target)
{
	if(typeof role === 'string') {
		role = sanitize(role);
	}
	return processMessage({
		name,
		role,
		target,
	},'target');
});
addMessageHandler(Type.MAYOR, function(name) {
	return processMessage({msg: '🎩' +name+' has revealed themselves as the Mayor!', styling: 'mayor_reveal'}, "highlight");
});
addMessageHandler(Type.GARDENIA, function(name) {
	return processMessage({msg: '🌼' +name+' has unveiled themselves as the Gardenia!', styling: 'gardenia_reveal'}, "highlight");
});
addMessageHandler(Type.HUG,function(name,target)
{
	return processMessage({name:name,target:target},'hug');
});
addMessageHandler(Type.VOTE,function(voter,display,voted,prev)
{
	if(display) {
		return processMessage({voter,voted,prev},'vote');
	}
});
addMessageHandler(Type.VERDICT,function(name,val)
{
	return processMessage({name:name,val:val},'verdict');
});
addMessageHandler(Type.GUARDIAN_ANGEL, function(name, yourName) {
	return processMessage({msg: '👼 The Guardian Angel has protected '+name+'.', styling: 'guardian_angel'}, "highlight");
});
addMessageHandler(Type.PHLOX, function(name, yourName) {
	return processMessage({msg: '🌸 A Phlox has purified '+name+'.', styling: 'phlox_li'}, "highlight");
});
addMessageHandler(Type.JUDGEMENT,function(msg)
{
	return processMessage(msg,'judgement');
});
addMessageHandler(Type.ROLECARD,function(card)
{
	return processMessage(card,'rolecard');
});
addMessageHandler(Type.WILL,function(will)
{
	return processMessage(will,'will');
});
addMessageHandler(Type.NOTES, function (notes) {
	return processMessage(notes, 'notes');
});
addMessageHandler(Type.LATENCIES,function(p)
{
	if (typeof p == "number")
	{
		return processMessage('Ping: '+p+'ms','system');
	}
	else
	{
		var output = '';
		for (i in p)
		{
			output += processMessage(i+': '+p[i]+'ms','system');
		}
		return output;
	}
});
addMessageHandler(Type.SHOWLIST,function(list)
{
	return processMessage(list,'rolelist');
});
addMessageHandler(Type.SHOWALLROLES,function(list)
{
	return processMessage(list,'allroles');
});
addMessageHandler(Type.SUGGESTIONS,function(results){
	if(typeof jQuery !== 'undefined') {
		//Skip this; socketstuff.js has its own (more complex) handler.
		return '';
	}
	//Target list
	var rows = [];
	rows.push(['<b>Name</b>','<b>Role</b>','<b>Target</b>']); //Header
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
		rows.push(data);
		data = [];
	}
	var table = '<table class="actiontable">'+rows.map(data=>'<tr>'+data.map(a=>'<td>'+a+'</td>').join('')+'</tr>').join('')+'</table>';
	var container = '<div class="automodcontainer"><header><p>Automod</p></header>'+table+'</div>';
	return container;
});

if(typeof module !== 'undefined') {
	module.exports = {
		Type: Type,
		Phase: Phase,
		sanitize: sanitize,
		msgToHTML: msgToHTML,
	};
}
