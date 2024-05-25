let currentTrackIndex = 0;
let isPlaying = false;
let isLooping = false;
let isMuted = false;
let isAutoplayEnabled = true; // Domyślnie włączone autoodtwarzanie
let previousVolume = 1;

const audio = new Audio();
const tracks = [
    { src: 'utwory/muzyka/Dr. Doofenshmirtz - billie jean (A.I Cover).mp3', title: 'billie jean (A.I Cover)', artist: 'Doofenshmirtz', imgSrc: 'utwory/img/Dr. Doofenshmirtz - billie jean (A.I Cover).jpg' },
    { src: 'Doofenshmirtz - Highway to Hell [ACDC] (AI Cover).mp3', title: 'Highway to Hell [ACDC] (AI Cover)', artist: 'Doofenshmirtz', imgSrc: 'cover2.jpg' },
    { src: 'utwory/muzyka/Adolf Hitler - Edge of the Fegel (Eye of the Tiger Parody).mp3', title: 'Edge of the Fegel (Eye of the Tiger Parody)', artist: 'Adolf Hitler', imgSrc: 'cover1.jpg' },
    { src: 'utwory/muzyka/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3', title: 'Gimme! Gimme! Gimme! (A Man After Midnight)', artist: 'ABBA', imgSrc: 'cover2.jpg' },
    { src: 'utwory/muzyka/Ace Combat 6 OST - The Liberation Of Gracemaria.mp3', title: 'The Liberation Of Gracemaria', artist: 'Ace Combat 6 OST', imgSrc: 'cover3.jpg' },
    { src: 'utwory/muzyka/Alan Walker - Faded.mp3', title: 'Faded', artist: 'Alan Walker', imgSrc: 'cover4.jpg' },
    { src: 'utwory/muzyka/Bon Jovi - Livin\' On A Prayer.mp3', title: 'Livin\' On A Prayer', artist: 'Bon Jovi', imgSrc: 'cover5.jpg' },
    { src: 'utwory/muzyka/Adolf Hitler - Bad Romance (AI Cover).mp3', title: 'Bad Romance (AI Cover)', artist: 'Adolf Hitler', imgSrc: 'cover1.jpg' },
    { src: 'utwory/muzyka/Adolf Hitler - DADDY (Parody of PSY\'s DADDY).mp3', title: 'DADDY (Parody of PSY\'s DADDY)', artist: 'Adolf Hitler', imgSrc: 'cover2.jpg' },
    { src: 'utwory/muzyka/Adolf Hitler - Eye of the Fegel (Eye of the Tiger Parody).mp3', title: 'Eye of the Fegel (Eye of the Tiger Parody)', artist: 'Adolf Hitler', imgSrc: 'cover3.jpg' },
    { src: 'utwory/muzyka/Adolf Hitler - BIG SHITLER - MEN\'S NOT HOT.mp3', title: 'BIG SHITLER - MEN\'S NOT HOT', artist: 'Adolf Hitler', imgSrc: 'cover4.jpg' },
    { src: 'utwory/muzyka/Adolf Hitler - Deutschland Funk.mp3', title: 'Deutschland Funk', artist: 'Adolf Hitler', imgSrc: 'cover5.jpg' },
    { src: 'utwory/muzyka/Adolf Hitler - OPPA GODDAMN Style.mp3', title: 'OPPA GODDAMN Style', artist: 'Adolf Hitler', imgSrc: 'cover6.jpg' },
    { src: 'utwory/muzyka/Michael Rosen - along PSA.mp3', title: 'along PSA', artist: 'Michael Rosen', imgSrc: 'cover7.jpg' },
    { src: 'utwory/muzyka/Andrzej Duda & Jarosław Kaczyński & Anżej Duda - SKIBIDI.mp3', title: 'SKIBIDI', artist: 'Andrzej Duda & Jarosław Kaczyński & Anżej Duda', imgSrc: 'cover8.jpg' },
    { src: 'utwory/muzyka/Andrzej Duda & Jarosław Kaczyński & Anżej Duda - El Mismo Sol (Alvaro Soler Parodia).mp3', title: 'El Mismo Sol (Alvaro Soler Parodia)', artist: 'Andrzej Duda & Jarosław Kaczyński & Anżej Duda', imgSrc: 'cover9.jpg' },
    { src: 'utwory/muzyka/Donald Trump Sings All Star by Smash Mouth.mp3', title: 'Donald Trump Sings All Star by Smash Mouth', artist: 'Donald Trump', imgSrc: 'cover10.jpg' },
    { src: 'utwory/muzyka/Janusz Korwin-Mikke - Shrek.mp3', title: 'Shrek', artist: 'Janusz Korwin-Mikke', imgSrc: 'cover11.jpg' },
    { src: 'utwory/muzyka/Robert Makłowicz - Mięso.mp3', title: 'Mięso', artist: 'Robert Makłowicz', imgSrc: 'cover12.jpg' },
    { src: 'utwory/muzyka/2 UNLIMITED - Get Ready For This (Official Music Video).webm', title: 'Get Ready For This', artist: '2 UNLIMITED', imgSrc: 'cover13.jpg' },
    { src: 'utwory/muzyka/007 - James Bond - Theme.mp3', title: 'James Bond - Theme', artist: '007', imgSrc: 'cover14.jpg' },
    { src: 'utwory/muzyka/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3', title: 'Gimme! Gimme! Gimme! (A Man After Midnight)', artist: 'ABBA', imgSrc: 'cover15.jpg' },
    { src: 'utwory/muzyka/Ace Combat 6 OST - The Liberation Of Gracemaria.mp3', title: 'The Liberation Of Gracemaria', artist: 'Ace Combat 6 OST', imgSrc: 'cover16.jpg' },
    { src: 'utwory/muzyka/Ace of Base - All That She Wants (Official Music Video).mp3', title: 'All That She Wants', artist: 'Ace of Base', imgSrc: 'cover17.jpg' },
    { src: 'utwory/muzyka/Adam Lambert - Ghost Town (Official Music Video).mp3', title: 'Ghost Town', artist: 'Adam Lambert', imgSrc: 'cover18.jpg' },
    { src: 'utwory/muzyka/Aqua - Barbie Girl.mp3', title: 'Barbie Girl', artist: 'Aqua', imgSrc: 'cover19.jpg' },
    { src: 'utwory/muzyka/a-ha - Take On Me (Official Video) [Remastered in 4K].mp3', title: 'Take On Me (Official Video) [Remastered in 4K]', artist: 'a-ha', imgSrc: 'cover20.jpg' },
    { src: 'utwory/muzyka/Alan Walker - All Falls Down (feat. Noah Cyrus with Digital Farm Animals).mp3', title: 'All Falls Down (feat. Noah Cyrus with Digital Farm Animals)', artist: 'Alan Walker', imgSrc: 'cover21.jpg' },
    { src: 'utwory/muzyka/Alan Walker - Alone.mp3', title: 'Alone', artist: 'Alan Walker', imgSrc: 'cover22.jpg' },
    { src: 'utwory/muzyka/Alan Walker - Faded.mp3', title: 'Faded', artist: 'Alan Walker', imgSrc: 'cover23.jpg' },
    { src: 'utwory/muzyka/Alan Walker - Sing Me To Sleep.mp3', title: 'Sing Me To Sleep', artist: 'Alan Walker', imgSrc: 'cover24.jpg' },
    { src: 'utwory/muzyka/Alan Walker x Benjamin Ingrosso - Man On The Moon (Official Music Video).mp3', title: 'Man On The Moon', artist: 'Alan Walker x Benjamin Ingrosso', imgSrc: 'cover25.jpg' },
    { src: 'utwory/muzyka/Alejandro - Lady Gaga (Lyrics).mp3', title: 'Lady Gaga (Lyrics)', artist: 'Alejandro', imgSrc: 'cover26.jpg' },
    { src: 'utwory/muzyka/Alexandre Stan - Mr. Saxobeat (Official Video).mp3', title: 'Mr. Saxobeat', artist: 'Alexandre Stan', imgSrc: 'cover27.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - All Star DoofenShmirtz AI Cover.mp3', title: 'All Star DoofenShmirtz AI Cover', artist: 'Doofenshmirtz', imgSrc: 'cover28.jpg' },
    { src: 'utwory/muzyka/Alle Farben - Please Tell Rosie (Lyrics Video).mp3', title: 'Please Tell Rosie (Lyrics Video)', artist: 'Alle Farben', imgSrc: 'cover29.jpg' },
    { src: 'utwory/muzyka/Aloe Blacc - I Need A Dollar.mp3', title: 'I Need A Dollar', artist: 'Aloe Blacc', imgSrc: 'cover30.jpg' },
    { src: 'utwory/muzyka/Alvaro Soler - El Mismo Sol.mp3', title: 'El Mismo Sol', artist: 'Alvaro Soler', imgSrc: 'cover31.jpg' },
    { src: 'utwory/muzyka/Alvaro Soler - La Cintura (lyrics + tłumaczenie).mp3', title: 'La Cintura (lyrics + tłumaczenie)', artist: 'Alvaro Soler', imgSrc: 'cover32.jpg' },
    { src: 'utwory/muzyka/Alvaro Soler - Sofia.mp3', title: 'Sofia', artist: 'Alvaro Soler', imgSrc: 'cover33.jpg' },
    { src: 'utwory/muzyka/American Authors - Best Day Of My Life.mp3', title: 'Best Day Of My Life', artist: 'American Authors', imgSrc: 'cover34.jpg' },
    { src: 'utwory/muzyka/Amy Macdonald - Slow It Down (Official Video).mp3', title: 'Slow It Down', artist: 'Amy Macdonald', imgSrc: 'cover35.jpg' },
    { src: 'utwory/muzyka/Amy Macdonald - This Is The Life.mp3', title: 'This Is The Life', artist: 'Amy Macdonald', imgSrc: 'cover36.jpg' },
    { src: 'utwory/muzyka/Aserejé (The Ketchup Song) [Spanish Version] - Las Ketchup.mp3', title: 'The Ketchup Song (Aserejé) [lyrics] | Spanish Version', artist: 'Las Ketchup', imgSrc: 'cover37.jpg' },
    { src: 'utwory/muzyka/Austrian Painter - Beggin (AI cover).mp3', title: 'Beggin (AI cover)', artist: 'Austrian Painter', imgSrc: 'cover1.jpg' },
    { src: 'utwory/muzyka/Austrian Painter - DotA.mp3', title: 'DotA', artist: 'Austrian Painter', imgSrc: 'cover2.jpg' },
    { src: 'utwory/muzyka/Austrian Painter - Hot N Cold (AI Cover).mp3', title: 'Hot N Cold (AI Cover)', artist: 'Austrian Painter', imgSrc: 'cover3.jpg' },
    { src: 'utwory/muzyka/awake.mp3', title: 'Awake', artist: 'Unknown', imgSrc: 'cover4.jpg' },
    { src: 'utwory/muzyka/Axwell Ingrosso - Sun Is Shining (Official Music Video).mp3', title: 'Sun Is Shining', artist: 'Axwell Ingrosso', imgSrc: 'cover5.jpg' },
    { src: 'utwory/muzyka/Backstreet Boys - Everybody (Lyrics).mp3', title: 'Everybody (Lyrics)', artist: 'Backstreet Boys', imgSrc: 'cover6.jpg' },
    { src: 'utwory/muzyka/Baltimora - Tarzan Boy.mp3', title: 'Tarzan Boy', artist: 'Baltimora', imgSrc: 'cover7.jpg' },
    { src: 'utwory/muzyka/Gipsy Kings - Bamboléo.mp3', title: 'Bamboléo', artist: 'Gipsy Kings', imgSrc: 'cover8.jpg' },
    { src: 'utwory/muzyka/Bananarama - Venus (Lyrics).mp3', title: 'Venus', artist: 'Bananarama', imgSrc: 'cover9.jpg' },
    { src: 'utwory/muzyka/Don Omar - Tego Calderon - Bandoleros.mp3', title: 'Bandoleros', artist: 'Don Omar', imgSrc: 'cover10.jpg' },
    { src: 'utwory/muzyka/BASS BOOSTED Hard Bass School - Narkotik Kal.mp3', title: 'Narkotik Kal', artist: 'Hard Bass School', imgSrc: 'cover11.jpg' },
    { src: 'utwory/muzyka/Basshunter - Vi sitter i ventrilo och spelar DotA.mp3', title: 'Vi sitter i ventrilo och spelar DotA', artist: 'Basshunter', imgSrc: 'cover12.jpg' },
    { src: 'utwory/muzyka/Michael Jackson - Beat It.mp3', title: 'Beat It', artist: 'Michael Jackson', imgSrc: 'cover13.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - Beggin (AI Cover).mp3', title: 'Beggin (AI Cover)', artist: 'Doofenshmirtz', imgSrc: 'cover14.jpg' },
    { src: 'utwory/muzyka/Belinda Carlisle - Leave A Light On.mp3', title: 'Leave A Light On', artist: 'Belinda Carlisle', imgSrc: 'cover15.jpg' },
    { src: 'utwory/muzyka/Beverly Hills Cop Main Theme.mp3', title: 'Beverly Hills Cop Main Theme', artist: 'Unknown', imgSrc: 'cover16.jpg' },
    { src: 'utwory/muzyka/Bob Marley - A lalala long.mp3', title: 'A lalala long', artist: 'Bob Marley', imgSrc: 'cover17.jpg' },
    { src: 'utwory/muzyka/Bobby McFerrin - Dont Worry Be Happy (Official Music Video).mp3', artist: 'Bobby McFerrin', imgSrc: 'cover18.jpg' },
    { src: 'utwory/muzyka/Bon Jovi - It\'s My Life (Official Music Video).mp3', title: 'It\'s My Life', artist: 'Bon Jovi', imgSrc: 'cover19.jpg' },
    { src: 'utwory/muzyka/Bon Jovi - Livin\' On A Prayer (1).mp3', title: 'Livin\' On A Prayer', artist: 'Bon Jovi', imgSrc: 'cover20.jpg' },
    { src: 'utwory/muzyka/Bon Jovi - You Give Love A Bad Name (Official Music Video).mp3', title: 'You Give Love A Bad Name', artist: 'Bon Jovi', imgSrc: 'cover21.jpg' },
    { src: 'utwory/muzyka/Boney M - Daddy Cool (Lyrics Video).mp3', title: 'Daddy Cool', artist: 'Boney M', imgSrc: 'cover22.jpg' },
    { src: 'utwory/muzyka/Bonnie Tyler - I Need a Hero.mp3', title: 'I Need a Hero', artist: 'Bonnie Tyler', imgSrc: 'cover23.jpg' },
    { src: 'utwory/muzyka/BRACIA PIERDOLEC - SCIERNISKO (cover) (reupload).mp3', title: 'SCIERNISKO', artist: 'BRACIA PIERDOLEC', imgSrc: 'cover24.jpg' },
    { src: 'utwory/muzyka/Breakbot - Baby I\'m Yours (feat. Irfane) [Official Audio].mp3', title: 'Baby I\'m Yours', artist: 'Breakbot', imgSrc: 'cover25.jpg' },
    { src: 'utwory/muzyka/Bring Down.mp3', title: 'Bring Down', artist: 'Unknown', imgSrc: 'cover26.jpg' },
    { src: 'utwory/muzyka/Bruce Springsteen - Hungry Heart.mp3', title: 'Hungry Heart', artist: 'Bruce Springsteen', imgSrc: 'cover27.jpg' },
    { src: 'utwory/muzyka/Bruno Mars - Locked Out Of Heaven (Official Music Video).mp3', title: 'Locked Out Of Heaven', artist: 'Bruno Mars', imgSrc: 'cover28.jpg' },
    { src: 'utwory/muzyka/Bruno Mars - Treasure (Official Music Video).mp3', title: 'Treasure', artist: 'Bruno Mars', imgSrc: 'cover29.jpg' },
    { src: 'utwory/muzyka/Bryan Adams - Summer Of \'69 (Official Music Video).mp3', title: 'Summer Of \'69', artist: 'Bryan Adams', imgSrc: 'cover30.jpg' },
    { src: 'utwory/muzyka/Jungle - Busy Earnin\'.mp3', title: 'Busy Earnin\'', artist: 'Jungle', imgSrc: 'cover31.jpg' },
    { src: 'utwory/muzyka/Poparzeni Kawą Trzy - Byłaś dla Mnie Wszystkim.mp3', title: 'Byłaś dla Mnie Wszystkim', artist: 'Poparzeni Kawą Trzy', imgSrc: 'cover32.jpg' },
    { src: 'utwory/muzyka/California Dreamin\' - Aesthetics Of The \'60s.mp3', title: 'California Dreamin\'', artist: 'Unknown', imgSrc: 'cover33.jpg' },
    { src: 'utwory/muzyka/Calvin Harris, Rihanna - This Is What You Came For (Official Video) ft. Rihanna.mp3', title: 'This Is What You Came For', artist: 'Calvin Harris, Rihanna', imgSrc: 'cover34.jpg' },
    { src: 'utwory/muzyka/CAN\'T STOP THE FEELING! (from DreamWorks Animation\'s TROLLS) (Official Video).mp3', title: 'CAN\'T STOP THE FEELING!', artist: 'Unknown', imgSrc: 'cover35.jpg' },
    { src: 'utwory/muzyka/Capital Cities - Safe And Sound.mp3', title: 'Safe And Sound', artist: 'Capital Cities', imgSrc: 'cover36.jpg' },
    { src: 'utwory/muzyka/Carl Douglas - Kung Fu Fighting (Original Music Video).mp3', title: 'Kung Fu Fighting', artist: 'Carl Douglas', imgSrc: 'cover37.jpg' },
    { src: 'utwory/muzyka/Carly Rae Jepsen - Call Me Maybe.mp3', title: 'Call Me Maybe', artist: 'Carly Rae Jepsen', imgSrc: 'cover38.jpg' },
    { src: 'utwory/muzyka/C-Bool - Wonderland (Official Video).mp3', title: 'Wonderland', artist: 'C-Bool', imgSrc: 'cover39.jpg' },
    { src: 'utwory/muzyka/CCR - Run Through The Jungle (Vietnam footage).mp3', title: 'Run Through The Jungle', artist: 'CCR', imgSrc: 'cover40.jpg' },
    { src: 'utwory/muzyka/Cheeki Breeki Hardbass Anthem.mp3', title: 'Cheeki Breeki Hardbass Anthem', artist: 'Unknown', imgSrc: 'cover41.jpg' },
    { src: 'utwory/muzyka/Cher - Believe (Official Music Video) [4K Remaster].mp3', title: 'Believe', artist: 'Cher', imgSrc: 'cover42.jpg' },
    { src: 'utwory/muzyka/Cher - If I Could Turn Back Time (1989).mp3', title: 'If I Could Turn Back Time', artist: 'Cher', imgSrc: 'cover43.jpg' },
    { src: 'utwory/muzyka/Cher - The Shoop Shoop Song (It\'s In His Kiss) [Official Music Video].mp3', title: 'The Shoop Shoop Song (It\'s In His Kiss)', artist: 'Cher', imgSrc: 'cover44.jpg' },
    { src: 'utwory/muzyka/Coldplay - Hymn For The Weekend (Official Video).mp3', title: 'Hymn For The Weekend', artist: 'Coldplay', imgSrc: 'cover45.jpg' },
    { src: 'utwory/muzyka/Colin McRae DiRT 2 - Soundtrack - Qemists - Lost Weekend.mp3', title: 'Lost Weekend', artist: 'Soundtrack', imgSrc: 'cover46.jpg' },
    { src: 'utwory/muzyka/Colin McRae DiRT 2 - Soundtrack - Queens Of The Stone Age - Little Sister.mp3', title: 'Little Sister', artist: 'Soundtrack', imgSrc: 'cover47.jpg' },
    { src: 'utwory/muzyka/Colin McRae DiRT 2 - Soundtrack - Tommy Sparks - I\'m A Rope.mp3', title: 'I\'m A Rope', artist: 'Soundtrack', imgSrc: 'cover48.jpg' },
    { src: 'utwory/muzyka/Coolio - Gangsta\'s Paradise (Feat. LV) [Official Music Video].mp3', title: 'Gangsta\'s Paradise', artist: 'Coolio', imgSrc: 'cover49.jpg' },
    { src: 'utwory/muzyka/Crazy Frog - Axel F (Official Video).mp3', title: 'Axel F', artist: 'Crazy Frog', imgSrc: 'cover50.jpg' },
    { src: 'utwory/muzyka/Cream - White Room - Lyrics.mp3', title: 'White Room', artist: 'Cream', imgSrc: 'cover51.jpg' },
    { src: 'utwory/muzyka/Creedence Clearwater Revival - Fortunate Son.mp3', title: 'Fortunate Son', artist: 'Creedence Clearwater Revival', imgSrc: 'cover52.jpg' },
    { src: 'utwory/muzyka/Culture Club - Karma Chameleon (Official Music Video).mp3', title: 'Karma Chameleon', artist: 'Culture Club', imgSrc: 'cover53.jpg' },
    { src: 'utwory/muzyka/Daft Punk - Get Lucky (Official Audio) ft. Pharell Williams, Nile Rodgers.mp3', title: 'Get Lucky', artist: 'Daft Punk', imgSrc: 'cover54.jpg' },
    { src: 'utwory/muzyka/Daniel Powter - Bad Day (Official Music Video) [HD].mp3', title: 'Bad Day', artist: 'Daniel Powter', imgSrc: 'cover55.jpg' },
    { src: 'utwory/muzyka/Don Omar - Danza Kuduro.mp3', title: 'Danza Kuduro', artist: 'Don Omar', imgSrc: 'cover56.jpg' },
    { src: 'utwory/muzyka/Darude - Sandstorm.mp3', title: 'Sandstorm', artist: 'Darude', imgSrc: 'cover57.jpg' },
    { src: 'utwory/muzyka/David Guetta - Dangerous (Lyric Video) ft Sam Martin.mp3', title: 'Dangerous', artist: 'David Guetta', imgSrc: 'cover58.jpg' },
    { src: 'utwory/muzyka/David Guetta - Lovers On The Sun (Official Video) ft Sam Martin.mp3', title: 'Lovers On The Sun', artist: 'David Guetta', imgSrc: 'cover59.jpg' },
    { src: 'utwory/muzyka/Desireless - Voyage Voyage.mp3', title: 'Voyage Voyage', artist: 'Desireless', imgSrc: 'cover60.jpg' },
    { src: 'utwory/muzyka/Dick Dale - Misirlou (Pulp Fiction) Extended Version.mp3', title: 'Misirlou (Pulp Fiction) Extended Version', artist: 'Dick Dale', imgSrc: 'cover61.jpg' },
    { src: 'utwory/muzyka/Dire Straits - Walk Of Life (Official Music Video).mp3', title: 'Walk Of Life', artist: 'Dire Straits', imgSrc: 'cover62.jpg' },
    { src: 'utwory/muzyka/DJ Snake - Let Me Love You ft. Justin Bieber.mp3', title: 'Let Me Love You', artist: 'DJ Snake', imgSrc: 'cover63.jpg' },
    { src: 'utwory/muzyka/DMX - X Gon\' Give It To Ya.mp3', title: 'X Gon\' Give It To Ya', artist: 'DMX', imgSrc: 'cover64.jpg' },
    { src: 'utwory/muzyka/DNCE - Cake By The Ocean (Lyrics Lyric Video).mp3', title: 'Cake By The Ocean', artist: 'DNCE', imgSrc: 'cover65.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - Bad to the Bone (AI Cover).mp3', title: 'Bad to the Bone', artist: 'Doofenshmirtz', imgSrc: 'cover66.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - Everybody wants to Rule the World (AI Cover).mp3', title: 'Everybody wants to Rule the World', artist: 'Doofenshmirtz', imgSrc: 'cover67.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - Feliz Navidad [José Feliciano] (AI Cover).mp3', title: 'Feliz Navidad', artist: 'Doofenshmirtz', imgSrc: 'cover68.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - Highway to Hell [ACDC] (AI Cover).mp3', title: 'Highway to Hell', artist: 'Doofenshmirtz', imgSrc: 'cover69.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - I Was Made For Lovin\' You [Kiss] (AI Cover).mp3', title: 'I Was Made For Lovin\' You', artist: 'Doofenshmirtz', imgSrc: 'cover70.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - This is the Life (AI Cover).mp3', title: 'This is the Life', artist: 'Doofenshmirtz', imgSrc: 'cover71.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz - Walking On Sunshine [Katrina and the Waves] (AI Cover).mp3', title: 'Walking On Sunshine', artist: 'Doofenshmirtz', imgSrc: 'cover72.jpg' },
    { src: 'utwory/muzyka/Doofenshmirtz Sings Life Is A Highway AI Cover (Reupload).mp3', title: 'Life Is A Highway', artist: 'Doofenshmirtz', imgSrc: 'cover73.jpg' },
    { src: 'utwory/muzyka/Dr Alban - Its my life Lyrics on screen.mp3', title: 'Its my life', artist: 'Dr Alban', imgSrc: 'cover74.jpg' },
    { src: 'utwory/muzyka/Dr. Doofenshmirtz - billie jean (AI Cover).mp3', title: 'billie jean', artist: 'Dr. Doofenshmirtz', imgSrc: 'cover75.jpg' },
    { src: 'utwory/muzyka/Dr. Dre - Still D.R.E. ft. Snoop Dogg.mp3', title: 'Still D.R.E.', artist: 'Dr. Dre', imgSrc: 'cover76.jpg' },
    { src: 'utwory/muzyka/Dr. Dre - The Next Episode (Official Music Video) ft. Snoop Dogg, Kurupt, Nate Dogg.mp3', title: 'The Next Episode', artist: 'Dr. Dre', imgSrc: 'cover77.jpg' },
    { src: 'utwory/muzyka/Dragostea Din Tei Eurobeat Remix.mp3', title: 'Dragostea Din Tei', artist: 'Unknown', imgSrc: 'cover78.jpg' },
    { src: 'utwory/muzyka/Drip of The Japanese Emperor (Hirohito Drip).mp3', title: 'Drip of The Japanese Emperor', artist: 'Unknown', imgSrc: 'cover79.jpg' },
    { src: 'utwory/muzyka/Ed Sheeran - Perfect (Official Music Video).mp3', title: 'Perfect', artist: 'Ed Sheeran', imgSrc: 'cover80.jpg' },
    { src: 'utwory/muzyka/Edward Maya & Vika Jigulina - Stereo Love (Official Music Video).mp3', title: 'Stereo Love', artist: 'Edward Maya & Vika Jigulina', imgSrc: 'cover81.jpg' },
    { src: 'utwory/muzyka/Eiffel 65 - Blue (Da Ba Dee).mp3', title: 'Blue (Da Ba Dee)', artist: 'Eiffel 65', imgSrc: 'cover82.jpg' },
    { src: 'utwory/muzyka/Elektryczne Gitary - Dzieci wybiegły (official video).mp3', title: 'Dzieci wybiegły', artist: 'Elektryczne Gitary', imgSrc: 'cover83.jpg' },
    { src: 'utwory/muzyka/Ellie Goulding - Burn (Official Video).mp3', title: 'Burn', artist: 'Ellie Goulding', imgSrc: 'cover84.jpg' },
    { src: 'utwory/muzyka/Elton John - I\'m Still Standing.mp3', title: 'I\'m Still Standing', artist: 'Elton John', imgSrc: 'cover85.jpg' },
    { src: 'utwory/muzyka/elvis presley - hound dog.mp3', title: 'hound dog', artist: 'elvis presley', imgSrc: 'cover86.jpg' },
    { src: 'utwory/muzyka/Enej - Kamień z Napisem LOVE (tekst).mp3', title: 'Kamień z Napisem LOVE', artist: 'Enej', imgSrc: 'cover87.jpg' },
    { src: 'utwory/muzyka/Enej - Skrzydlate ręce (z tekstem).mp3', title: 'Skrzydlate ręce', artist: 'Enej', imgSrc: 'cover88.jpg' },
    { src: 'utwory/muzyka/Eric Carmen - Hungry Eyes (Official HD Video).mp3', title: 'Hungry Eyes', artist: 'Eric Carmen', imgSrc: 'cover89.jpg' },
    { src: 'utwory/muzyka/Eric Prydz - Call on me (Lyrics).mp3', title: 'Call on me', artist: 'Eric Prydz', imgSrc: 'cover90.jpg' },
    { src: 'utwory/muzyka/Eurobeat Intensifies 2 (Initial D).mp3', title: 'Eurobeat Intensifies 2', artist: 'Unknown', imgSrc: 'cover91.jpg' },
    { src: 'utwory/muzyka/Eurythmics, Annie Lennox, Dave Stewart - Sweet Dreams (Are Made Of This) (Official Video).mp3', title: 'Sweet Dreams', artist: 'Eurythmics, Annie Lennox, Dave Stewart', imgSrc: 'cover92.jpg' },
    { src: 'utwory/muzyka/Survivor - Eye of the Tiger.mp3', title: 'Eye of the Tiger', artist: 'Survivor', imgSrc: 'cover93.jpg' },
    { src: 'utwory/muzyka/Fergie - A Little Party Never Killed Nobody (All We Got) ft. Q-Tip, GoonRock.mp3', title: 'A Little Party Never Killed Nobody', artist: 'Fergie', imgSrc: 'cover94.jpg' },
    { src: 'utwory/muzyka/FIRMA - Mam wyjebane (official video).mp3', title: 'Mam wyjebane', artist: 'FIRMA', imgSrc: 'cover95.jpg' },
    { src: 'utwory/muzyka/Flo Rida - Good Feeling [Official Video).mp3', title: 'Good Feeling', artist: 'Flo Rida', imgSrc: 'cover96.jpg' },
    { src: 'utwory/muzyka/Flo Rida - Whistle [Official Video).mp3', title: 'Whistle', artist: 'Flo Rida', imgSrc: 'cover97.jpg' },
    { src: 'utwory/muzyka/Flo Rida ft. Robin Thicke & Verdine White - I Don\'t Like It, I Love It [Official Video).mp3', title: 'I Don\'t Like It, I Love It', artist: 'Flo Rida ft. Robin Thicke & Verdine White', imgSrc: 'cover98.jpg' },
    { src: 'utwory/muzyka/Foster The People - Pumped Up Kicks (Official Video).mp3', title: 'Pumped Up Kicks', artist: 'Foster The People', imgSrc: 'cover99.jpg' },
    { src: 'utwory/muzyka/Fun. - We Are Young ft. Janelle Monáe [OFFICIAL VIDEO].mp3', title: 'We Are Young', artist: 'Fun. ft. Janelle Monáe', imgSrc: 'cover100.jpg' },
    { src: 'utwory/muzyka/Gaby Ponte x Jerome - Lonely (Official Lyric Video).mp3', title: 'Lonely', artist: 'Gaby Ponte x Jerome', imgSrc: 'cover101.jpg' },
    { src: 'utwory/muzyka/Gaby Ponte, LUMIX, Prezioso - Thunder.mp3', title: 'Thunder', artist: 'Gaby Ponte, LUMIX, Prezioso', imgSrc: 'cover102.jpg' },
    { src: 'utwory/muzyka/Gangnam Style - Call Me Maybe.mp3', title: 'Call Me Maybe', artist: 'Gangnam Style', imgSrc: 'cover103.jpg' },
    { src: 'utwory/muzyka/GENTLEMAN (PSY) from Hitler!.mp3', title: 'GENTLEMAN', artist: 'PSY from Hitler', imgSrc: 'cover104.jpg' },
    { src: 'utwory/muzyka/George Harrison - Got My Mind Set On You (Version II).mp3', title: 'Got My Mind Set On You', artist: 'George Harrison', imgSrc: 'cover105.jpg' },
    { src: 'utwory/muzyka/George Michael - Careless Whisper (Official Video).mp3', title: 'Careless Whisper', artist: 'George Michael', imgSrc: 'cover106.jpg' },
    { src: 'utwory/muzyka/Humble Pie - Get Down To It.mp3', title: 'Get Down To It', artist: 'Humble Pie', imgSrc: 'cover107.jpg' },
    { src: 'utwory/muzyka/Gigi D\'Agostino - L\'Amour Toujours (original version).mp3', title: 'L\'Amour Toujours', artist: 'Gigi D\'Agostino', imgSrc: 'cover108.jpg' },
    { src: 'utwory/muzyka/Gipsy Kings - Volare (Nel blu dipinto di blu).mp3', title: 'Volare', artist: 'Gipsy Kings', imgSrc: 'cover109.jpg' },
    { src: 'utwory/muzyka/Glenn Frey - The Heat Is On (From Beverly Hills Cop Soundtrack).mp3', title: 'The Heat Is On', artist: 'Glenn Frey', imgSrc: 'cover110.jpg' },
    { src: 'utwory/muzyka/Gnarls Barkley - Crazy.mp3', title: 'Crazy', artist: 'Gnarls Barkley', imgSrc: 'cover111.jpg' },
    { src: 'utwory/muzyka/Ron Wasserman - Go Go Power Rangers (Redux).mp3', title: 'Go Go Power Rangers (Redux)', artist: 'Ron Wasserman', imgSrc: 'cover112.jpg' },
    { src: 'utwory/muzyka/The Stranglers - Golden Brown.mp3', title: 'Golden Brown', artist: 'The Stranglers', imgSrc: 'cover113.jpg' },
    { src: 'utwory/muzyka/Gonna Make You Sweat (Everybody Dance Now) (Official HD Video).mp3', title: 'Gonna Make You Sweat (Everybody Dance Now)', artist: 'Unknown', imgSrc: 'cover114.jpg' },
    { src: 'utwory/muzyka/Gotye - Somebody That I Used To Know - Trap by VelvetCasca (Extended Version).mp3', title: 'Somebody That I Used To Know', artist: 'Gotye', imgSrc: 'cover115.jpg' },
    { src: 'utwory/muzyka/Grand Theft Auto 4 Theme Song.mp3', title: 'Grand Theft Auto 4 Theme Song', artist: 'Unknown', imgSrc: 'cover116.jpg' },
    { src: 'utwory/muzyka/Green Day - Boulevard of Broken Dreams lyrics.mp3', title: 'Boulevard of Broken Dreams', artist: 'Green Day', imgSrc: 'cover117.jpg' },
    { src: 'utwory/muzyka/Green Grass & High Tides.mp3', title: 'Green Grass & High Tides', artist: 'The Outlaws', imgSrc: 'cover118.jpg' },
    { src: 'utwory/muzyka/GROUP B - The Golden Era of Rallying.mp3', title: 'The Golden Era of Rallying', artist: 'GROUP B', imgSrc: 'cover119.jpg' },
    { src: 'utwory/muzyka/GTA III FULL Theme HQ.mp3', title: 'GTA III FULL Theme HQ', artist: 'Unknown', imgSrc: 'cover120.jpg' },
    { src: 'utwory/muzyka/GTA San Andreas Theme Song Full!.mp3', title: 'GTA San Andreas Theme Song Full!', artist: 'Unknown', imgSrc: 'cover121.jpg' },
    { src: 'utwory/muzyka/Hard Bass School - Nash Gimn (OUR ANTHEM, Hard Bass Adidas, PA3 PA3 PA3 3TO XAPJIBAC).mp3', title: 'Nash Gimn', artist: 'Hard Bass School', imgSrc: 'cover122.jpg' },
    { src: 'utwory/muzyka/Harold Faltermeyer - Top Gun Anthem (Official Audio).mp3', title: 'Top Gun Anthem', artist: 'Harold Faltermeyer', imgSrc: 'cover123.jpg' },
    { src: 'utwory/muzyka/Belinda Carlisle - Heaven Is a Place on Earth.mp3', title: 'Heaven Is a Place on Earth', artist: 'Belinda Carlisle', imgSrc: 'cover124.jpg' },
    { src: 'utwory/muzyka/Hitler - Gangnam Style PARODY - Extended Full-Version (4 Minutes).mp3', title: 'Gangnam Style PARODY', artist: 'Hitler', imgSrc: 'cover125.jpg' },
    { src: 'utwory/muzyka/Hitler - I\'m blue (AI cover).mp3', title: 'I\'m blue', artist: 'Hitler', imgSrc: 'cover126.jpg' },
    { src: 'utwory/muzyka/Hitler sings Call me Maybe (Full version).mp3', title: 'Call me Maybe', artist: 'Hitler', imgSrc: 'cover127.jpg' },
    { src: 'utwory/muzyka/Hitler sings Despacito (a.k.a Fegel-Cito).mp3', title: 'Despacito', artist: 'Hitler', imgSrc: 'cover128.jpg' },
    { src: 'utwory/muzyka/Hitler sings Dschinghis Khan - Moskau.mp3', title: 'Moskau', artist: 'Hitler', imgSrc: 'cover129.jpg' },
    { src: 'utwory/muzyka/ABBA - Hung Up.mp3', title: 'Hung Up', artist: 'ABBA', imgSrc: 'cover130.jpg' },
    { src: 'utwory/muzyka/Cutting Crew - I Just Died In Your Arms Tonight (Lyrics) [HD].mp3', title: 'I Just Died In Your Arms Tonight', artist: 'Cutting Crew', imgSrc: 'cover131.jpg' },
    { src: 'utwory/muzyka/Gloria Gaynor - I Will Survive.mp3', title: 'I Will Survive', artist: 'Gloria Gaynor', imgSrc: 'cover132.jpg' },
    { src: 'utwory/muzyka/I Will Survive.webm', title: 'I Will Survive', artist: 'Unknown', imgSrc: 'cover133.jpg' },
    { src: 'utwory/muzyka/Ice Cube (feat DJ Shadow) - Everybody Wants To Go To Heaven (MAFIADE ENDING Credit Song).mp3', title: 'Everybody Wants To Go To Heaven', artist: 'Ice Cube (feat DJ Shadow)', imgSrc: 'cover134.jpg' },
    { src: 'utwory/muzyka/If Sabaton Wrote Barbie Girl.mp3', title: 'If Sabaton Wrote Barbie Girl', artist: 'Unknown', imgSrc: 'cover135.jpg' },
    { src: 'utwory/muzyka/I\'ll Be There for You (Theme From Friends).mp3', title: 'I\'ll Be There for You', artist: 'Unknown', imgSrc: 'cover136.jpg' },
    { src: 'utwory/muzyka/Kenny Loggins - I\'m Free (Heaven Helps The Man) Lyrics.mp3', title: 'I\'m Free (Heaven Helps The Man)', artist: 'Kenny Loggins', imgSrc: 'cover137.jpg' },
    { src: 'utwory/muzyka/Imagine Dragons - Believer (Lyrics).mp3', title: 'Believer', artist: 'Imagine Dragons', imgSrc: 'cover138.jpg' },
    { src: 'utwory/muzyka/Imagine Dragons - Bones (Official Music Video).mp3', title: 'Bones', artist: 'Imagine Dragons', imgSrc: 'cover139.jpg' },
    { src: 'utwory/muzyka/Imagine Dragons - On Top Of The World (Lyrics).mp3', title: 'On Top Of The World', artist: 'Imagine Dragons', imgSrc: 'cover140.jpg' },
    { src: 'utwory/muzyka/Imagine Dragons - Radioactive.mp3', title: 'Radioactive', artist: 'Imagine Dragons', imgSrc: 'cover141.jpg' },
    { src: 'utwory/muzyka/Imagine Dragons x J.I.D - Enemy (from the series Arcane League of Legends).mp3', title: 'Enemy (from the series Arcane League of Legends)', artist: 'Imagine Dragons x J.I.D', imgSrc: 'cover142.jpg' },
    { src: 'utwory/muzyka/Indila - Dernière Danse (Clip Officiel).mp3', title: 'Dernière Danse', artist: 'Indila', imgSrc: 'cover143.jpg' },
    { src: 'utwory/muzyka/Initial D - Deja Vu.mp3', title: 'Deja Vu', artist: 'Initial D', imgSrc: 'cover144.jpg' },
    { src: 'utwory/muzyka/Initial D - Dont Stop The Music.mp3', title: 'Dont Stop The Music', artist: 'Initial D', imgSrc: 'cover145.jpg' },
    { src: 'utwory/muzyka/Initial D - Night Of Fire.mp3', title: 'Night Of Fire', artist: 'Initial D', imgSrc: 'cover146.jpg' },
    { src: 'utwory/muzyka/Initial D - Running in The 90\'s (Bass Boosted).mp3', title: 'Running in The 90\'s', artist: 'Initial D', imgSrc: 'cover147.jpg' },
    { src: 'utwory/muzyka/Inner Circle - Bad Boys.mp3', title: 'Bad Boys', artist: 'Inner Circle', imgSrc: 'cover148.jpg' },
    { src: 'utwory/muzyka/It\'s my life (Russian version).mp3', title: 'It\'s my life (Russian version)', artist: 'Unknown', imgSrc: 'cover149.jpg' },
    { src: 'utwory/muzyka/Robert Krawczyk - Jak Nie My To Kto.mp3', title: 'Jak Nie My To Kto', artist: 'Robert Krawczyk', imgSrc: 'cover150.jpg' },
    { src: 'utwory/muzyka/Jason Derulo - Want To Want Me (Official Video).mp3', title: 'Want To Want Me', artist: 'Jason Derulo', imgSrc: 'cover151.jpg' },
    { src: 'utwory/muzyka/Jennifer Lopez - On The Floor ft. Pitbull.mp3', title: 'On The Floor', artist: 'Jennifer Lopez ft. Pitbull', imgSrc: 'cover152.jpg' },
    { src: 'utwory/muzyka/Jincheng Zhang - Oneself (Instrumental Version) (Official Audio).mp3', title: 'Oneself', artist: 'Jincheng Zhang', imgSrc: 'cover153.jpg' },
    { src: 'utwory/muzyka/Jincheng Zhang - Our First Time Story (Official Audio).mp3', title: 'Our First Time Story', artist: 'Jincheng Zhang', imgSrc: 'cover154.jpg' },
    { src: 'utwory/muzyka/Joe Biden - Red Sun in the Sky (中国人民解放军军歌) (AI Cover).mp3', title: 'Red Sun in the Sky', artist: 'Joe Biden', imgSrc: 'cover155.jpg' },
    { src: 'utwory/muzyka/Joe Cocker - What becomes of the broken hearted.mp3', title: 'What becomes of the broken hearted', artist: 'Joe Cocker', imgSrc: 'cover156.jpg' },
    { src: 'utwory/muzyka/John Mayer - New Light (Premium Content!).mp3', title: 'New Light', artist: 'John Mayer', imgSrc: 'cover157.jpg' },
    { src: 'utwory/muzyka/John Newman - Love Me Again.mp3', title: 'Love Me Again', artist: 'John Newman', imgSrc: 'cover158.jpg' },
    { src: 'utwory/muzyka/Jolo Trap & Awaken - Pillar Men Theme (Simpsonill Remix) ver.2.mp3', title: 'Pillar Men Theme (Simpsonill Remix) ver.2', artist: 'Jolo Trap & Awaken', imgSrc: 'cover159.jpg' },
    { src: 'utwory/muzyka/Juanes - La Camisa Negra (lyrics).mp3', title: 'La Camisa Negra', artist: 'Juanes', imgSrc: 'cover160.jpg' },
    { src: 'utwory/muzyka/Juanes - La Camisa Negra.mp3', title: 'La Camisa Negra', artist: 'Juanes', imgSrc: 'cover161.jpg' },
    { src: 'utwory/muzyka/Katie Melua - so kiss me.mp3', title: 'so kiss me', artist: 'Katie Melua', imgSrc: 'cover162.jpg' },
    { src: 'utwory/muzyka/Katrina & The Waves - Walking On Sunshine (Official Music Video).mp3', title: 'Walking On Sunshine', artist: 'Katrina & The Waves', imgSrc: 'cover163.jpg' },
    { src: 'utwory/muzyka/Katy Perry - California Gurls (Lyrics) Feat. Snoop Dogg.mp3', title: 'California Gurls', artist: 'Katy Perry feat. Snoop Dogg', imgSrc: 'cover164.jpg' },
    { src: 'utwory/muzyka/Katy Perry - Firework (Lyrics).mp3', title: 'Firework', artist: 'Katy Perry', imgSrc: 'cover165.jpg' },
    { src: 'utwory/muzyka/Katy Perry - Hot N Cold (Official Music Video).mp3', title: 'Hot N Cold', artist: 'Katy Perry', imgSrc: 'cover166.jpg' },
    { src: 'utwory/muzyka/Katy Perry - Last Friday Night (T.G.I.F) [Lyrics].mp3', title: 'Last Friday Night (T.G.I.F)', artist: 'Katy Perry', imgSrc: 'cover167.jpg' },
    { src: 'utwory/muzyka/Katyusha Rock Cover.mp3', title: 'Katyusha Rock Cover', artist: 'Unknown', imgSrc: 'cover168.jpg' },
    { src: 'utwory/muzyka/Kenny Loggins - Footloose (Official Video).mp3', title: 'Footloose', artist: 'Kenny Loggins', imgSrc: 'cover169.jpg' },
    { src: 'utwory/muzyka/Kiler Soundtrack - Co Ty Tutaj Robisz.mp3', title: 'Co Ty Tutaj Robisz', artist: 'Kiler Soundtrack', imgSrc: 'cover170.jpg' },
    { src: 'utwory/muzyka/Kiryu Sings Numa Numa (AI Cover).mp3', title: 'Numa Numa', artist: 'Kiryu', imgSrc: 'cover171.jpg' },
    { src: 'utwory/muzyka/Kiss - I Was Made For Lovin\' You.mp3', title: 'I Was Made For Lovin\' You', artist: 'Kiss', imgSrc: 'cover172.jpg' },
    { src: 'utwory/muzyka/YouSeekKenny - Kitchen Without Gun (Extended Mix).mp3', title: 'Kitchen Without Gun', artist: 'YouSeekKenny', imgSrc: 'cover173.jpg' },
    { src: 'utwory/muzyka/Kombi - Awinion.mp3', title: 'Awinion', artist: 'Kombi', imgSrc: 'cover174.jpg' },
    { src: 'utwory/muzyka/Kool & The Gang - Get Down On It.mp3', title: 'Get Down On It', artist: 'Kool & The Gang', imgSrc: 'cover175.jpg' },
    { src: 'utwory/muzyka/Krzysztof Krawczyk - Bo jesteś ty (Video).mp3', title: 'Bo jesteś ty', artist: 'Krzysztof Krawczyk', imgSrc: 'cover176.jpg' },
    { src: 'utwory/muzyka/Krzysztof Krawczyk, Edyta Bartosiewicz - Trudno tak (razem być nam ze sobą...) (Video).mp3', title: 'Trudno tak (razem być nam ze sobą...)', artist: 'Krzysztof Krawczyk, Edyta Bartosiewicz', imgSrc: 'cover177.jpg' },
    { src: 'utwory/muzyka/Los Lobos - La Bamba.mp3', title: 'La Bamba', artist: 'Los Lobos', imgSrc: 'cover178.jpg' },
    { src: 'utwory/muzyka/Lady Gaga - Bad Romance.mp3', title: 'Bad Romance', artist: 'Lady Gaga', imgSrc: 'cover179.jpg' },
    { src: 'utwory/muzyka/Lady Gaga - Poker Face (Official Music Video).mp3', title: 'Poker Face', artist: 'Lady Gaga', imgSrc: 'cover180.jpg' },
    { src: 'utwory/muzyka/Lana Del Rey - Summertime Sadness (Lyrics).mp3', title: 'Summertime Sadness', artist: 'Lana Del Rey', imgSrc: 'cover181.jpg' },
    { src: 'utwory/muzyka/Leningrad - Менеджер (Manager).mp3', title: 'Менеджер (Manager)', artist: 'Leningrad', imgSrc: 'cover182.jpg' },
    { src: 'utwory/muzyka/Alvaro Soler - Libre (feat. Paty Cantú).mp3', title: 'Libre', artist: 'Alvaro Soler feat. Paty Cantú', imgSrc: 'cover183.jpg' },
    { src: 'utwory/muzyka/Lilly Wood & The Prick and Robin Schulz - Prayer In C (Robin Schulz Remix) (Official).mp3', title: 'Prayer In C (Robin Schulz Remix)', artist: 'Lilly Wood & The Prick and Robin Schulz', imgSrc: 'cover184.jpg' },
    { src: 'utwory/muzyka/Toto Cutugno - L\'Italiano (Video Ufficiale).mp3', title: 'L\'Italiano', artist: 'Toto Cutugno', imgSrc: 'cover185.jpg' },
    { src: 'utwory/muzyka/LMFAO ft. Lauren Bennett, GoonRock - Party Rock Anthem (Official Audio).mp3', title: 'Party Rock Anthem', artist: 'LMFAO ft. Lauren Bennett, GoonRock', imgSrc: 'cover186.jpg' },
    { src: 'utwory/muzyka/Lou Bega - Mambo No. 5.mp3', title: 'Mambo No. 5', artist: 'Lou Bega', imgSrc: 'cover187.jpg' },
    { src: 'utwory/muzyka/Lou Bega - I Tico Tico you.mp3', title: 'I Tico Tico you', artist: 'Lou Bega', imgSrc: 'cover188.jpg' },
    { src: 'utwory/muzyka/Low Rider.mp3', title: 'Low Rider', artist: 'Unknown', imgSrc: 'cover189.jpg' },
    { src: 'utwory/muzyka/LUM!X, Gabry Ponte - Monster (Official Music Video).mp3', title: 'Monster', artist: 'LUM!X, Gabry Ponte', imgSrc: 'cover190.jpg' },
    { src: 'utwory/muzyka/Lykke Li - I Follow Rivers (Director Tarik Saleh).mp3', title: 'I Follow Rivers', artist: 'Lykke Li', imgSrc: 'cover191.jpg' },
    { src: 'utwory/muzyka/MACKLEMORE & RYAN LEWIS - THRIFT SHOP (Lyrics) FEAT. WANZ.mp3', title: 'THRIFT SHOP', artist: 'MACKLEMORE & RYAN LEWIS ft. WANZ', imgSrc: 'cover192.jpg' },
    { src: 'utwory/muzyka/Madonna - Our House (Official 4K Video).mp3', title: 'Our House', artist: 'Madonna', imgSrc: 'cover193.jpg' },
    { src: 'utwory/muzyka/Madonna - La Isla Bonita (Official Video).mp3', title: 'La Isla Bonita', artist: 'Madonna', imgSrc: 'cover194.jpg' },
    { src: 'utwory/muzyka/Dean Martin - Let It Snow).mp3', title: 'Let It Snow', artist: 'Dean Martin', imgSrc: 'cover195.jpg' },
    { src: 'utwory/muzyka/MAGIC SYSTEM - Magic In The Air Feat. Chawki (Clip Officiel).mp3', title: 'Magic In The Air', artist: 'MAGIC SYSTEM feat. Chawki', imgSrc: 'cover196.jpg' },
    { src: 'utwory/muzyka/Måneskin - Beggin\' (Lyrics).mp3', title: 'Beggin\'', artist: 'Måneskin', imgSrc: 'cover197.jpg' },
    { src: 'utwory/muzyka/Måneskin - I WANNA BE YOUR SLAVE (Official Video).mp3', title: 'I WANNA BE YOUR SLAVE', artist: 'Måneskin', imgSrc: 'cover198.jpg' },
    { src: 'utwory/muzyka/Manian - Welcome To The Club (Official Video).mp3', title: 'Welcome To The Club', artist: 'Manian', imgSrc: 'cover199.jpg' },
    { src: 'utwory/muzyka/Måns Zelmerlöw - Heroes (Official Video).mp3', title: 'Heroes', artist: 'Måns Zelmerlöw', imgSrc: 'cover200.jpg' },
    { src: 'utwory/muzyka/Manuel - Gas Gas Gas.mp3', title: 'Gas Gas Gas', artist: 'Manuel', imgSrc: 'cover201.jpg' },
    { src: 'utwory/muzyka/Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars.mp3', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', imgSrc: 'cover202.jpg' },
    { src: 'utwory/muzyka/Maroon 5 - Moves Like Jagger (Lyrics) ft. Christina Aguilera.mp3', title: 'Moves Like Jagger', artist: 'Maroon 5 ft. Christina Aguilera', imgSrc: 'cover203.jpg' },
    { src: 'utwory/muzyka/Maroon 5 - Sugar (Official Music Video).mp3', title: 'Sugar', artist: 'Maroon 5', imgSrc: 'cover204.jpg' },
    { src: 'utwory/muzyka/Men At Work - Down Under (Official HD Video).mp3', title: 'Down Under', artist: 'Men At Work', imgSrc: 'cover205.jpg' },
    { src: 'utwory/muzyka/Metallica - Whiskey in the jar.mp3', title: 'Whiskey in the Jar', artist: 'Metallica', imgSrc: 'cover206.jpg' },
    { src: 'utwory/muzyka/Michael Bublé - It\'s A Beautiful Day (Official Lyric Video).mp3', title: 'It\'s A Beautiful Day', artist: 'Michael Bublé', imgSrc: 'cover207.jpg' },
    { src: 'utwory/muzyka/Michael Jackson - Bad (Shortened Version).mp3', title: 'Bad', artist: 'Michael Jackson', imgSrc: 'cover208.jpg' },
    { src: 'utwory/muzyka/Michael Jackson - They Don\'t Care About Us (Lyrics).mp3', title: 'They Don\'t Care About Us', artist: 'Michael Jackson', imgSrc: 'cover209.jpg' },
    { src: 'utwory/muzyka/Michel Teló - Ai Se Eu Te Pego (Video Oficial).mp3', title: 'Ai Se Eu Te Pego', artist: 'Michel Teló', imgSrc: 'cover210.jpg' },
    { src: 'utwory/muzyka/MIKA - Relax, Take It Easy.mp3', title: 'Relax, Take It Easy', artist: 'MIKA', imgSrc: 'cover211.jpg' },
    { src: 'utwory/muzyka/Miles Kane - Come Closer.mp3', title: 'Come Closer', artist: 'Miles Kane', imgSrc: 'cover212.jpg' },
    { src: 'utwory/muzyka/Milky Chance - Stolen Dance (Lyric Video).mp3', title: 'Stolen Dance', artist: 'Milky Chance', imgSrc: 'cover213.jpg' },
    { src: 'utwory/muzyka/Modern Talking - Cheri Cheri Lady (Official Music Video).mp3', title: 'Cheri Cheri Lady', artist: 'Modern Talking', imgSrc: 'cover214.jpg' },
    { src: 'utwory/muzyka/Motley Crue - Kickstart My Heart (Official Music Video).mp3', title: 'Kickstart My Heart', artist: 'Motley Crue', imgSrc: 'cover215.jpg' },
    { src: 'utwory/muzyka/Maroon 5 ft. Christina Aguilera - Moves Like Jagger.mp3', title: 'Moves Like Jagger', artist: 'Maroon 5 ft. Christina Aguilera', imgSrc: 'cover216.jpg' },
    { src: 'utwory/muzyka/Mr. Probz - Waves (Robin Schulz Remix Radio Edit).mp3', title: 'Waves', artist: 'Mr. Probz', imgSrc: 'cover217.jpg' },
    { src: 'utwory/muzyka/Mrozu - Złoto (lyrics).mp3', title: 'Złoto', artist: 'Mrozu', imgSrc: 'cover218.jpg' },
    { src: 'utwory/muzyka/Mrozu feat. Sound\'n\'Grace - Nic do stracenia (Official Music Video).mp3', title: 'Nic do stracenia', artist: 'Mrozu feat. Sound\'n\'Grace', imgSrc: 'cover219.jpg' },
    { src: 'utwory/muzyka/NENA - 99 Luftballons [1983] [Offizielles HD Musikvideo].mp3', title: '99 Luftballons', artist: 'NENA', imgSrc: 'cover220.jpg' },
    { src: 'utwory/muzyka/Nickelback - How You Remind Me [OFFICIAL VIDEO].mp3', title: 'How You Remind Me', artist: 'Nickelback', imgSrc: 'cover221.jpg' },
    { src: 'utwory/muzyka/Nickelback - When We Stand Together.mp3', title: 'When We Stand Together', artist: 'Nickelback', imgSrc: 'cover222.jpg' },
    { src: 'utwory/muzyka/Of Monsters and Men - Little Talks.mp3', title: 'Little Talks', artist: 'Of Monsters and Men', imgSrc: 'cover223.jpg' },
    { src: 'utwory/muzyka/Ofenbach vs. Nick Waterhouse - Katchi (Official Video).mp3', title: 'Katchi', artist: 'Ofenbach vs. Nick Waterhouse', imgSrc: 'cover224.jpg' },
    { src: 'utwory/muzyka/Offenbach - Can Can Music.mp3', title: 'Can Can Music', artist: 'Offenbach', imgSrc: 'cover225.jpg' },
    { src: 'utwory/muzyka/One Direction - One Way Or Another (Lyrics) (Teenage Kicks).mp3', title: 'One Way Or Another', artist: 'One Direction', imgSrc: 'cover226.jpg' },
    { src: 'utwory/muzyka/OneRepublic - Counting Stars.mp3', title: 'Counting Stars', artist: 'OneRepublic', imgSrc: 'cover227.jpg' },
    { src: 'utwory/muzyka/OneRepublic - I Ain\'t Worried (From Top Gun Maverick) [Official Music Video].mp3', title: 'I Ain\'t Worried', artist: 'OneRepublic', imgSrc: 'cover228.jpg' },
    { src: 'utwory/muzyka/OST Battlefield 1 - Main Theme (Classic Theme).mp3', title: 'Main Theme (Classic Theme)', artist: 'OST Battlefield 1', imgSrc: 'cover229.jpg' },
    { src: 'utwory/muzyka/Overclocking E5200 to 3Ghz.mp3', title: 'Overclocking E5200 to 3Ghz', artist: 'Unknown', imgSrc: 'cover230.jpg' },
    { src: 'utwory/muzyka/O-Zone - Dragostea Din Tei (Bass Boosted).mp3', title: 'Dragostea Din Tei', artist: 'O-Zone', imgSrc: 'cover231.jpg' },
    { src: 'utwory/muzyka/O-Zone - Numa Numa (English lyrics).mp3', title: 'Numa Numa', artist: 'O-Zone', imgSrc: 'cover232.jpg' },
    { src: 'utwory/muzyka/Paula Abdul - Straight Up (Official Music Video).mp3', title: 'Straight Up', artist: 'Paula Abdul', imgSrc: 'cover233.jpg' },
    { src: 'utwory/muzyka/Peter Griffin & Stewie Griffin - Cake By The Ocean (AI Cover).mp3', title: 'Cake By The Ocean', artist: 'Peter Griffin & Stewie Griffin', imgSrc: 'cover234.jpg' },
    { src: 'utwory/muzyka/Peyruis - My mind (ft. Sandrah).mp3', title: 'My mind', artist: 'Peyruis ft. Sandrah', imgSrc: 'cover235.jpg' },
    { src: 'utwory/muzyka/Pharrell Williams - Happy (from Despicable Me 2) [Ballroom Version].mp3', title: 'Happy', artist: 'Pharrell Williams', imgSrc: 'cover236.jpg' },
    { src: 'utwory/muzyka/Phil Collins - Another Day In Paradise (Official Music Video).mp3', title: 'Another Day In Paradise', artist: 'Phil Collins', imgSrc: 'cover237.jpg' },
    { src: 'utwory/muzyka/PIERSI - Balkanica (Official Video) [HD].mp3', title: 'Balkanica', artist: 'PIERSI', imgSrc: 'cover238.jpg' },
    { src: 'utwory/muzyka/Pirates of the Caribbean - He\'s a Pirate (Extended).mp3', title: 'He\'s a Pirate', artist: 'Pirates of the Caribbean', imgSrc: 'cover239.jpg' },
    { src: 'utwory/muzyka/Pitbull - Back in Time.mp3', title: 'Back in Time', artist: 'Pitbull', imgSrc: 'cover240.jpg' },
    { src: 'utwory/muzyka/Pitbull - Feel This Moment (Official Video) ft. Christina Aguilera.mp3', title: 'Feel This Moment', artist: 'Pitbull ft. Christina Aguilera', imgSrc: 'cover241.jpg' },
    { src: 'utwory/muzyka/Pitbull - Hotel Room Service (Lyrics).mp3', title: 'Hotel Room Service', artist: 'Pitbull', imgSrc: 'cover242.jpg' },
    { src: 'utwory/muzyka/Pitbull - International Love (Official Video) ft. Chris Brown.mp3', title: 'International Love', artist: 'Pitbull ft. Chris Brown', imgSrc: 'cover243.jpg' },
    { src: 'utwory/muzyka/David Guetta - Play Hard (feat. Ne-Yo & Akon) (New Edit).mp3', title: 'Play Hard', artist: 'David Guetta feat. Ne-Yo & Akon', imgSrc: 'cover244.jpg' },
    { src: 'utwory/muzyka/Push It To The Limit (scarface).mp3', title: 'Push It To The Limit', artist: 'Unknown', imgSrc: 'cover245.jpg' },
    { src: 'utwory/muzyka/Queen - Don\'t Stop Me Now (Official Video).mp3', title: 'Don\'t Stop Me Now', artist: 'Queen', imgSrc: 'cover246.jpg' },
    { src: 'utwory/muzyka/Rag\'n\'Bone Man - Human (Official Video).mp3', title: 'Human', artist: 'Rag\'n\'Bone Man', imgSrc: 'cover247.jpg' },
    { src: 'utwory/muzyka/Rag\'n\'Bone Man - Skin (Audio).mp3', title: 'Skin', artist: 'Rag\'n\'Bone Man', imgSrc: 'cover248.jpg' },
    { src: 'utwory/muzyka/Ray Parker Jr. - Ghostbusters (Official Video).mp3', title: 'Ghostbusters', artist: 'Ray Parker Jr.', imgSrc: 'cover249.jpg' },
    { src: 'utwory/muzyka/Reality - Lost Frequencies (Lyrics + Music Video).mp3', title: 'Reality', artist: 'Lost Frequencies', imgSrc: 'cover250.jpg' },
    { src: 'utwory/muzyka/Feature Cast - Recipe for the Perfect Afro.mp3', title: 'Recipe for the Perfect Afro', artist: 'Feature Cast', imgSrc: 'cover251.jpg' },
    { src: 'utwory/muzyka/Red Alert 2 - Hell March 2.mp3', title: 'Hell March 2', artist: 'Red Alert 2', imgSrc: 'cover252.jpg' },
    { src: 'utwory/muzyka/Red Alert 3 Theme - Soviet March.mp3', title: 'Soviet March', artist: 'Red Alert 3', imgSrc: 'cover253.jpg' },
    { src: 'utwory/muzyka/Hitler - Red Sun In The Sky (AI Cover).mp3', title: 'Red Sun In The Sky', artist: 'Hitler', imgSrc: 'cover254.jpg' },
    { src: 'utwory/muzyka/Rick Astley - Never Gonna Give You Up (Official Music Video).mp3', title: 'Never Gonna Give You Up', artist: 'Rick Astley', imgSrc: 'cover255.jpg' },
    { src: 'utwory/muzyka/Ricky Martin - Livin\' La Vida Loca (Official Video).mp3', title: 'Livin\' La Vida Loca', artist: 'Ricky Martin', imgSrc: 'cover256.jpg' },
    { src: 'utwory/muzyka/Rihanna - We Found Love (lyrics ft. Calvin Harris).mp3', title: 'We Found Love', artist: 'Rihanna ft. Calvin Harris', imgSrc: 'cover257.jpg' },
    { src: 'utwory/muzyka/Robbie Williams - Love My Life (Official Video).mp3', title: 'Love My Life', artist: 'Robbie Williams', imgSrc: 'cover258.jpg' },
    { src: 'utwory/muzyka/Robbie Williams - The Road To Mandalay.mp3', title: 'The Road To Mandalay', artist: 'Robbie Williams', imgSrc: 'cover259.jpg' },
    { src: 'utwory/muzyka/Robert Palmer & UB40 - I\'ll Be Your Baby Tonight.mp3', title: 'I\'ll Be Your Baby Tonight', artist: 'Robert Palmer & UB40', imgSrc: 'cover260.jpg' },
    { src: 'utwory/muzyka/Rocky theme song.mp3', title: 'Rocky theme song', artist: 'Unknown', imgSrc: 'cover261.jpg' },
    { src: 'utwory/muzyka/Rollomatik - Wrap It.mp3', title: 'Wrap It', artist: 'Rollomatik', imgSrc: 'cover262.jpg' },
    { src: 'utwory/muzyka/Running in the 90\'s.mp3', title: 'Running in the 90\'s', artist: 'Unknown', imgSrc: 'cover263.jpg' },
    { src: 'utwory/muzyka/Russian Airborne Troops (VDV) Music Video.mp3', title: 'Russian Airborne Troops (VDV)', artist: 'Unknown', imgSrc: 'cover264.jpg' },
    { src: 'utwory/muzyka/Russian Folk Music - Kalinka (balalaika).mp3', title: 'Kalinka', artist: 'Russian Folk Music', imgSrc: 'cover265.jpg' },
    { src: 'utwory/muzyka/Sabaton - Rorke\'s Drift (Music Video).mp3', title: 'Rorke\'s Drift', artist: 'Sabaton', imgSrc: 'cover266.jpg' },
    { src: 'utwory/muzyka/Sam Butera & The Witnesses - Let The Good Times Roll (Mafia II soundtrack).mp3', title: 'Let The Good Times Roll', artist: 'Sam Butera & The Witnesses', imgSrc: 'cover267.jpg' },
    { src: 'utwory/muzyka/Scott McKenzie - San Francisco.mp3', title: 'San Francisco', artist: 'Scott McKenzie', imgSrc: 'cover268.jpg' },
    { src: 'utwory/muzyka/Shakira - Whenever, Wherever (Lyrics).mp3', title: 'Whenever, Wherever', artist: 'Shakira', imgSrc: 'cover269.jpg' },
    { src: 'utwory/muzyka/Sheppard - Geronimo (Official Music Video).mp3', title: 'Geronimo', artist: 'Sheppard', imgSrc: 'cover270.jpg' },
    { src: 'utwory/muzyka/Skillet - Monster (Official Video).mp3', title: 'Monster', artist: 'Skillet', imgSrc: 'cover271.jpg' },
    { src: 'utwory/muzyka/Slade - Far Far Away (1974) + TopPop.mp3', title: 'Far Far Away', artist: 'Slade', imgSrc: 'cover272.jpg' },
    { src: 'utwory/muzyka/Smash Mouth - All Star [Bass Boosted].mp3', title: 'All Star', artist: 'Smash Mouth', imgSrc: 'cover273.jpg' },
    { src: 'utwory/muzyka/Smash Mouth - I\'m A Believer.mp3', title: 'I\'m A Believer', artist: 'Smash Mouth', imgSrc: 'cover274.jpg' },
    { src: 'utwory/muzyka/Michael Jackson - Smooth Criminal (Radio Edit).mp3', title: 'Smooth Criminal', artist: 'Michael Jackson', imgSrc: 'cover275.jpg' },
    { src: 'utwory/muzyka/Hideki Naganuma - Sneakman.mp3', title: 'Sneakman', artist: 'Hideki Naganuma', imgSrc: 'cover276.jpg' },
    { src: 'utwory/muzyka/Serge Bijaoui - Song for Denise (Maxi Version).mp3', title: 'Song for Denise', artist: 'Serge Bijaoui', imgSrc: 'cover277.jpg' },
    { src: 'utwory/muzyka/Status Quo - In The Army Now.mp3', title: 'In The Army Now', artist: 'Status Quo', imgSrc: 'cover278.jpg' },
    { src: 'utwory/muzyka/Edward Maya feat. Vika Jigulina - Stereo Love (Radio Edit).mp3', title: 'Stereo Love', artist: 'Edward Maya feat. Vika Jigulina', imgSrc: 'cover279.jpg' },
    { src: 'utwory/muzyka/Steve Miller Band - Abracadabra.mp3', title: 'Abracadabra', artist: 'Steve Miller Band', imgSrc: 'cover280.jpg' },
    { src: 'utwory/muzyka/Still M.A.Y. (featuring Snoop Mogg) - Theresa May\'s Chronic Brexit.mp3', title: 'Theresa May\'s Chronic Brexit', artist: 'Still M.A.Y. ft. Snoop Mogg', imgSrc: 'cover281.jpg' },
    { src: 'utwory/muzyka/Street Fighter 5 - Ken\'s Theme.mp3', title: 'Ken\'s Theme', artist: 'Street Fighter 5', imgSrc: 'cover282.jpg' },
    { src: 'utwory/muzyka/Supergrass - Alright (Official HD Video).mp3', title: 'Alright', artist: 'Supergrass', imgSrc: 'cover283.jpg' },
    { src: 'utwory/muzyka/Survivor - Eye Of The Tiger (Official HD Video).mp3', title: 'Eye Of The Tiger', artist: 'Survivor', imgSrc: 'cover284.jpg' },
    { src: 'utwory/muzyka/Marek Jan Kisielin - Środa Cawartek.mp3', title: 'Środa Cawartek', artist: 'Marek Jan Kisielin', imgSrc: 'cover285.jpg' },
    { src: 'utwory/muzyka/Taylor Swift - Blank Space (Lyrics).mp3', title: 'Blank Space', artist: 'Taylor Swift', imgSrc: 'cover286.jpg' },
    { src: 'utwory/muzyka/Taylor Swift - Shake It Off Piotr Zyla Remix.mp3', title: 'Shake It Off (Piotr Zyla Remix)', artist: 'Taylor Swift', imgSrc: 'cover287.jpg' },
    { src: 'utwory/muzyka/Taylor Swift - Shake It Off.mp3', title: 'Shake It Off', artist: 'Taylor Swift', imgSrc: 'cover288.jpg' },
    { src: 'utwory/muzyka/The Immortals - Techno Syndrome (Mortal Kombat Song).mp3', title: 'Techno Syndrome', artist: 'The Immortals', imgSrc: 'cover289.jpg' },
    { src: 'utwory/muzyka/TEKST - Jak nie my to kto.mp3', title: 'Jak nie my to kto', artist: 'TEKST', imgSrc: 'cover290.jpg' },
    { src: 'utwory/muzyka/Ten Tonnes - Silver Heat (Official Audio).mp3', title: 'Silver Heat', artist: 'Ten Tonnes', imgSrc: 'cover291.jpg' },
    { src: 'utwory/muzyka/The Black Eyed Peas - I Gotta Feeling (Official Music Video).mp3', title: 'I Gotta Feeling', artist: 'The Black Eyed Peas', imgSrc: 'cover292.jpg' },
    { src: 'utwory/muzyka/The Black Eyed Peas - Meet Me Halfway (Lyrics).mp3', title: 'Meet Me Halfway', artist: 'The Black Eyed Peas', imgSrc: 'cover293.jpg' },
    { src: 'utwory/muzyka/The British Grenadiers fife and drum.mp3', title: 'The British Grenadiers', artist: 'Unknown', imgSrc: 'cover294.jpg' },
    { src: 'utwory/muzyka/The Dictator Theme Song (Aladeen Motherf***er) HD.mp3', title: 'The Dictator Theme Song (Aladeen Motherf***er)', artist: 'Unknown', imgSrc: 'cover295.jpg' },
    { src: 'utwory/muzyka/Europe - The Final Countdown.mp3', title: 'The Final Countdown', artist: 'Europe', imgSrc: 'cover296.jpg' },
    { src: 'utwory/muzyka/The Godfather - Tarantella Napoletana (Trap remix).mp3', title: 'Tarantella Napoletana (Trap remix)', artist: 'The Godfather', imgSrc: 'cover297.jpg' },
    { src: 'utwory/muzyka/The Kolors - ITALODISCO (Lyric Video).mp3', title: 'ITALODISCO', artist: 'The Kolors', imgSrc: 'cover298.jpg' },
    { src: 'utwory/muzyka/The Missile Knows Where It Is (Remix) - OFFICIAL MUSIC VIDEO.mp3', title: 'The Missile Knows Where It Is (Remix)', artist: 'Unknown', imgSrc: 'cover299.jpg' },
    { src: 'utwory/muzyka/The Munchables OST - 18 - Rank S.mp3', title: 'Rank S', artist: 'The Munchables OST', imgSrc: 'cover300.jpg' },
    { src: 'utwory/muzyka/The Pointer Sisters - I\'m so excited.mp3', title: 'I\'m so excited', artist: 'The Pointer Sisters', imgSrc: 'cover301.jpg' },
    { src: 'utwory/muzyka/Huey Lewis And The News - The Power Of Love.mp3', title: 'The Power Of Love', artist: 'Huey Lewis And The News', imgSrc: 'cover302.jpg' },
    { src: 'utwory/muzyka/The Rolling Stones - Paint It, Black (Official Lyric Video).mp3', title: 'Paint It, Black', artist: 'The Rolling Stones', imgSrc: 'cover303.jpg' },
    { src: 'utwory/muzyka/The Verve - Bitter Sweet Symphony.mp3', title: 'Bitter Sweet Symphony', artist: 'The Verve', imgSrc: 'cover304.jpg' },
    { src: 'utwory/muzyka/MACKLEMORE & RYAN LEWIS - This is the moment tonight (feat. Ray Dalton) (Can\'t Hold Us).mp3', title: 'Can\'t Hold Us', artist: 'MACKLEMORE & RYAN LEWIS ft. Ray Dalton', imgSrc: 'cover305.jpg' },
    { src: 'utwory/muzyka/Ke$ha - Tik Tok.mp3', title: 'Tik Tok', artist: 'Ke$ha', imgSrc: 'cover306.jpg' },
    { src: 'utwory/muzyka/Tina Turner - The Best (Official Music Video).mp3', title: 'The Best', artist: 'Tina Turner', imgSrc: 'cover307.jpg' },
    { src: 'utwory/muzyka/Tokyo Drift (Fast & Furious) (from The Fast And The Furious Tokyo Drift Soundtrack).mp3', title: 'Tokyo Drift', artist: 'Unknown', imgSrc: 'cover308.jpg' },
    { src: 'utwory/muzyka/Tom Jones - Sexbomb (Lyrics).mp3', title: 'Sexbomb', artist: 'Tom Jones', imgSrc: 'cover309.jpg' },
    { src: 'utwory/muzyka/Sexbomb (lyrics).mp3', title: 'Sexbomb', artist: 'Unknown', imgSrc: 'cover310.jpg' },
    { src: 'utwory/muzyka/TOP GUN - DANGER ZONE (Music Video).mp3', title: 'DANGER ZONE', artist: 'TOP GUN', imgSrc: 'cover311.jpg' },
    { src: 'utwory/muzyka/Toto - Hold The Line (Official Video).mp3', title: 'Hold The Line', artist: 'Toto', imgSrc: 'cover312.jpg' },
    { src: 'utwory/muzyka/Trainwreck OF Electro Swing.mp3', title: 'Trainwreck OF Electro Swing', artist: 'Unknown', imgSrc: 'cover313.jpg' },
    { src: 'utwory/muzyka/Daler Mehndi - Tunak Tunak Tun (Full Video) Superhit Punjabi Song.mp3', title: 'Tunak Tunak Tun', artist: 'Daler Mehndi', imgSrc: 'cover314.jpg' },
    { src: 'utwory/muzyka/twenty one pilots - Heathens (from Suicide Squad The Album) [OFFICIAL VIDEO].mp3', title: 'Heathens', artist: 'twenty one pilots', imgSrc: 'cover315.jpg' },
    { src: 'utwory/muzyka/twenty one pilots - Stressed Out [OFFICIAL VIDEO].mp3', title: 'Stressed Out', artist: 'twenty one pilots', imgSrc: 'cover316.jpg' },
    { src: 'utwory/muzyka/U got that (WWII Edition).mp3', title: 'U got that (WWII Edition)', artist: 'Unknown', imgSrc: 'cover317.jpg' },
    { src: 'utwory/muzyka/Uptown Girl.mp3', title: 'Uptown Girl', artist: 'Billy Joel', imgSrc: 'cover318.jpg' },
    { src: 'utwory/muzyka/USSR National Anthem - Be glorious, our free Swampland.mp3', title: 'Be glorious, our free Swampland', artist: 'USSR National Anthem', imgSrc: 'cover319.jpg' },
    { src: 'utwory/muzyka/Vance Joy - Riptide (Lyrics).mp3', title: 'Riptide', artist: 'Vance Joy', imgSrc: 'cover320.jpg' },
    { src: 'utwory/muzyka/Marquess - Vayamos compañeros (Alternativ Radio Mix).mp3', title: 'Vayamos compañeros', artist: 'Marquess', imgSrc: 'cover321.jpg' },
    { src: 'utwory/muzyka/Vera Palm - Weil mein Daddy dich gut leiden kann.webm', title: 'Weil mein Daddy dich gut leiden kann', artist: 'Vera Palm', imgSrc: 'cover322.jpg' },
    { src: 'utwory/muzyka/Walk The Moon - Shut Up And Dance (Lyrics).mp3', title: 'Shut Up And Dance', artist: 'Walk The Moon', imgSrc: 'cover323.jpg' },
    { src: 'utwory/muzyka/Wally Lopez - You Can\'t Stop the Beat ft. Jamie Scott (Official Music Video).mp3', title: 'You Can\'t Stop the Beat', artist: 'Wally Lopez ft. Jamie Scott', imgSrc: 'cover324.jpg' },
    { src: 'utwory/muzyka/Walter, Straznik Skoków Narciarskich.mp3', title: 'Walter, Straznik Skoków Narciarskich', artist: 'Unknown', imgSrc: 'cover325.jpg' },
    { src: 'utwory/muzyka/We Are Number One but it\'s a L\'Amour Toujours remix.mp3', title: 'We Are Number One but it\'s a L\'Amour Toujours remix', artist: 'Unknown', imgSrc: 'cover326.jpg' },
    { src: 'utwory/muzyka/We Are Number One but NUMA NUMA YAY.mp3', title: 'We Are Number One but NUMA NUMA YAY', artist: 'Unknown', imgSrc: 'cover327.jpg' },
    { src: 'utwory/muzyka/We Are Number One so call me maybe.mp3', title: 'We Are Number One so call me maybe', artist: 'Unknown', imgSrc: 'cover328.jpg' },
    { src: 'utwory/muzyka/Billy Joel - We Didn\'t Start the Fire.mp3', title: 'We Didn\'t Start the Fire', artist: 'Billy Joel', imgSrc: 'cover329.jpg' },
    { src: 'utwory/muzyka/Wham! - Last Christmas (Official Video).mp3', title: 'Last Christmas', artist: 'Wham!', imgSrc: 'cover330.jpg' },
    { src: 'utwory/muzyka/Joe Cocker - What Becomes of the Broken-Hearted.mp3', title: 'What Becomes of the Broken-Hearted', artist: 'Joe Cocker', imgSrc: 'cover331.jpg' },
    { src: 'utwory/muzyka/When the DOOM music kicks in.mp3', title: 'When the DOOM music kicks in', artist: 'Unknown', imgSrc: 'cover332.jpg' },
    { src: 'utwory/muzyka/Whitney Houston - I Wanna Dance With Somebody (Official 4K Video).mp3', title: 'I Wanna Dance With Somebody', artist: 'Whitney Houston', imgSrc: 'cover333.jpg' },
    { src: 'utwory/muzyka/Wilki - Bohema (Official Music Video).mp3', title: 'Bohema', artist: 'Wilki', imgSrc: 'cover334.jpg' },
    { src: 'utwory/muzyka/Wilki - Nie Stało Się Nic.mp3', title: 'Nie Stało Się Nic', artist: 'Wilki', imgSrc: 'cover335.jpg' },
    { src: 'utwory/muzyka/Winnie The Pooh dancing to Pitbull (full song).mp3', title: 'Winnie The Pooh dancing to Pitbull', artist: 'Unknown', imgSrc: 'cover336.jpg' },
    { src: 'utwory/muzyka/Wiz Khalifa - See You Again ft. Charlie Puth (Official Video) Furious 7 Soundtrack.mp3', title: 'See You Again', artist: 'Wiz Khalifa ft. Charlie Puth', imgSrc: 'cover337.jpg' },
    { src: 'utwory/muzyka/Wonder Boy.mp3', title: 'Wonder Boy', artist: 'Syncro', imgSrc: 'cover338.jpg' },
    { src: 'utwory/muzyka/XS Project - Lincoln.mp3', title: 'Lincoln', artist: 'XS Project', imgSrc: 'cover339.jpg' },
    { src: 'utwory/muzyka/Yolanda Be Cool & DCUP - We No Speak Americano (Official Video).mp3', title: 'We No Speak Americano', artist: 'Yolanda Be Cool & DCUP', imgSrc: 'cover340.jpg' },
    { src: 'utwory/muzyka/You\'re Ma Cherie (DJ Antoine vs. Mad Mark) [2K13 Radio Edit] [feat. Pitbull].mp3', title: 'You\'re Ma Cherie', artist: 'DJ Antoine vs. Mad Mark ft. Pitbull', imgSrc: 'cover341.jpg' },
    { src: 'utwory/muzyka/YTPMV - Uptown Rosen.mp3', title: 'Uptown Rosen', artist: 'YTPMV', imgSrc: 'cover342.jpg' },
    { src: 'utwory/muzyka/Yugopolis & Maciej Malenczuk - Ostatnia nocka (official audio).mp3', title: 'Ostatnia nocka', artist: 'Yugopolis & Maciej Malenczuk', imgSrc: 'cover343.jpg' },
    { src: 'utwory/muzyka/Элджей & Feduk - Розовое вино.mp3', title: 'Розовое вино', artist: 'Элджей & Feduk', imgSrc: 'cover344.jpg' }
];


const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause');
const loopButton = document.getElementById('loop');
const loopIcon = document.getElementById('loop-icon');
const speedControl = document.getElementById('speed');
const volumeControl = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');
const searchBar = document.getElementById('search-bar');
const randomTracks = document.getElementById('random-tracks');
const musicSection = document.getElementById('music-section');
const autoplayButton = document.getElementById('autoplay');

// Zaktualizuj przycisk autoplay na początkowym stanie
autoplayButton.textContent = 'Wyłącz autoodtwarzanie';

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (isLooping) {
        audio.play();
    } else if (isAutoplayEnabled) {
        nextTrack();
    } else {
        isPlaying = false;
        updatePlayPauseButton();
    }
});

