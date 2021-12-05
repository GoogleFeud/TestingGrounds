//colors
var towncolor='#00BF00';
var mafiacolor='#FF0000';
var covencolor='#AB5FFB';
var vampcolor='#7F896A';
var randcolor='#497CEF';
var neutcolor='#bcbcbc';
var anycolor='#F5F5F5';
var mystcolor='#D7B4F3';
var overcolor='#15F4EE';
var hilitecolor="orange";
//Generic goals
var towngoal = "Lynch every criminal and evildoer.";
var mafiagoal = "Kill anyone that will not submit to the Mafia.";
var covengoal = "Kill all who would oppose the Coven.";
var vampgoal = "Convert or kill all who would oppose you.";

var roles=[
			// === VANILLA ROLES ===
			// TOWN INVESTIGATIVE VANILLA
			{      
				rolename:"sheriff",
				alignment:"town investigative",
				abilities:['Interrogate one person each night for suspicious activity.'],
				attributes:['You will know if your target is suspicious.'],
				goal:towngoal,
				color:towncolor
			},
			{      
				rolename:"investigator",
				alignment:"town investigative",
				abilities:['Investigate one person each night for a clue to their role.'],
				attributes:['None'],
				goal:towngoal,
				color:towncolor
			},
			{    
				rolename:"lookout",
				alignment:"town investigative",
				abilities:['Watch one person at night to see who visits them.'],
				attributes:['None'],
				goal:towngoal,
				color:towncolor
			},
	                {    
				rolename:"tracker",
				alignment:"town investigative",
				abilities:['Track one person at night to see who they visit.'],
				attributes:['None'],
				goal:towngoal,
				color:towncolor,
			},
	                {      
				rolename:"spy",
				alignment:"town investigative",
				abilities:['You may bug a player\'s house to see what happens to them that night.'],
				attributes:['You will know who the Mafia and Coven visit each night.'],
				goal:towngoal,
				color:towncolor
			},
	                {      
				rolename:"psychic",
				alignment:"town investigative",
				abilities:['Receive a vision every night.'],
				attributes:['On odd nights you will have a vision of three players, at least one will be Evil.',
					'On even nights you will have a vision of two players, at least one will be Good.',
					'All Town roles and Neutral Benign roles appear as Good, all other roles appear as Evil.'],
				goal:towngoal,
				color:towncolor
			},
	
			// TOWN SUPPORT VANILLA
			{      
				rolename:"escort",
				alignment:"town support",
				abilities:['Distract someone each night.'],
				attributes:['Distraction blocks your target from using their role\'s night ability.',
					'You are immune to roleblocks.'],
				goal:towngoal,
				color:towncolor
			},
	                {      
				rolename:"mayor",
				alignment:"town support",
				abilities:['You may reveal yourself as the Mayor of the Town.'],
				attributes:['Once you have revealed yourself as Mayor your vote counts as 3 votes.',
					'You may not be healed once you have revealed yourself.'],
				goal:towngoal,
				color:towncolor
			},
			{      
				rolename:"medium",
				alignment:"town support",
				abilities:['When dead, seance a living person at night.'],
				attributes:     ['You will speak to the dead anonymously each night you are alive.',
					'You may only seance a living person once.'],
				goal:towngoal,
				color:towncolor
			},
			{      
				rolename:"transporter",
				alignment:"town support",
				abilities:['Choose two people to transport at night.'],
				attributes:['Transporting two people swaps all targets against them.',
					'You may transport yourself.',
					'Your targets will know they were transported.'],
				goal:towngoal,
				color:towncolor
			},
			{      
				rolename:"retributionist",
				alignment:"town support",
				abilities:['You may raise a dead Town member and use their ability on a player.'],
				attributes:['Create zombies from dead true-hearted Town players.',
					   'Use their abilities on your second target.',
					   'Each zombie can be used once before it rots.'],
				goal:towngoal,
				color:towncolor
			},
	
			// TOWN PROTECTIVE VANILLA
			{      
				rolename:"doctor",
				alignment:"town protective",
				abilities:['Heal one person each night, granting them Powerful Defense.'],
				attributes:['You may only heal yourself once.',
					'You will know if your target is attacked.'],
				goal:towngoal,
				color:towncolor
			},
			{      
				rolename:"bodyguard",
				alignment:"town protective",
				abilities:['Protect a player from direct attacks at night.'],
				attributes:['If your target is directly attacked or is the victim of a harmful visit, you and the visitor will fight.',
					'If you successfully protect someone you can still be healed.',
					'You have one bulletproof vest.'],
				goal:towngoal,
				color:towncolor
			},
	                {      
				rolename:"crusader",
				alignment:"town protective",
				abilities:['Protect one person other than yourself during the night.'],
				attributes:['Grant your target Powerful defense.',
					'You will know if your target is attacked.',
					'You attack one person who visits your target on the same night.',
					'You do not attack vampires, but you do block their attacks.'],
				goal:towngoal,
				color:towncolor
			},
	                {      
				rolename:"trapper",
				alignment:"town protective",
				abilities:['You may set up a Trap at another player\'s house.'],
				attributes:['Traps take one day to build.',
					'Traps can be torn down by selecting yourself at night.',
					'You may only have one Trap out at a time.',
					'Traps will trigger upon visits, but will only harm attackers.',
					'You will know the roles of all the players that visit your trapped target.'],
				goal:towngoal,
				color:towncolor
			},
	
	
			// TOWN KILLING VANILLA
			{      
				rolename:"jailor",
				alignment:"town killing",
				abilities:['You may choose one person during the day to jail for the night.'],
				attributes:['You may anonymously talk with your prisoner.',
					'You can choose to execute your prisoner.',
					'The jailed target can\'t perform their night ability.',
					'If you execute a Town member, you forfeit further executions.'],
				goal:towngoal,
				color:towncolor
			},
	                {      
				rolename:"vampire hunter",
				alignment:"town killing",
				abilities:['Check for Vampires each night.'],
				attributes:['If you visit a Vampire you will attack them.',
					'If a Vampire visits you, you will attack them.',
					'You can hear Vampires at night.',
					'If all the Vampires die you will become a Vigilante with one bullet.'],
				goal:towngoal,
				color:towncolor
			},
			{      
				rolename:"veteran",
				alignment:"town killing",
				abilities:['Decide if you will go on alert.'],
				attributes:['While on alert, you gain Basic Defense.',
					'While on alert, you will deliver a Powerful attack to anyone who visits you.',
					'You can only go on alert 3 times.',
					'You cannot be roleblocked.'],
				goal:towngoal,
				color:towncolor
			},
	                {      
				rolename:"vigilante",
				alignment:"town killing",
				abilities:['Choose to take justice into your own hands and shoot someone.'],
				attributes:['If you shoot another Town member you will commit suicide over the guilt.',
					'You can only shoot your gun 3 times.'],
				goal:towngoal,
				color:towncolor
			},
	
			// MAFIA VANILLA
			{      
				rolename:"godfather",
				alignment:"mafia killing",
				abilities:['You may choose to attack a player each night.'],
				attributes:['If there is a Mafioso they will attack the target instead of you.',
					'You will appear to be innocent to the Sheriff.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
			{    
				rolename:"mafioso",
				alignment:"mafia killing",
				abilities:['Carry out the Godfather\'s orders.'],
				attributes:['You can attack if the Godfather doesn\'t give you orders.',
					'If the Godfather dies you will become the next Godfather.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor,
			},
	                {      
				rolename:"ambusher",
				alignment:"mafia killing",
				abilities:['You may choose to lie in wait outside your targets house.'],
				attributes:['You will attack one player who visits your target.',
					'All players visiting your target will learn your name.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
	                {      
				rolename:"blackmailer",
				alignment:"mafia support",
				abilities:['Choose one person each night to blackmail.'],
				attributes:['Blackmailed targets cannot talk during the day.',
					'You can hear private messages.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
			{      
				rolename:"consigliere",
				alignment:"mafia support",
				abilities:['Check one person for their exact role each night.'],
				attributes:['If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
			{      
				rolename:"consort",
				alignment:"mafia support",
				abilities:['Distract someone each night.'],
				attributes:['Distraction blocks your target from using their role\'s night ability.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
			{      
				rolename:"disguiser",
				alignment:"mafia deception",
				abilities:['Disguise a mafia member as a non-mafia member to alter their identity.'],
				attributes:['The disguised Mafia member will appear to have the same role as the non-Mafia member to the Investigator and Sheriff, will appear to be the other person to a Lookout, and Mafia visits are disregarded by Spy.'],
				goal:mafiagoal,
				color:mafiacolor
			},
			{      
				rolename:"framer",
				alignment:"mafia deception",
				abilities:['Choose someone to frame at night.'],
				attributes:['If your target is interrogated they will appear suspicious.',
					'If your target is investigated they will appear as a Framer.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
			{      
				rolename:"janitor",
				alignment:"mafia deception",
				abilities:['Choose a person to clean at night.'],
				attributes:['If your target dies their role and last will won\'t be revealed to the Town.',
					'Only you will see the cleaned targets role and last will.',
					'You may only perform 3 cleanings.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
			{      
				rolename:"forger",
				alignment:"mafia deception",
				abilities:['Choose a person and rewrite their role and last will at night.'],
				attributes:['If a target dies, their role and last will is replaced with your forgery.',
					'You may only perform 2 forgeries.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
	                {      
				rolename:"hypnotist",
				alignment:"mafia deception",
				abilities:['You may sneak into a players house at night and plant a memory.'],
				attributes:['A planted memory will confuse the player.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
	
	                // COVEN VANILLA
	                {      
				rolename:"coven leader",
				alignment:"coven evil",
				abilities:['You may choose to Control someone each night.'],
				attributes:['Your victim will know they are being controlled.',
					'With the Necronomicon, your victim is dealt a Basic attack and you gain Basic defense.',
					'You will know the role of the player you control.'],
				goal:covengoal,
				color:covencolor
			},
	                {      
				rolename:"hex master",
				alignment:"coven evil",
				abilities:['You may choose to Hex a player each night.'],
				attributes:['Players are not notified upon being hexed.',
					'Hexed targets will have their investigative results changed.',
					'When all living non-Coven players are hexed, all hexed players will be dealt an Unstoppable attack.',
					'With the Necronomicon, you gain Astral and Basic attacks.'],
				goal:covengoal,
				color:covencolor
			},
	                {      
				rolename:"medusa",
				alignment:"coven evil",
				abilities:['You may choose to Stone Gaze all visitors at night.'],
				attributes:['You may choose to stone gaze thrice.',
					'Your victims\'s last wills and roles will not be revealed.',
					'With the Necronomicon, you may visit players and turn them to stone.'],
				goal:covengoal,
				color:covencolor
			},
	                {      
				rolename:"necromancer",
				alignment:"coven evil",
				abilities:['You may reanimate a dead player and use their ability on a player.'],
				attributes:['Create zombies from dead players who use their abilities on your second target.',
					'Each zombie can be used once before it rots.',
					'With the Necronomicon, select yourself to summon a ghoul to Basic attack your target.'],
				goal:covengoal,
				color:covencolor
			},
	                {      
				rolename:"poisoner",
				alignment:"coven evil",
				abilities:['You may choose to poison a player each night.'],
				attributes:['Your poisons take one day to take effect.',
					'Poison can be removed by Heals.',
					'With the Necronomicon, your poison can no longer be Healed.'],
				goal:covengoal,
				color:covencolor
			},
	                {      
				rolename:"potion master",
				alignment:"coven evil",
				abilities:['You may choose to use a potion on a player each night.'],
				attributes:['You may choose to use a Heal, reveal, or attack potion on a player.',
					'Each potion has a three day cooldown.',
					'With the Necronomicon, your potions no longer have a cooldown.'],
				goal:covengoal,
				color:covencolor
			},
	
	
			// NEUTRAL BENIGN VANILLA
			{      
				rolename:"survivor",
				alignment:"neutral benign",
				abilities:['Put on a bulletproof vest at night, granting you Basic Defense.'],
				attributes:['You can only use the bulletproof vest 4 times.'],
				goal:"Live to the end of the game.",
				color:"#DDDD30"
			},
			{      
				rolename:"amnesiac",
				alignment:"neutral benign",
				abilities:['Remember who you were by selecting a graveyard role.'],
				attributes:['When you choose a role it will be revealed to all the players in the game.'],
				goal:"Remember who you were and complete that roles objectives.",
				color:"#94FFFF"
			},
	                {      
				rolename:"guardian angel",
				alignment:"neutral benign",
				abilities:['Keep your target alive.'],
				attributes:['Your target can be any player except an Executioner, Jester, or another Guardian Angel.',
					'If your target is killed you will become a Survivor without any bulletproof vests.',
					'Twice a game you may Heal and Purge your target. This may be done from the grave. Watching over a player ignores Jail.'],
				goal:"Keep your target alive until the end of the game.",
				color:"#FFFFFF"
			},
	
			// NEUTRAL EVIL VANILLA
			{      
				rolename:"jester",
				alignment:"neutral evil",
				abilities:['Trick the Town into voting against you.'],
				attributes:['If you are lynched you may kill one of your guilty or abstaining voters the following night.'],
				goal:"Get yourself lynched by any means necessary.",
				color:"#E6B3D9"
			},
			{      
				rolename:"executioner",
				alignment:"neutral evil",
				abilities:['Trick the Town into lynching your target.'],
				attributes:['Your target can be any Townmember except a Jailor or Mayor.',
					'If your target is killed at night you will become a jester.'],
				goal:"Get your target lynched at any cost.",
				color:"#CCCCCC"
			},
			{      
				rolename:"witch",
				alignment:"neutral evil",
				abilities:['Control someone each night.'],
				attributes:['You have a mystical barrier that grants you Basic defense until you are attacked.',
					'Your victim will know they are being controlled.',
					'You will know the role of the player you Control.'],
				goal:"Survive to see the Town lose the game.",
				color:"#9D00FF"
			},
	
			// NEUTRAL KILLING VANILLA
			{      
				rolename:"serial killer",
				alignment:"neutral killing",
				abilities:['You may choose to attack a player each night.'],
				attributes:['If you are role blocked you will attack the role blocker in addition to your target.',
					'Role blockers that target you will have their last will covered in blood making it unreadable.',
					'You can choose to be cautious and not kill role blockers.'],
				goal:"Kill everyone who would oppose you.",
				color:"#4A6EFB"
			},
			{      
				rolename:"arsonist",
				alignment:"neutral killing",
				abilities:['You may Douse someone in gasoline or ignite Doused targets.'],
				attributes:['Select yourself to ignite doused people dealing an Unstoppable attack.',
					'You will douse anybody that visits you.',
					'If you take no action, you will attempt to clean gasoline off yourself.',
					'Doused targets will have their investigative results changed. Players will not know they were doused.'],
				goal:"Live to see everyone else burn.",
				color:"#D57615"
			},
			{      
				rolename:"werewolf",
				alignment:"neutral killing",
				abilities:['Transform into a Werewolf during the full moon.'],
				attributes:['You will Rampage at a player\'s house when you attack.',
					'If you do not select a target you will stay home and Rampage at your home.'],
				goal:"Kill everyone who would oppose you.",
				color:"#94703D"
			},
	                {      
				rolename:"juggernaut",
				alignment:"neutral killing",
				abilities:['You may choose to attack a player on Full-Moon nights.'],
				attributes:['With each kill your powers grow.',
					'On your first kill, you may attack every night.',
					'On your second kill, you Rampage when you attack.',
					'On your third kill, you ignore all effects that would protect a player.'],
				goal:"Kill everyone who would oppose you.",
				color:"#8C2B55"

			},
	
	                // NEUTRAL CHAOS VANILLA
			{      
				rolename:"pirate",
				alignment:"neutral chaos",
				abilities:['Choose a player to plunder each night.'],
				attributes:['When you plunder a player, you will duel the player for their valuables.',
					'If the player defends against your attack, you get no loot.'],
				goal:"Successfully plunder two players.",
				color:"#E2C24C"
			},
	                {      
				rolename:"plaguebearer",
				alignment:"neutral chaos",
				abilities:['You may choose to infect a player with the Plague each night.'],
				attributes:['Infected players spread the Plague on visiting or being visited.',
					'Infection cannot be protected against or removed.',
					'Players will not know they have been infected.',
					'When all living players are infected, you will become Pestilence.'],
				goal:"Infect all living players and become Pestilence.",
				color:"#DEFF70"
			},
	                {      
				rolename:"pestilence",
				alignment:"neutral chaos",
				abilities:['You may choose to Rampage at a player\'s house eacn night.'],
				attributes:['You will attack anyone that visits you or your target.',
					'You cannot be roleblocked or controlled.',
					'If you are jailed you will attack the Jailor.',
					'You cannot be killed at night.'],
				goal:"Kill all who would oppose you.",
				color:"#424242"
			},
	                {      
				rolename:"vampire",
				alignment:"neutral chaos",
				abilities:['Convert others to Vampires at night.'],
				attributes:['Vampires vote at night to bite a target.',
					'The youngest Vampire will visit the target at night.',
					'If your target cannot be converted, they will instead be dealt a Basic attack.'],
				goal:"Convert everyone who would oppose you.",
				color:"#7F896A"
			},

			// === CUSTOM ROLES ====
			// TOWN INVESTIGATIVE CUSTOM
			{      
				rolename:"coroner",
				alignment:"town investigative",
				abilities:['Target one player in the graveyard, and perform an autopsy.'],
				attributes:['You will learn what happened to them from the night two nights before their death.',
					'You will get one message for every instance of an action.',
					'Your target will learn if they were autopsied.',
					'You will learn if your target has already been autopsied.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	{      
				rolename:"occultist",
				alignment:"town investigative",
				abilities:['Investigate one person at night for Occult activities.'],
				attributes:['You will know if your target participates in Occult activities.',
					'Occult roles: Mediums, Psychics, Retributionist, Seekers, Hypnotists, Witches, Coven members, Guardian Angels, Vampires, Werewolves.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	{      
				rolename:"gossip",
				alignment:"town investigative",
				abilities:['Investigate one role slot at night to see who the player in that role slot visits.'],
				attributes:['Your night action does not count as a visit.',
					'If the role slot is Any, you will be told which general alignment that role slot was rolled as (Town, Mafia, Coven, Neutral).'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	{      
				rolename:"historian",
				alignment:"town investigative",
				abilities:['Research one player\'s visiting history each night.'],
				attributes:['You will see every time your target has visited non-Town members over the course of the game.',
					'You may only research each player once.',
					'If your target visits a non-Townmember the night you research them, it will count towards their total.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},

			// TOWN SUPPORT CUSTOM:
			{
				rolename:"judge",
				alignment:"town support",
				abilities:['You may force one trial on someone during the day.',
					   'You may object to a vote outcome once, and flip the result.'],
				attributes:['Only your vote counts during your forced trial; no one else may vote.',
					'Your forced trial cannot be the first or last trial of the day.',
					'Using an ability reveals your name to everyone but Town and Neutral Benigns.',
					'You cannot be blackmailed.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	{
				rolename:"gatekeeper",
				alignment:"town support",
				abilities:['Lock the gate between players 7 and 8, preventing anyone from crossing to the other side.'],
				attributes:['You will know the names of every player that passes your gate (excludes astral visits).',
					    'Twice a game, you may lock the gate, preventing anyone from crossing to the other side.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	{      
				rolename:"seeker",
				alignment:"town support",
				abilities:['You may speak to all factions at once at night. Your name will appear as Seeker.'],
				attributes:['You can hear all night time conversations except for the dead.',
					'You cannot decipher which faction, what role or who is speaking.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	{
				rolename:"rain dancer",
				alignment:"town support",
				abilities:['Decide if you want to make it rain next night.'],
				attributes:['It only rains during the night.',
					'Only scum will be noticed, about a rain.',
					'Everyone that goes outside during a rain will be drenched the next morning.',
					'At the beginning of the day a list of drenched people will be show to you.',
					'You can execute only 2 rain dances.',
					'It cannot rain 2 days in a row.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
			{
				rolename:"incarcerator",
				alignment:"town support",
				abilities:['Patrol out someone’s house each night.'],
				attributes:['You will send all visiting players to prison.',
					   'Detained targets will be role blocked the night following their imprisonment.',
					   'Detainment will bypass role block immunities.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
			
			// TOWN PROTECTIVE CUSTOM:
	{
				rolename:"bouncer",
				alignment:"town protective",
				abilities:['You may stop a player from being visited at night.'],
				attributes:['You turn all visitors away from your target.',
					'You know how many visitors visited your target, but not who or what.',
					'If your target is attacked you will be killed instead. You will still turn away all other visitors.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	{
				rolename:"blacksmith",
				alignment:"town protective",
				abilities:['Watch over one person every night.',
					   'Choose a different player to give armor to if your first target dies that night or is lynched the next day.'],
				attributes:['Armor provides powerful defense to a target until their next attack.',
					'Players are not notified when they receive armor.',
					'You may not give armor to yourself.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	{
				rolename:"duelist",
				alignment:"town protective",
				abilities:['Duel two people at night, or protect one person.'],
			        attributes:['Dueled players are added to the Duel list.',
					'When protecting a player, you can only kill an attacker if they are on your Duel list.',
					'Evils are informed if they have been dueled by a Duelist.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	
			// TOWN KILLING CUSTOM
			{      
				rolename:"fisherman",
				alignment:"Town Killing",
				abilities:['Cast your line into someone’s house each night.'],
				attributes:['If someone visits your target, they will be “hooked”.',
					'You will know you hooked someone, and they will know they were hooked.',
					'You may decide to ‘release’, or ‘kill’ your hooked player the night following a successful hook.'
				],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
			
			// MAFIA CUSTOM
	{      
				rolename:"framer rework",
				alignment:"mafia deception",
				abilities:['Choose one person at night to frame and a second person for them to be associated with.'],
				attributes:['If your target is investigated they will appear suspicious.',
					'Frames only last the night you frame your target.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.'],
				goal:mafiagoal,
				color:mafiacolor,
				custom:true
			},
	{      
				rolename:"caporegime",
				alignment:"mafia head",
				abilities:['Train a non-Mafia member each night and choose your trained targets at night to use their reserved abilities.'],
				attributes:['You may select which Mafia ability you wish to make your trainee hold onto.',
					'Trained players will become untrained after you use them.',
					'When you select a trainee, you may select a second target for them to use their ability on.'],
				goal:mafiagoal,
				color:mafiacolor,
				custom:true
			},	
	{      
				rolename:"consigliere buff",
				alignment:"mafia support",
				abilities:['Check one person for their exact role each night.'],
				attributes:['You will also know how many of that role, alignment, and faction are currently alive.',
					'All Neutrals will be listed as the Neutral faction.',
					'If there are no kill capable Mafia roles left you will become a Mafioso.',
					'You can talk with the other Mafia at night.'],
				goal:mafiagoal,
				color:mafiacolor
			},
	{      
				rolename:"agent",
				alignment:"mafia deception",
				abilities:['You may lay a smoke bomb to a target at night.'],
				attributes:['You only have four smoke bombs.',
					'Your smoke bombs obscures the results of night abilities used on your target.',
					'Your smoke bombs obscures what happens to your target.'],
				goal:mafiagoal,
				color:mafiacolor,
				custom:true
			},	
	{      
				rolename:"associate",
				alignment:"mafia support",
				abilities:['Choose a mafia member to accompany during the day.'],
				attributes:['When you accompany a Mafia member, their abilities will be enhanced for the night.',
					'You may use Alibi, Stealth, or Efficiency.',
					'You may use Alibi on yourself.',
					'You can only use each ability on each Mafia member once.'],
				goal:mafiagoal,
				color:mafiacolor,
				custom:true
			},	
	{      
				rolename:"hitman",
				alignment:"mafia killing",
				abilities:['You may attack someone on even-numbered nights.'],
				attributes:['You will not know who the other Mafia are nor can you talk with them at night unless you are discovered.',
				         'Your Last Will won\'t be revealed upon death.',
					 'You are shieleded against Mafia attacks.'],
				goal:mafiagoal,
				color:mafiacolor,
				custom:true
			},
			{      
				rolename:"musician",
				alignment:"mafia support",
				abilities:['Remove all night feedback from someone and their visitors.'],
				attributes:['You may choose to remove the discussion phase from the town the next day.',
				'You can only serenade the town twice in a game.'],
				goal:mafiagoal,
				color:mafiacolor,
				custom:true
			},
			{      
				rolename:"malpractitioner",
				alignment:"mafia support",
				abilities:['Torture someone at night, blocking all abilities.'],
				attributes:['You can block day and night abilities.',
				'When blocked, actions wont be performed and become stored.',
				'When you stop blocking, the most recent action is released with all the rest getting roleblocked.',
				'You must switch target if you torture someone for 2 consecutive nights.'],
				goal:mafiagoal,
				color:mafiacolor,
				custom:true
			},
	
	                // COVEN CUSTOM
	{
				rolename:"hierophant",
				alignment:"coven evil",
				abilities:['You may cast a Ward on a player at night.'],
				attributes:['Wards reflect all abilities on your target back to their users.',
					'You cannot reflect Transports.',
					'You have 3 Wards.',
					'With the Necronomicon, you have unlimited Wards and you may purify a player at night instead, roleblocking them along with dealing a Powerful attack to them.'],
				goal:covengoal,
				color:covencolor,
				custom:true
			},
	{
				rolename:"spellslinger",
				alignment:"coven evil",
				abilities:['Charm a player each night, forcing them to visit you that night.'],
				attributes:['Players that visit you twice or that you charm twice are dealt a Basic attack to.',
					'Charmed targets will not know they were charmed.', 
					'With the Necronomicon, charms repeat on the subsequent night without you needing to visit the target.'],
				goal:covengoal,
				color:covencolor,
				custom:true
			},
	{
				rolename:"ritualist",
				alignment:"coven evil",
				abilities:['You may curse two players every night.'],
				attributes:['If a cursed player is lynched, you may deal a basic rampage attack against one player the following night.',
					'All players are notified when a cursed player is lynched.',
					'Curses are permanent.',
					'With the Necronomicon, you may deal a basic rampage attack against someone regardless of whether a cursed person was lynched.'],
				goal:covengoal,
				color:covencolor,
				custom:true
			},
	{
				rolename:"mystic",
				alignment:"coven evil",
				abilities:['Place a Curse on a target during a Full Moon.'],
				attributes:['Curses deal a Basic Attack to one visitor.',
					'You will be given a list of roles that visited your target when a curse has triggered.', 
					'With the Necronomicon, your attack is Powerful, and you may cast a Curse every night.'],
				goal:covengoal,
				color:covencolor,
				custom:true
			},
	
			// NEUTRAL BENIGN CUSTOM
	{
				rolename:"servant",
				alignment:"neutral benign",
				abilities:['Carry out your employer\'s abilities each night.'],
				attributes:[' You will share a chat with your employer, and you will gain access to any exclusive chats that your master has access to.',
					'If you are roleblocked, your employer will carry out the action themself.', 
					'You gain all Attributes your master has.',
					'If your employer dies while you are still alive, you will inherit their role.'],
				goal:"See your employer win the game.",
				color:"#80BFBF",
				custom:true
			},
	
			// NEUTRAL EVIL CUSTOM 
			{      
				rolename:"gossiper",
				alignment:"neutral evil",
				abilities:['Select two targets. Your second target will find out role, visitors, and target of your first one.'],
				attributes:['You cannot target yourself.',
					'Your ability fails if you give information to a townperson, and you will NOT be notified of this.',
					'You own one auto-vest.'],
				goal:"Survive to see the Town lose the game.",
				color:"#808000",
				custom:true
			},
	                {
				rolename:"rolestopper",
				alignment:"neutral evil",
				abilities:['Each night, you may visit a target in order to scare off a visitor.'],
				attributes:['You will scare one visitor away from your target, effectively roleblocking them.',
					'You can only scare Town roles away from your target.'],
				goal:"Survive to see the Town lose the game.",
				color:"#BF4040",
				custom:true
			},
	{
				rolename:"copycat",
				alignment:"neutral evil",
				abilities:['Mark a player during the day and night to copy them, or use a copied role\'s abilities.'],
				attributes:['If the marked player dies during the same day or night, you will copy their abilities.',
					'Copying a killing role will replenish the one-shot basic defense shield if depleted. Copying a killing role while the shield is intact grants a one-shot basic attack.'],
				goal:"See the Town lose the game.",
				color:"#8080FF",
		                custom:true
			},
	{
				rolename:"fairy",
				alignment:"neutral evil",
				abilities:['Each night, you may choose a player to trick and another player to focus the trick on.'],
				attributes:['You will play a harmful trick on Town, and a helpful trick on everyone else.',
					'Town will not know you tricked them.',
					'You cannot be roleblocked or controlled.'],
				goal:"Survive to see the Town lose the game.",
				color:"#FF69B4",
	                        custom:true
			},
	
			// NEUTRAL KILLING CUSTOM	
	{      
				rolename:"butcher",
				alignment:"neutral killing",
				abilities:['Kill player(s) each night.',
					  'Start with two kills, and gain two more every 3rd night.'],
				attributes:['You cannot be killed at night.',
					'Killing multiple players, you are role block immune.',
					'Killing a single player, you will clean them, but not be informed their information.',
					'You cannot kill the night following a clean kill.'],
				goal:"Kill everyone who would oppose you.",
				color:"#804040",
				custom:true
			},
			{
				rolename:"electrician",
				alignment:"neutral killing",
				abilities:['Charge someone each night.'],
				attributes:["You cannot be killed at night.",
					"Target wont be notified about charging.",
					"If a person that is charged visits another charged person, both will die.",
					"If you charge a person for a second time, that person will die.",
					"If every other player is charged, the town will be notified.",
					"If every other player is charged, you may kill all charged players."],
				goal:"Live to see everyone electrocuted.",
				color:"#00FF80",
				custom:true
			},
		{      
				rolename:"naiad",
				alignment:"neutral killing",
				abilities:['You may drown a player at night, dealing a Powerful attack to them.'],
				attributes:["Their death will not be announced until their body is found by a visitor or they are voted up to the gallows.",
					"Their name will still appear in the list as alive, and a \"phantom\" of their body will leave their house.",
					"You will learn who visits your target the night you drown them."],
				goal:"Kill anyone that would oppose you.",
				color:'#008080',
				custom:true
			},
		{      
				rolename:"slaughterer",
				alignment:"neutral killing",
				abilities:['Slaughter someone each night',
					  'Wear a new mask in the day'],
				attributes:["You roleblock instead of attack players that have visited you before.",
					"You do not die to the Bodyguard.",
					"You can kill Jailed targets",
					"Alerting Veterans survive the attack, but cannot kill the Slaughterer",
					"You can gain a new \"identity\" at day (adds a charge every 3 days), nulliying the visits made to you."],
				goal:"Kill anyone that would oppose you.",
				color:'#5F0060',
				custom:true
			},
	
			// NEUTRAL CHAOS CUSTOM
	                {     
               			rolename:"mortician",
               			alignment:"neutral chaos",
          			abilities:['You may mark two players every night for burial.'],
               			attributes:['Marks last for two days.',
					    'If marked player is lynched and is a member of the Town, you will bury them and transform into Death, Horseman of the Apocalypse.'],
               			goal:"Successfully bury one player and become Death.",
               			color:"#A00000",
				custom:true
			},
	                {     
               			rolename:"death",
               			alignment:"neutral chaos",
          			abilities:['You may kill players every night.'],
               			attributes:['On the night you transform, you will be able to kill one player.',
					    'Each night, you will be able to kill one more player than the previous night.',
					    'You cannot be killed at night.'],
               			goal:"Kill all who would oppose you.",
               			color:"#700030",
				custom:true
			},
	                {     
               			rolename:"conqueror",
               			alignment:"neutral chaos",
          			abilities:['Each night, you may choose two players: one will be healed, one will be attacked.'],
               			attributes:['You may not heal yourself.',
					    'You only win if every other faction is reduced to a single member. At least two other factions must survive.'],
               			goal:"Successfully Conquer the Town.",
               			color:"#4080FF",
				custom:true
			},
	{     
               			rolename:"huntsman",
               			alignment:"neutral chaos",
          			abilities:['Choose your prey during the day. Camp outside one player\'s house at night in an attempt to kill your prey.'],
               			attributes:['You load your shotgun with bullets and camp outside another player\'s house; you will kill your prey if they visit that person.',
					    'If you choose to stay at home and your prey visits you, you will shoot them.',
					    'If you are attacked you will attack your attacker, but stay at home instead.'],
               			goal:"Successfully kill two of your prey.",
               			color:"#521421",
				custom:true
			},
	                {     
               			rolename:"paradoxist",
               			alignment:"Neutral Chaos",
          			abilities:['Visit a player to send them backwards in time, roleblocking but also healing them. Visting a second time kills them.'],
               			attributes:['Your initial time is 8 o\'clock.','Visiting a Town member will send your clock forward 5 hours.','Visiting a member of the Mafia will send your clock forward 3 hours.','Visiting any Neutral role will send your clock backwards 2 hours.'],
               			goal:"Land your clock on 12 o'clock to win",
               			color:"magenta",
				custom:true
			},
	
	                // VAMPIRE CUSTOM
	                {     
               			rolename:"adze",
               			alignment:"vampire killing",
          			abilities:['You may choose a target to drain blood from at night.',
					   'You can mask your true identity upon killing.'],
               			attributes:['Killing your target replaces your Investigator and Consigliere results with that of your drained target.',
					    'You can talk to the other Vampires at night.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"bebarlang",
               			alignment:"vampire killing",
          			abilities:['You may choose a target to drain blood from at night.'],
               			attributes:['You cannot go 2 nights without feasting, otherwise you die.',
					    'Your visits are Astral.',
					    'You can talk to the other Vampires at night.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"lampir",
               			alignment:"vampire killing",
          			abilities:['You may choose a target to drain blood from at night.'],
               			attributes:['If you are roleblocked, you will instead attack the player who roleblocked you. Their last will will be unreadable.',
					    'You can talk to the other Vampires at night.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"catacano",
               			alignment:"vampire conversion",
          			abilities:['You may infect a player at night.'],
               			attributes:['You may only bite someone on an Odd night.',
					    'Biting someone grants them Unstoppable defense the following nights until they are attacked. If a bit target is attacked they will become a Progeny.',
					    'You will know your newest Progeny’s notifications.',
					    'If there are no kill capable Vampire roles left you will become a Lampir.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"progeny",
               			alignment:"vampire conversion",
          			abilities:['Carry out the Catacano\'s orders.'],
               			attributes:['The youngest Progeny will carry out the Catacano\'s order.',
					    'If the Catacano dies, the oldest Progeny becomes the new Catacano.',
					    'If there are no kill capable Vampire roles left you will become a Lampir.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"pijavica",
               			alignment:"vampire manipulation",
          			abilities:['Target one player to mesmerize at night.',
					   'Influence the voting ability of your target the next day.'],
               			attributes:['You may select the vote the player casts (innocent/abstain/guilty) and override their original vote.',
					    'You can talk to the other Vampires at night.',
					    'If there are no kill capable Vampire roles left you will become a Lampir.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"nelapsi",
               			alignment:"vampire manipulation",
          			abilities:['Select two players at night and soulbind them.'],
               			attributes:['Both players will visit the same target as the first player chosen.',
					    'You may only soul bind 2 new target after both die, or you set them free (takes 1 night).',
					    'If one bound player dies the other one dies at night.',
					    'If there are no kill capable Vampire roles left you will become a Lampir.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"broxa",
               			alignment:"vampire support",
          			abilities:['Lull a target into a false sense of security at night.'],
               			attributes:['By selecting a target you create a delayed roleblock.',
					    'If you die, your lull fails.',
					    'Anyone who visits you is lulled into a false sense of security.',
					    'If there are no kill capable Vampire roles left you will become a Lampir.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"gierach",
               			alignment:"vampire support",
          			abilities:['You may track a player at night to see who they visit.'],
               			attributes:['You will know if that player you track has killed before.',
					    'You can talk to the other Vampires at night.',
					    'If there are no kill capable Vampire roles left you will become a Lampir.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	                {     
               			rolename:"talamaur",
               			alignment:"vampire support",
          			abilities:['You may consume a soul from the Graveyard to use as a magical shield for itself or kin.'],
               			attributes:['Selecting a Corpse at night destroys the Corpse, and uses it to shield a Vampire.',
					    'Corpses grant Vampires Basic defense against one attack.',
					    'You can talk to the other Vampires at night.',
					    'If there are no kill capable Vampire roles left you will become a Lampir.'],
			        goal:vampgoal,
               			color:vampcolor,
				custom:true
			},
	
			//Casual roles
			{
				rolename:"citizen",
				alignment:"town casual",
				abilities:['Your only ability is your vote.'],
				attributes:['Without the burden of power to weigh you down, you exhibit superior logic and deductive abilities.'],
				goal:towngoal,
				color:towncolor,
				custom:true
			},
	                {
				rolename:"cleaned",
				alignment:"random dead",
				abilities:['None.'],
				attributes:['You were cleaned by a Janitor.',
					'Your Role and Last Will could not be determined.'],
				goal:"Complete your original goal while dead.",
				color:anycolor,
				custom:true
			},
	                {
				rolename:"stoned",
				alignment:"random dead",
				abilities:['None.'],
				attributes:['You were stoned by Medusa.',
					'Your Role and Last Will could not be determined.'],
				goal:"Complete your original goal while dead.",
				color:anycolor,
				custom:true
			},
			{
				rolename:"host",
				alignment:"neutral casual",
				abilities:['Code and Host the TG.'],
				attributes:['You are the fastest ever to live!'],
				goal:"Make TG a happy place.",
				color:"#000FFF",
				custom:true
			},
	                {
				rolename:"wave",
				alignment:"mystical overseer",
				abilities:['You are the heart of the everlasting nostalgia of Xinopha.'],
				attributes:['You are everything you can be; all you have to do is believe.'],
				goal:"Figure out who you are while you are still you.",
				color:"#008888",
				custom:true
			},
	   {
				rolename:"sally",
				alignment:"mystical overseer",
				abilities:['You are the Beegirl of the world! Buzz-buzz.'],
				attributes:['You are everything you can be; all you have to do is believe.'],
				goal:"Charm everyone with your dazzling sparkle.",
				color:"#A460AC",
				custom:true
			},
	 {
				rolename:"star",
				alignment:"mystical overseer",
				abilities:['Your powers have no limit.'],
				attributes:['None.'],
				goal:"Don\'t screw up this test!",
				color:"#ADD8E6",
				custom:true
			},
			{
				rolename:"afk",
				alignment:"neutral trueEvil",
				abilities:['Die before the game has started.'],
				attributes:['You have lost automatically.'],
				goal:"None.",
				color:"#B05F3C",
				custom:true
			},
			{
				rolename:"spectator",
				alignment:"neutral casual",
				abilities:['You know everything.'],
				attributes:['You can do nothing.'],
				goal:"See how the game progresses.",
				color:"#AFAFAF",
				custom:true
			},
			{
				rolename:"late",
				alignment:"neutral unlucky",
				abilities:['You were too late.'],
				attributes:['Please wait patiently for the current game to end.'],
				goal:"Wait for a new game to start.",
				color:"#FE00EF",
				custom:true
			},
	
];
var unique = ["jailor", "mayor", "retributionist", "veteran", "godfather", "mafioso", "ambusher", "juggernaut", "werewolf", "coven leader", "medusa", "potion master", "hex master", "necromancer", "poisoner", "pirate", "plaguebearer", "pestilence"];
 
function getAttributes(num)
{
        var str="<br><div>";
        var arr=roles[num].attributes;
        for (var i=0;i<arr.length;i++)
        {
                str+="<span id='attribute'>-"+arr[i]+"</span><br>";    
        }
        return str+"</div>";
}
function getAbilities(num)
{
        var str="<br><div>";
        var arr=roles[num].abilities;
        for (var i=0;i<arr.length;i++)
        {
                str+="<span id='attribute'>-"+arr[i]+"</span><br>";    
        }
        return str+"</div>";
}
function format(str)
{
        var color;
        for (i = 0; i < roles.length; i++)
        {
                if (roles[i].rolename==str)
                {
                        color=roles[i].color;
                }
        }
        if (color==undefined)
        {
                color = "black";
        }
        var strings=str.split(" ");
        str="";
        for (x=0;x<strings.length;x++)
        {
                strings[x]=strings[x].substring(0,1).toUpperCase()+strings[x].substring(1,strings[x].length)+" ";              
                str+=strings[x];
        }      
        return "<h2 style='color:"+color+"'>"+str+"</h2>";
}
function shuffle(list)
{
        for (i=0;i<list.length;i++)
        {
                swap(list, i, randNum(list.length));   
        }      
}
function swap(list, x, y)
{
        var temp=list[x];
        list[x]=list[y];
        list[y]=temp;  
}
function lowerAll(arr)
{
        var lowered=[];
        for (i=0;i<arr.length;i++)
        {
                lowered[i]=arr[i].toLowerCase();
        }
        return lowered;
}
function capitalize(str)
{
        var strings=str.split(" ");
        str="";
        for (x=0;x<strings.length;x++)
        {
                strings[x]=strings[x].substring(0,1).toUpperCase()+strings[x].substring(1,strings[x].length)+" ";              
                str+=strings[x];
        }
       
        return str.trim();
}
function randNum(num)
{
        return (Math.floor( Math.random()*num ));
}
function getRoleNum(name)
{
        for (var i = 0; i < roles.length; i++)
        {
			if (roles[i].rolename==name)
			{
					return i;
			}
        }
        return -1;
}
module.exports = {
          sortRoles: function(r, customRolesRollable, exceptions)
          {
			r=lowerAll(r);
			for (i=0;i<r.length;i++)
			{                                                      
				var matches=roles.filter(function(elem)
				{
					if (elem.alignment == r[i] || (r[i] == "any" && elem.alignment.split(" ")[1] != 'casual')) //prevent casual rolling as any
					{							
						if (elem.alignment == r[i] || r[i] == "any" && elem.alignment.split(" ")[1] != 'unlucky')
						{
							if (elem.alignment == r[i] || r[i] == "any" && elem.alignment.split(" ")[1] != 'trueEvil')
							{
								//Ensure custom rolls only roll as any if they are enabled.
								if (!customRolesRollable)
								{
									if (elem.custom)
									{
										//Nope! Not rolling
									}
									else
									{
										return true;
									}
								}
								else
								{
									return true;
								}
							}
						}
					}
					else if (r[i].split(" ")[0]=="random")
					{                                                                      
						var splitr=r[i].split(" ");
						var splitelem=elem.alignment.split(" ");
						if (splitr[1] != undefined && splitelem[0] != undefined)
						{
							if (splitr[1]==splitelem[0])
							{
								if (splitelem[1] != 'power' && splitelem[1] != 'casual' && splitelem[1] != 'unlucky' && splitelem[1] != 'trueEvil') //Prevent Town Power and Town Casual from rolling as random town.
								{
									if (customRolesRollable)
									{
										return true;
									}
									else
									{
										if (elem.custom)
										{
											//Nope!
										}
										else
										{
											return true;
										}
									}
								}
							}
						}
					}
					return false;  
				});    
				if (matches.length>0)
				{
					var rand;
					var rn;                                
					do
					{
							rand=randNum(matches.length);
							rn=matches[rand].rolename;     
					}
					while ( unique.indexOf(rn) != -1 && r.indexOf(rn) !=-1 );
					r[i]=rn;
				}                              
			}
			for (i = 0; i < r.length; i++) //Format the roles correctly.
			{
					r[i]=capitalize(r[i]);
			}                                    
			return r;
          },
          hasRolecard: function(name)
          {              
                        return ( getRoleNum(name.toLowerCase())!=-1);
          },
          getRoleCard: function (name, results)
          {
                var output;
                name=name.toLowerCase();
                var num=getRoleNum(name);
                if (name!="")
                {
                        if (num==-1){
                                return ("Role '"+name+"' not found!");
                        }                                              
                        var al="<span class='aligntext' style='color:"+hilitecolor+"'><u>Alignment</u>: </span>"+module.exports.formatAlignment(roles[num].alignment);
                        var abi="<div class='abilities' style='color:"+hilitecolor+";'><b>Abilities: </b></div>"+getAbilities(num);
                        var att="<div class='abilities' style='color:"+hilitecolor+";'><b>Attributes: </b></div>"+getAttributes(num);
                        var goal="<span class='goal'><div style='color:"+hilitecolor+"'><b>Goal</b>: </div>"+roles[num].goal+"</span>";
                        output="<div class='rolecard'>"+format(name)+al+"<br>"+
                        abi+"<br>"+
                        att+"<br>"+
                        goal+"</div>";
                        //Add invest and consig results if they are available
                        if (results.investResult)
                        {
							var container = '<div class="investresultcontainer">';
							container = container + "<div class='investresult'>"+results.investResult+"</div>" + '</div>';
							output += container;
						}
                        if (results.sheriffResult)
                        {
							var container = '<div class="investresultcontainer">';
							container = container + "<div class='sheriffresult'>"+results.sheriffResult+"</div>" + '</div>';
							output += container;
						}
                        return output;                                                                                                 
                }      
                return "You need to specify a role!<br>";
        },
        formatAlignment: function (str)
        {                              
                if (module.exports.hasRolecard(str))
                {
                        var num=getRoleNum(str.toLowerCase());
                        var color;                     
                        str="<span style='color:"+roles[num].color+"'>"+capitalize(roles[num].rolename)+"</span>";
                }
                else
                {
                        str=str.replace(/[Tt]own/,"<span style='color:"+towncolor+"'>Town</span>");
                        str=str.replace(/[Ii]nvestigative/,"<span style='color:"+randcolor+"'>Investigative</span>");
                        str=str.replace(/[Ss]upport/,"<span style='color:"+randcolor+"'>Support</span>");
                        str=str.replace(/[Pp]rotective/,"<span style='color:"+randcolor+"'>Protective</span>");
                        str=str.replace(/[Cc]asual/,"<span style='color:"+neutcolor+"'>Casual</span>");
                        str=str.replace(/[Rr]andom/,"<span style='color:"+randcolor+"'>Random</span>");
                        str=str.replace(/[Kk]illing/,"<span style='color:"+randcolor+"'>Killing</span>");
                        str=str.replace(/[Mm]afia/,"<span style='color:"+mafiacolor+"'>Mafia</span>");
                        str=str.replace(/[Dd]eception/,"<span style='color:"+randcolor+"'>Deception</span>");
			str=str.replace(/[Cc]oven/,"<span style='color:"+covencolor+"'>Coven</span>");
                        str=str.replace(/[Ee]vil/,"<span style='color:"+randcolor+"'>Evil</span>");
			str=str.replace(/[Vv]ampire/,"<span style='color:"+vampcolor+"'>Vampire</span>");
			str=str.replace(/[Mm]anipulation/,"<span style='color:"+randcolor+"'>Manipulation</span>");
			str=str.replace(/[Cc]onversion/,"<span style='color:"+randcolor+"'>Conversion</span>");
			str=str.replace(/[Dd]ead/,"<span style='color:"+randcolor+"'>Dead</span>");
			str=str.replace(/[Mm]ystical/,"<span style='color:"+mystcolor+"'>Mystical</span>");
			str=str.replace(/[Oo]verseer/,"<span style='color:"+overcolor+"'>Overseer</span>");
                        str=str.replace(/[Bb]enign/,"<span style='color:"+randcolor+"'>Benign</span>");
                        str=str.replace(/[Cc]haos/,"<span style='color:"+randcolor+"'>Chaos</span>");
			str=str.replace(/[Hh]ead/,"<span style='color:"+randcolor+"'>Head</span>");
                        str=str.replace(/[Nn]eutral/,"<span style='color:"+neutcolor+"'>Neutral</span>");      
                }
                return str;
        },
        setCustomRoles:function(bool){
			customRolesRollable = bool;
		},
	getRolenames:function()
	{
		var roleNames = '';
		for (i in roles)
		{
		roleNames = roleNames + roles[i].rolename + ', ';
		}
		return(roleNames);
	},
};