searchBar.addEventListener('input', filterTracks);
volumeControl.addEventListener('input', changeVolume); // Aktualizuje głośność podczas przeciągania

// Dodanie obsługi klawiszy
document.addEventListener('keydown', (event) => {
    // Sprawdzanie, czy pole wyszukiwania jest aktywne
    if (document.activeElement === searchBar) {
        return;
    }

    const key = event.key.toLowerCase();
    switch (key) {
        case 'k':
        case ' ':
            event.preventDefault(); // Zapobiega przewijaniu strony przy użyciu spacji
            togglePlay();
            break;
        case 'm':
            toggleMute();
            break;
        case 'l':
            toggleLoop();
            break;
        case 'n':
            nextTrack();
            break;
        case 'b':
            prevTrack();
            break;
        case ',':
            rewind15();
            break;
        case '.':
            forward15();
            break;
        case 'p':
            increaseVolume();
            break;
        case 'o':
            decreaseVolume();
            break;
    }
});

function playMusic(src, title, artist) {
    audio.src = src;
    audio.play();
    isPlaying = true;
    updateTrackInfo(title, artist);
    updatePlayPauseButton();
    document.title = `${title} - ${artist}`;
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
    updatePlayPauseButton();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
}

function toggleLoop() {
    isLooping = !isLooping;
    loopIcon.src = isLooping ? 'loop_on.png' : 'loop_off.png';
    loopButton.classList.toggle('active', isLooping);
}

function rewind15() {
    audio.currentTime = Math.max(0, audio.currentTime - 15);
}

function forward15() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
}

function changeSpeed(event) {
    audio.playbackRate = event.target.value;
}

function changeVolume(event) {
    audio.volume = event.target.value / 100;
    if (audio.volume === 0) {
        volumeIcon.src = 'mute.png';
    } else {
        volumeIcon.src = 'volume_on.png';
    }
    isMuted = audio.volume === 0;
}

function increaseVolume() {
    let newVolume = Math.min(audio.volume + 0.1, 1);
    audio.volume = newVolume;
    volumeControl.value = newVolume * 100;
    volumeIcon.src = 'volume_on.png';
    isMuted = false;
}

function decreaseVolume() {
    let newVolume = Math.max(audio.volume - 0.1, 0);
    audio.volume = newVolume;
    volumeControl.value = newVolume * 100;
    if (newVolume === 0) {
        volumeIcon.src = 'mute.png';
        isMuted = true;
    } else {
        volumeIcon.src = 'volume_on.png';
        isMuted = false;
    }
}

function toggleMute() {
    if (isMuted) {
        audio.volume = previousVolume;
        volumeControl.value = previousVolume * 100;
        volumeIcon.src = 'volume_on.png';
    } else {
        previousVolume = audio.volume;
        audio.volume = 0;
        volumeControl.value = 0;
        volumeIcon.src = 'mute.png';
    }
    isMuted = !isMuted;
}

function toggleAutoplay() {
    isAutoplayEnabled = !isAutoplayEnabled;
    autoplayButton.textContent = isAutoplayEnabled ? 'Wyłącz autoodtwarzanie' : 'Włącz autoodtwarzanie';
}

function updateTrackInfo(title, artist) {
    trackTitle.textContent = title;
    trackArtist.textContent = artist;
}

function updateProgress() {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent = formatTime(audio.duration);
}

function seek(event) {
    const seekTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

function loadTrack(index) {
    const track = tracks[index];
    playMusic(track.src, track.title, track.artist);
}

function updatePlayPauseButton() {
    playPauseButton.innerHTML = isPlaying ? '&#10074;&#10074;' : '&#9654;';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function filterTracks() {
    const searchValue = searchBar.value.toLowerCase();
    const trackItems = randomTracks.getElementsByClassName('track-item');
    const playlistItems = musicSection.getElementsByClassName('playlist-item');

    for (const item of trackItems) {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }

    for (const item of playlistItems) {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
}

function shuffleTracks(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateTrackElements() {
    randomTracks.innerHTML = '';
    musicSection.innerHTML = '';

    tracks.forEach((track, index) => {
        // Tworzenie elementu dla bocznego paska
        const trackItem = document.createElement('div');
        trackItem.className = 'track-item';
        trackItem.textContent = `${track.title} - ${track.artist}`;
        trackItem.onclick = () => loadTrack(index);
        randomTracks.appendChild(trackItem);

        // Tworzenie elementu dla sekcji z obrazkami
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.onclick = () => loadTrack(index);
        const img = document.createElement('img');
        img.src = track.imgSrc; // Ścieżka do obrazu dla każdego utworu
        img.alt = 'Cover Image';
        playlistItem.appendChild(img);
        const titleDiv = document.createElement('div');
        titleDiv.textContent = track.title;
        playlistItem.appendChild(titleDiv);
        musicSection.appendChild(playlistItem);
    });
}

// Przemieszanie utworów przy każdym uruchomieniu strony
shuffleTracks(tracks);

// Inicjalizacja pierwszego utworu i generowanie elementów ścieżki
generateTrackElements();
loadTrack(currentTrackIndex);
updatePlayPauseButton();