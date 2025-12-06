(() => {
  const basePath = 'utwory/muzyka/';
  const favoritesStorageKey = 'mx_music_favorites_v2';

  const trackLibrary = [
    { title: 'Bad Romance', artist: 'Adolf Hitler (AI Cover)', file: '(RECREATION) Adolf Hitler -  Bad Romance (Ai Cover).mp3', accent: '#fb7185' },
    { title: 'James Bond Theme', artist: '007', file: '007  James Bond  Theme.mp3', accent: '#facc15' },
    { title: 'ĹšCIERNISKO', artist: 'BRACIA PIERDOLEC (Fredie Mercury)', file: '1_BRACIA PIERDOLEC - ĹšCIERNISKO Fredie Mercury.mp3', accent: '#22d3ee' },
    { title: 'Heaven Is a Place on Earth', artist: 'Fredie Mercury', file: '1_Belinda Carlisle Fredie Mercury.mp3', accent: '#f97316' },
    { title: 'This Is What You Came For', artist: 'Fredie Mercury', file: '1_Calvin Harris, Rihanna - This Is What You Came For Fredie Mercury.mp3', accent: '#60a5fa' },
    { title: 'Danza Kuduro', artist: 'Fredie Mercury', file: '1_Danza Kuduro-Fredie Mercury.mp3', accent: '#f472b6' },
    { title: 'A Little Party Never Killed Nobody', artist: 'Fredie Mercury', file: '1_Fredie Mercury - A Little Party Never Killed Nobody (All We Got) ft. Q-Tip, GoonRock_(Instrumental).mp3', accent: '#a855f7' },
    { title: 'ITALODISCO', artist: 'Fredie Mercury', file: '1_Fredie Mercury - ITALODISCO (TestoLyrics)_(Vocals)_RVC_1.mp3', accent: '#38bdf8' },
    { title: 'The Road To Mandalay', artist: 'Fredie Mercury', file: '1_Fredie Mercury - The Road To Mandalay_(Instrumental).mp3', accent: '#4c1d95' },
    { title: 'Venus', artist: 'Fredie Mercury', file: '1_Fredie Mercury - Venus (Lyrics)_(Instrumental).mp3', accent: '#2563eb' },
    { title: 'When We Stand Together', artist: 'Fredie Mercury', file: '1_Fredie Mercury - When We Stand Together_(Instrumental).mp3', accent: '#ef4444' },
    { title: 'Boulevard of Broken Dreams', artist: 'Fredie Mercury', file: '1_Fredie Mercury -Boulevard of Broken Dreams lyrics_(Instrumental).mp3', accent: '#34d399' },
    { title: 'Whistle', artist: 'Fredie Mercury', file: '1_Fredie Mercury- Whistle [Official Video]_(Instrumental).mp3', accent: '#14b8a6' },
    { title: 'Heaven Is a Place on Earth', artist: 'Fredie Mercury', file: '1_Heaven Is a Place on Earth_-Fredie Mercury.mp3', accent: '#ea580c' },
    { title: 'Hotel Room Service', artist: 'Weird Al (Pitbull cover)', file: '1_Pitbull - Hotel Room Service Weird Al.mp3', accent: '#f59e0b' },
    { title: 'The Best', artist: 'Fredie Mercury (Tina Turner)', file: '1_Tina Turner - The Best Fredie Mercury.mp3', accent: '#22c55e' },
    { title: 'Get Ready For This', artist: '2 UNLIMITED', file: '2 UNLIMITED - Get Ready For This (Official Music Video).webm', accent: '#ec4899' },
    { title: 'Gimme! Gimme! Gimme!', artist: 'ABBA', file: 'ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3', accent: '#fbbf24' },
    { title: 'The Liberation Of Gracemeria', artist: 'Ace Combat 6 OST', file: 'Ace Combat 6 OST - The Liberation Of Gracemeria.mp3', accent: '#3b82f6' },
    { title: 'All That She Wants', artist: 'Ace of Base', file: 'Ace of Base - All That She Wants (Official Music Video).mp3', accent: '#84cc16' },
    { title: 'Ghost Town', artist: 'Adam Lambert', file: 'Adam Lambert - Ghost Town [Official Music Video].mp3', accent: '#6366f1' },
    { title: 'Barbie Girl', artist: 'Adolf Hitler (AI Cover)', file: 'Adolf Hitler - Barbie Girl [Ai Cover].mp3', accent: '#dc2626' },
    { title: 'All Falls Down', artist: 'Alan Walker feat. Noah Cyrus', file: 'Alan Walker - All Falls Down (feat. Noah Cyrus with Digital Farm Animals).mp3', accent: '#1f2937' },
    { title: 'Alone', artist: 'Alan Walker', file: 'Alan Walker - Alone.mp3', accent: '#0ea5e9' },
    { title: 'Faded', artist: 'Alan Walker', file: 'Alan Walker - Faded.mp3', accent: '#7c3aed' },
    { title: 'Sing Me To Sleep', artist: 'Alan Walker', file: 'Alan Walker - Sing Me To Sleep.mp3', accent: '#fb7185' },
    { title: 'Man On The Moon', artist: 'Alan Walker x Benjamin Ingrosso', file: 'Alan Walker x Benjamin Ingrosso - Man On The Moon (Official Music Video).mp3', accent: '#facc15' },
    { title: 'Alejandro', artist: 'Lady Gaga', file: 'Alejandro - Lady Gaga (Lyrics) đźŽµ.mp3', accent: '#22d3ee' },
    { title: 'Mr. Saxobeat', artist: 'Alexandra Stan', file: 'Alexandra Stan - Mr. Saxobeat (Official Video).mp3', accent: '#f97316' },
    { title: 'All Star', artist: 'Doofenshmirtz AI Cover', file: 'All Star Doofenshmirtz AI Cover.mp3', accent: '#60a5fa' },
    { title: 'Please Tell Rosie', artist: 'Alle Farben', file: 'Alle Farben Please Tell Rosie (Lyric Video).mp3', accent: '#f472b6' },
    { title: 'I Need A Dollar', artist: 'Aloe Blacc', file: 'Aloe Blacc - I Need A Dollar.mp3', accent: '#a855f7' },
    { title: 'El Mismo Sol', artist: 'Alvaro Soler', file: 'Alvaro Soler - El Mismo Sol (Official Music Video).mp3', accent: '#38bdf8' },
    { title: 'El Mismo Sol', artist: 'Alvaro Soler', file: 'Alvaro Soler - El Mismo Sol.mp3', accent: '#4c1d95' },
    { title: 'La Cintura', artist: 'Alvaro Soler', file: 'Alvaro Soler - La Cintura - Lyrics  Letra.mp3', accent: '#2563eb' },
    { title: 'Sofia', artist: 'Alvaro Soler', file: 'Alvaro Soler - Sofia (Official Music Video).mp3', accent: '#ef4444' },
    { title: 'Sofia', artist: 'Alvaro Soler', file: 'Alvaro Soler - Sofia.mp3', accent: '#34d399' },
    { title: 'Best Day Of My Life', artist: 'American Authors', file: 'American Authors - Best Day Of My Life.mp3', accent: '#14b8a6' },
    { title: 'Slow It Down', artist: 'Amy Macdonald', file: 'Amy Macdonald - Slow It Down (Official Video).mp3', accent: '#ea580c' },
    { title: 'This Is The Life', artist: 'Amy Macdonald', file: 'Amy Macdonald - This Is The Life.mp3', accent: '#f59e0b' },
    { title: 'Barbie Girl', artist: 'Aqua', file: 'Aqua - Barbie Girl (Official Music Video).mp3', accent: '#22c55e' },
    { title: 'AserejĂ© (The Ketchup Song)', artist: 'Las Ketchup', file: 'AserejĂ© (The Ketchup Song) - Las Ketchup ( letra  lyrics ) [ Spanish Version ].mp3', accent: '#ec4899' },
    { title: 'AserejĂ© (The Ketchup Song)', artist: 'Las Ketchup', file: 'AserejĂ© (The Ketchup Song) [Spanish Version] - Las Ketchup.mp3', accent: '#fbbf24' },
    { title: 'Narkotik Kal', artist: 'Hard Bass School', file: 'BASS BOOSTED  Hard Bass School - Narkotik Kal.mp3', accent: '#3b82f6' },
    { title: 'ĹšCIERNISKO', artist: 'BRACIA PIERDOLEC', file: 'BRACIA PIERDOLEC - ĹšCIERNISKO (cover) (reupload).mp3', accent: '#84cc16' },
    { title: 'Bad Boys', artist: 'Theme from COPS', file: 'Bad Boys (Theme from COPS).mp3', accent: '#6366f1' },
    { title: 'Venus', artist: 'Bananarama', file: 'Bananarama - Venus (Lyrics).mp3', accent: '#dc2626' },
    { title: 'Bandoleros', artist: 'Don Omar', file: 'Bandoleros.mp3', accent: '#1f2937' },
    { title: 'DotA', artist: 'Basshunter', file: 'Basshunter - Vi sitter i ventrilo och spelar DotA.mp3', accent: '#0ea5e9' },
    { title: 'Battlefield 4 Main Theme', artist: 'Battlefield 4 OST', file: 'Battlefield 4 - OFFICIAL MAIN THEME (Extended).mp3', accent: '#7c3aed' },
    { title: 'Tu Condamnes', artist: 'Bertysolo', file: 'Bertysolo - Tu Condamnes (Instrumental).mp3', accent: '#fb7185' },
    { title: 'Axel F', artist: 'Beverly Hills Cop', file: 'Beverly Hills Cop Main Theme.mp3', accent: '#facc15' },
    { title: 'Paranoid', artist: 'Black Sabbath', file: 'Black Sabbath - Paranoid (HQ).mp3', accent: '#22d3ee' },
    { title: 'A Lalala Long', artist: 'Bob Marley', file: 'Bob Marley - A lalala long.mp3', accent: '#f97316' },
    { title: "Don't Worry Be Happy", artist: 'Bobby McFerrin', file: "Bobby McFerrin - Don't Worry Be Happy (Official Music Video).mp3", accent: '#60a5fa' },
    { title: "It's My Life", artist: 'Bon Jovi', file: "Bon Jovi - It's My Life (Official Music Video).mp3", accent: '#f472b6' },
    { title: "Livin' On A Prayer", artist: 'Bon Jovi', file: "Bon Jovi - Livin' On A Prayer.mp3", accent: '#a855f7' },
    { title: 'Daddy Cool', artist: 'Boney M', file: 'Boney M - Daddy Cool (Lyrics Video).mp3', accent: '#38bdf8' },
    { title: 'I Need a Hero', artist: 'Bonnie Tyler', file: 'Bonnie Tyler - I Need a Hero (Lyrics).mp3', accent: '#4c1d95' },
    { title: "Baby I'm Yours", artist: 'Breakbot', file: "Breakbot - Baby I'm Yours (feat. Irfane) [Official Audio].mp3", accent: '#2563eb' },
    { title: 'Bring Down', artist: 'Unknown', file: 'Bring Down.mp3', accent: '#ef4444' },
    { title: 'Hungry Heart', artist: 'Bruce Springsteen', file: 'Bruce Springsteen - Hungry Heart (Official Audio).mp3', accent: '#34d399' },
    { title: 'Locked Out Of Heaven', artist: 'Bruno Mars', file: 'Bruno Mars - Locked Out Of Heaven (Official Music Video).mp3', accent: '#14b8a6' },
    { title: 'Treasure', artist: 'Bruno Mars', file: 'Bruno Mars - Treasure (Official Music Video).mp3', accent: '#ea580c' },
    { title: "Busy Earnin'", artist: 'Jungle', file: "Busy Earnin'.mp3", accent: '#f59e0b' },
    { title: 'Safe And Sound', artist: 'Capital Cities', file: 'Capital Cities - Safe And Sound (Official Music Video).mp3', accent: '#22c55e' },
    { title: 'Kung Fu Fighting', artist: 'Carl Douglas', file: 'Carl Douglas  Kung Fu Fighting  (Original Music Video).mp3', accent: '#ec4899' },
    { title: 'Call Me Maybe', artist: 'Carly Rae Jepsen', file: 'Carly Rae Jepsen - Call Me Maybe.mp3', accent: '#fbbf24' },
    { title: 'Run Through The Jungle', artist: 'CCR', file: 'CCR - Run Through The Jungle (Vietnam footage).mp3', accent: '#3b82f6' },
    { title: 'Cheeki Breeki Hardbass Anthem', artist: 'Hard Bass', file: 'Cheeki Breeki Hardbass Anthem.mp3', accent: '#84cc16' },
    { title: 'The Shoop Shoop Song', artist: 'Cher', file: "Cher - The Shoop Shoop Song (It's In His Kiss) [Official Music Video].mp3", accent: '#6366f1' },
    { title: 'Lost Weekend', artist: 'Qemists (DiRT 2)', file: 'Colin McRae DiRT 2 - Soundtrack - Qemists - Lost Weekend.mp3', accent: '#dc2626' },
    { title: 'Little Sister', artist: 'Queens Of The Stone Age', file: 'Colin McRae DiRT 2 - Soundtrack - Queens Of The Stone Age - Little Sister.mp3', accent: '#1f2937' },
    { title: "I'm A Rope", artist: 'Tommy Sparks (DiRT 2)', file: "Colin McRae DiRT 2 - Soundtrack - Tommy Sparks - I'm A Rope.mp3", accent: '#0ea5e9' },
    { title: "Gangsta's Paradise", artist: 'Coolio feat. L.V.', file: "Coolio - Gangsta's Paradise (feat. L.V.) [Official Music Video].mp3", accent: '#7c3aed' },
    { title: 'Axel F', artist: 'Crazy Frog', file: 'Crazy Frog - Axel F (Official Video).mp3', accent: '#fb7185' },
    { title: 'White Room', artist: 'Cream', file: 'Cream - White Room - Lyrics.mp3', accent: '#facc15' },
    { title: 'Fortunate Son', artist: 'Creedence Clearwater Revival', file: 'Creedence Clearwater Revival Fortunate Son.mp3', accent: '#22d3ee' },
    { title: 'Karma Chameleon', artist: 'Culture Club', file: 'Culture Club - Karma Chameleon (Official Music Video).mp3', accent: '#f97316' },
    { title: 'Dorris Day', artist: 'DJ Williams', file: 'DJ Williams  Dorris Day.mp3', accent: '#60a5fa' },
    { title: "X Gon' Give It To Ya", artist: 'DMX', file: "DMX - X Gon' Give It To Ya.mp3", accent: '#f472b6' },
    { title: 'Danza Kuduro', artist: 'Don Omar', file: 'Danza Kuduro.mp3', accent: '#a855f7' },
    { title: 'Sandstorm', artist: 'Darude', file: 'Darude - Sandstorm.mp3', accent: '#38bdf8' },
    { title: 'Misirlou', artist: 'Dick Dale (Pulp Fiction)', file: 'Dick Dale - Misirlou (Pulp Fiction) Extended Version.mp3', accent: '#4c1d95' },
    { title: 'Walk Of Life', artist: 'Dire Straits', file: 'Dire Straits - Walk Of Life.mp3', accent: '#2563eb' },
    { title: 'Still D.R.E.', artist: 'Dr. Dre feat. Snoop Dogg', file: 'Dr. Dre - Still D.R.E. (Official Music Video) ft. Snoop Dogg.mp3', accent: '#ef4444' },
    { title: 'The Next Episode', artist: 'Dr. Dre feat. Snoop Dogg', file: 'Dr. Dre - The Next Episode (Official Music Video) ft. Snoop Dogg, Kurupt, Nate Dogg.mp3', accent: '#34d399' },
    { title: 'Dragostea Din Tei (Eurobeat)', artist: 'O-Zone Remix', file: 'Dragostea Din Tei  Eurobeat Remix.mp3', accent: '#14b8a6' },
    { title: 'Drip of The Japanese Emperor', artist: 'Hirohito Drip', file: 'Drip of The Japanese Emperor (Hirohito Drip).mp3', accent: '#ea580c' },
    { title: 'Shape of You', artist: 'Ed Sheeran', file: 'Ed Sheeran - Shape of You (Lyrics).mp3', accent: '#f59e0b' },
    { title: 'Blue (Da Ba Dee)', artist: 'Eiffel 65', file: 'Eiffel 65 - Blue (Da Ba Dee).mp3', accent: '#22c55e' },
    { title: 'Burn', artist: 'Ellie Goulding', file: 'Ellie Goulding - Burn (Official Video).mp3', accent: '#ec4899' },
    { title: "I'm Still Standing", artist: 'Elton John', file: "Elton John - I'm Still Standing.mp3", accent: '#fbbf24' },
    { title: 'Hungry Eyes', artist: 'Eric Carmen', file: 'Eric Carmen - Hungry Eyes (Video).mp3', accent: '#3b82f6' },
    { title: 'Call on Me', artist: 'Eric Prydz', file: 'Eric Prydz - Call on me (Lyrics).mp3', accent: '#84cc16' },
    { title: 'Eurobeat Intensifies', artist: 'Initial D', file: 'Eurobeat Intensifies 2 (Initial D).mp3', accent: '#6366f1' },
    { title: 'Eye of the Tiger', artist: 'Survivor', file: 'Eye of the Tiger.mp3', accent: '#dc2626' },
    { title: 'Mam wyjebane', artist: 'FIRMA', file: 'FIRMA - Mam wyjebane (official video).mp3', accent: '#1f2937' },
    { title: 'Firework (Duet)', artist: 'Katy Perry ft. Jontron', file: 'Firework Katy Perry ft. Jontron Duet [V-o2m3TCkoo].mp3', accent: '#0ea5e9' },
    { title: 'Good Feeling', artist: 'Flo Rida', file: 'Flo Rida - Good Feeling [Official Video].mp3', accent: '#7c3aed' },
    { title: 'Whistle', artist: 'Flo Rida', file: 'Flo Rida - Whistle [Official Video].mp3', accent: '#fb7185' },
    { title: "I Don't Like It, I Love It", artist: 'Flo Rida ft. Robin Thicke', file: "Flo Rida ft. Robin Thicke & Verdine White - I Don't Like It, I Love It [Official Video].mp3", accent: '#facc15' },
    { title: 'Pumped Up Kicks', artist: 'Foster The People', file: 'Foster The People - Pumped Up Kicks (Official Video).mp3', accent: '#22d3ee' },
    { title: 'Dangerous', artist: 'Fredie Mercury', file: 'Fredie Mercury - Dangerous.mp3', accent: '#f97316' },
    { title: 'Lovers On The Sun', artist: 'Fredie Mercury', file: 'Fredie Mercury - Lovers On The Sun.mp3', accent: '#60a5fa' },
    { title: 'You Give Love A Bad Name', artist: 'Fredie Mercury', file: 'Fredie Mercury - You Give Love A Bad Name.mp3', accent: '#f472b6' },
    { title: "Gangsta's Paradise", artist: 'Fredie Mercury', file: "Fredie Mercury Gangsta's Paradise.mp3", accent: '#a855f7' },
    { title: "It's Raining Men", artist: 'Fredie Mercury', file: 'Fredie Mercury Its Raining Men .mp3', accent: '#38bdf8' },
    { title: 'DotA', artist: 'Fredue Nercury', file: 'Fredue Nercury - Vi sitter i ventrilo och spelar DotA.mp3', accent: '#4c1d95' },
    { title: 'Gangnam Style - Call Me Maybe', artist: 'Mashup', file: 'Gangnam Style - Call Me Maybe.mp3', accent: '#2563eb' },
    { title: "Gangsta's Paradise", artist: 'Coolio', file: "Gangsta's Paradise.mp3", accent: '#ef4444' },
    { title: 'GENTLEMAN', artist: 'Hitler (PSY Parody)', file: 'GENTLEMAN (PSY) from Hitler!.mp3', accent: '#34d399' },
    { title: 'Got My Mind Set On You', artist: 'George Harrison', file: 'George Harrison - Got My Mind Set On You (Version II).mp3', accent: '#14b8a6' },
    { title: 'Careless Whisper', artist: 'George Michael', file: 'George Michael - Careless Whisper (Official Video).mp3', accent: '#ea580c' },
    { title: 'Get Down To It', artist: 'Unknown', file: 'Get Down To It.mp3', accent: '#f59e0b' },
    { title: "L'Amour Toujours", artist: "Gigi D'Agostino", file: "Gigi D'Agostino - L'Amour Toujours (original version).mp3", accent: '#22c55e' },
    { title: 'Volare', artist: 'Gipsy Kings', file: 'Gipsy Kings - Volare (Nel blu dipinto di blu).mp3', accent: '#ec4899' },
    { title: 'Go Go Power Rangers', artist: 'Power Rangers (Redux)', file: 'Go Go Power Rangers (Redux).mp3', accent: '#fbbf24' },
    { title: 'Somebody That I Used To Know', artist: 'Gotye (Trap Remix)', file: 'Gotye - Somebody That I Used To Know - Trap by VelvetCasca (Extended Version).mp3', accent: '#3b82f6' },
    { title: 'GTA 4 Theme', artist: 'Grand Theft Auto', file: 'Grand Theft Auto 4 Theme Song.mp3', accent: '#84cc16' },
    { title: 'Green Grass & High Tides', artist: 'The Outlaws', file: 'Green Grass & High Tides.mp3', accent: '#6366f1' },
    { title: 'GTA III Theme', artist: 'Grand Theft Auto', file: 'GTA III FULL Theme HQ.mp3', accent: '#dc2626' },
    { title: 'GTA San Andreas Theme', artist: 'Grand Theft Auto', file: 'GTA San Andreas Theme Song Full ! !.mp3', accent: '#1f2937' },
    { title: 'Nash Gimn (Our Anthem)', artist: 'Hard Bass School', file: 'Hard Bass School - Nash Gimn (OUR ANTHEM, Hard Bass Adidas, Đ ĐĐ— Đ ĐĐ— Đ ĐĐ— Đ­Đ˘Đž ĐĄĐĐ Đ”Đ‘ĐĐˇ).mp3', accent: '#0ea5e9' },
    { title: 'Gangnam Style PARODY', artist: 'Hitler', file: 'Hitler - Gangnam Style PARODY - Extended Full-Version ( 4 Minutes ).mp3', accent: '#7c3aed' },
    { title: 'Call me Maybe', artist: 'Hitler sings', file: 'Hitler sings Call me Maybe (Full version).mp3', accent: '#fb7185' },
    { title: 'Despacito (Fegel-Cito)', artist: 'Hitler sings', file: 'Hitler sings Despacito (a.k.a Fegel-Cito).mp3', accent: '#facc15' },
    { title: 'Moskau', artist: 'Hitler sings Dschinghis Khan', file: 'Hitler sings Dschinghis Khan - Moskau.mp3', accent: '#22d3ee' },
    { title: 'I Will Survive', artist: 'Gloria Gaynor', file: 'I Will Survive.mp3', accent: '#f97316' },
    { title: 'Everybody Wants To Go To Heaven', artist: 'Ice Cube feat DJ Shadow', file: "Ice Cube (feat DJ Shadow) 'Everybody Wants To Go To Heaven' (MAFIADE ENDING Credit Song.).mp3", accent: '#60a5fa' },
    { title: 'Deja Vu', artist: 'Initial D', file: 'Initial D - Deja Vu.mp3', accent: '#f472b6' },
    { title: "Don't Stop The Music", artist: 'Initial D', file: "Initial D - Don't Stop The Music.mp3", accent: '#a855f7' },
    { title: 'Night Of Fire', artist: 'Initial D', file: 'Initial D - Night Of Fire.mp3', accent: '#38bdf8' },
    { title: "Running In The 90's", artist: 'Initial D', file: "Initial D - Running In The 90's (Bass Boosted).mp3", accent: '#4c1d95' },
    { title: 'Bad Boys', artist: 'Inner Circle', file: 'Inner Circle- Bad Boys.mp3', accent: '#2563eb' },
    { title: "It's my life (Russian)", artist: 'Russian Version', file: "It's my life (Russian version).mp3", accent: '#ef4444' },
    { title: 'Empire State of Mind', artist: 'Jay-Z feat. Alicia Keys', file: 'Jay-Z feat. Alicia Keys - Empire State of Mind (Official Music Video).mp3', accent: '#34d399' },
    { title: 'Oneself', artist: 'Jincheng Zhang', file: 'Jincheng Zhang - Oneself (Instrumental Version) (Official Audio).mp3', accent: '#14b8a6' },
    { title: 'Our First Time Story', artist: 'Jincheng Zhang', file: 'Jincheng Zhang - Our First Time Story (Official Audio).mp3', accent: '#ea580c' },
    { title: 'Love Me Again', artist: 'John Newman', file: 'John Newman - Love Me Again.mp3', accent: '#f59e0b' },
    { title: 'Walking On Sunshine', artist: 'Katrina & The Waves', file: 'Katrina & The Waves - Walking On Sunshine (Official Music Video).mp3', accent: '#22c55e' },
    { title: 'Hot N Cold', artist: 'Katy Perry', file: 'Katy Perry - Hot N Cold (Lyrics).mp3', accent: '#ec4899' },
    { title: 'Katyusha Rock Cover', artist: 'Katyusha', file: 'Katyusha Rock Cover.mp3', accent: '#fbbf24' },
    { title: 'Party Rock Anthem', artist: 'LMFAO', file: 'LMFAO ft. Lauren Bennett, GoonRock - Party Rock Anthem (Official Audio).mp3', accent: '#3b82f6' },
    { title: 'Lemon Tree', artist: "Fool's Garden", file: 'Lemon Tree.mp3', accent: '#84cc16' },
    { title: 'Manager', artist: 'Leningrad (Đ›ĐµĐ˝Đ¸Đ˝ĐłŃ€Đ°Đ´)', file: 'Leningrad â€” Manager  Đ›ĐµĐ˝Đ¸Đ˝ĐłŃ€Đ°Đ´ â€” ĐśĐµĐ˝ĐµĐ´Đ¶ĐµŃ€.mp3', accent: '#6366f1' },
    { title: "Let's Dance", artist: 'David Bowie', file: "Let's Dance with lyrics.mp3", accent: '#dc2626' },
    { title: 'Libre', artist: 'Nino Bravo', file: 'Libre.mp3', accent: '#1f2937' },
    { title: 'Tico Tico', artist: 'Lou Bega', file: 'Lou Bega Can - I Tico Tico you.mp3', accent: '#0ea5e9' },
    { title: 'Low Rider', artist: 'War', file: 'Low Rider.mp3', accent: '#7c3aed' },
    { title: 'Let It Snow', artist: 'Dean Martin (Mafia II)', file: 'MAFIA IIâ„˘ - CHRISTMAS TIME  (Dean Martin - Let It Snow).mp3', accent: '#fb7185' },
    { title: 'Magic In The Air', artist: 'MAGIC SYSTEM feat. Chawki', file: 'MAGIC SYSTEM - Magic In The Air Feat. Chawki [Clip Officiel].mp3', accent: '#facc15' },
    { title: 'Our House', artist: 'Madness', file: 'Madness - Our House (Official 4K Video).mp3', accent: '#22d3ee' },
    { title: 'Welcome To The Club', artist: 'Manian', file: 'Manian - Welcome To The Club (Official Video).mp3', accent: '#f97316' },
    { title: 'Gas Gas Gas', artist: 'Manuel', file: 'Manuel - Gas Gas Gas.mp3', accent: '#60a5fa' },
    { title: 'Uptown Funk', artist: 'Mark Ronson feat. Bruno Mars', file: 'Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars.mp3', accent: '#f472b6' },
    { title: 'Moves Like Jagger', artist: 'Maroon 5 feat. Christina Aguilera', file: 'Maroon 5 - Moves Like Jagger (Lyrics) ft. Christina Aguilera.mp3', accent: '#a855f7' },
    { title: 'Heroes', artist: 'MĂĄns ZelmerlĂ¶w', file: 'MĂĄns ZelmerlĂ¶w - Heroes (Official Video).mp3', accent: '#38bdf8' },
    { title: 'Down Under', artist: 'Men At Work', file: 'Men At Work - Down Under (Official HD Video).mp3', accent: '#4c1d95' },
    { title: 'Come Closer', artist: 'Miles Kane', file: 'Miles Kane - Come Closer.mp3', accent: '#2563eb' },
    { title: 'Cheri Cheri Lady', artist: 'Modern Talking', file: 'Modern Talking - Cheri Cheri Lady (Official Music Video).mp3', accent: '#ef4444' },
    { title: 'Mortal Kombat Theme', artist: 'The Immortals', file: 'Mortal Kombat Theme Song Original.mp3', accent: '#34d399' },
    { title: 'Moves Like Jagger', artist: 'Maroon 5', file: 'Moves Like Jagger - Maroon 5 featuring Christina Aguilera.mp3', accent: '#14b8a6' },
    { title: 'Dragostea din tei', artist: 'O-Zone', file: 'O-Zone - Dragostea din tei (Bass Boosted).mp3', accent: '#ea580c' },
    { title: 'Battlefield 1 Theme', artist: 'Battlefield OST', file: 'OST Battlefield 1 - Main Theme (Classic Theme).mp3', accent: '#f59e0b' },
    { title: 'Can Can Music', artist: 'Offenbach', file: 'Offenbach - Can Can Music.mp3', accent: '#22c55e' },
    { title: 'Counting Stars', artist: 'OneRepublic', file: 'OneRepublic - Counting Stars (Official Music Video).mp3', accent: '#ec4899' },
    { title: 'Over My Shoulder', artist: 'Mike + The Mechanics', file: 'Over My Shoulder.mp3', accent: '#fbbf24' },
    { title: 'Overclocking E5200', artist: 'PC Music', file: 'Overclocking E5200 to 3Ghz.mp3', accent: '#3b82f6' },
    { title: 'PC Gaming in 2022', artist: 'Meme', file: 'PC Gaming in 2022 Meme.mp3', accent: '#84cc16' },
    { title: 'My mind', artist: 'Peyruis ft. Sandrah', file: 'Peyruis - My mind (ft. Sandrah).mp3', accent: '#6366f1' },
    { title: 'Happy', artist: 'Pharrell Williams', file: 'Pharrell Williams - Happy (from Despicable Me 2) [Ballroom Version].mp3', accent: '#dc2626' },
    { title: "He's a Pirate", artist: 'Pirates of the Caribbean', file: "Pirates of the Caribbean - He's a Pirate (Extended).mp3", accent: '#1f2937' },
    { title: 'Push It To The Limit', artist: 'Scarface OST', file: 'Push It To The Limit (scarface).mp3', accent: '#0ea5e9' },
    { title: "Don't Stop Me Now", artist: 'Queen', file: "Queen - Don't Stop Me Now (Official Video).mp3", accent: '#7c3aed' },
    { title: 'Human', artist: "Rag'n'Bone Man", file: "Rag'n'Bone Man - Human (Official Video).mp3", accent: '#fb7185' },
    { title: 'Ghostbusters', artist: 'Ray Parker Jr.', file: 'Ray Parker Jr. - Ghostbusters.mp3', accent: '#facc15' },
    { title: 'Hell March 2', artist: 'Red Alert 2 OST', file: 'Red Alert 2 - Hell March 2.mp3', accent: '#22d3ee' },
    { title: 'Soviet March', artist: 'Red Alert 3 OST', file: 'Red Alert 3 Theme - Soviet March.mp3', accent: '#f97316' },
    { title: 'Never Gonna Give You Up', artist: 'Rick Astley', file: 'Rick Astley - Never Gonna Give You Up (Official Music Video).mp3', accent: '#60a5fa' },
    { title: "Livin' La Vida Loca", artist: 'Ricky Martin', file: "Ricky Martin - Livin' La Vida Loca.mp3", accent: '#f472b6' },
    { title: 'Love My Life', artist: 'Robbie Williams', file: 'Robbie Williams  Love My Life (Official Video).mp3', accent: '#a855f7' },
    { title: 'Rocky Theme', artist: 'Rocky OST', file: 'Rocky theme song.mp3', accent: '#38bdf8' },
    { title: "Running in the 90's", artist: 'Max Coveri', file: "Running in the 90's.mp3", accent: '#4c1d95' },
    { title: 'Russian Airborne Troops (VDV)', artist: 'Russian Military', file: 'Russian Airborne Troops (VDV)  Music Video.mp3', accent: '#2563eb' },
    { title: 'Kalinka', artist: 'Russian Folk Music', file: 'Russian Folk Music-Kalinka (balalaika).mp3', accent: '#ef4444' },
    { title: "Rorke's Drift", artist: 'Sabaton', file: "Sabaton - Rorke's Drift (Music Video).mp3", accent: '#34d399' },
    { title: 'Let The Good Times Roll', artist: 'Sam Butera (Mafia II)', file: 'Sam Butera & The Witnesses - Let The Good Times Roll (Mafia II soundtrack).mp3', accent: '#14b8a6' },
    { title: 'San Francisco', artist: 'Scott McKenzie', file: 'San Francisco - Scott McKenzie.mp3', accent: '#ea580c' },
    { title: 'All Star', artist: 'Smash Mouth', file: 'Smash Mouth - All Star [Bass Boosted].mp3', accent: '#f59e0b' },
    { title: "I'm A Believer", artist: 'Smash Mouth', file: "Smash Mouth - I'm A Believer.mp3", accent: '#22c55e' },
    { title: 'Smooth Criminal', artist: 'Michael Jackson', file: 'Smooth Criminal (Radio Edit).mp3', accent: '#ec4899' },
    { title: 'Sneakman', artist: 'Jet Set Radio', file: 'Sneakman.mp3', accent: '#fbbf24' },
    { title: 'Song for Denise', artist: 'Piano Fantasia', file: 'Song for Denise (Maxi Version).mp3', accent: '#3b82f6' },
    { title: "Theresa May's Chronic Brexit", artist: 'Still M.A.Y.', file: "Still M.A.Y. (featuring Snoop Mogg) - Theresa May's Chronic Brexit.mp3", accent: '#84cc16' },
    { title: "Ken's Theme", artist: 'Street Fighter 5', file: "Street Fighter 5 Ken's Theme.mp3", accent: '#6366f1' },
    { title: 'Sung Kang', artist: 'Fast & Furious', file: 'Sung Kang.mp4.mp3', accent: '#dc2626' },
    { title: 'Eye Of The Tiger', artist: 'Survivor', file: 'Survivor - Eye Of The Tiger (Official HD Video).mp3', accent: '#1f2937' },
    { title: 'Shake It Off (Piotr Ĺ»yĹ‚a Remix)', artist: 'Taylor Swift', file: 'Taylor Swift - Shake It Off Piotr Ĺ»yĹ‚a Remix.mp3', accent: '#0ea5e9' },
    { title: 'Shake It Off', artist: 'Taylor Swift', file: 'Taylor Swift - Shake It Off.mp3', accent: '#7c3aed' },
    { title: 'The Final Countdown', artist: 'Europe', file: 'The Final Countdown.mp3', accent: '#fb7185' },
    { title: 'The Missile Knows Where It Is', artist: 'Meme Remix', file: 'The Missile Knows Where It Is (Remix) - OFFICIAL MUSIC VIDEO.mp3', accent: '#facc15' },
    { title: 'Panic Restaurant', artist: 'The Munchables OST', file: 'The Munchables OST â€“ 18 â€“ Panic Restaurant.mp3', accent: '#22d3ee' },
    { title: 'Paint It Black', artist: 'The Rolling Stones', file: 'The Rolling Stones - Paint It, Black (Official Lyric Video).mp3', accent: '#f97316' },
    { title: 'Tarantella Napoletana', artist: 'The Godfather (Trap remix)', file: 'The godfather -Tarantella Napoletana (Trap remix).mp3', accent: '#60a5fa' },
    { title: "I'm so excited", artist: 'The Pointer Sisters', file: "The pointer sisters - I'm so excited.mp3", accent: '#f472b6' },
    { title: "Can't Hold Us", artist: 'Macklemore & Ryan Lewis', file: "This is the moment tonight is the night-(Macklemore & Ryan Lewis - Can't Hold Us).mp3", accent: '#a855f7' },
    { title: 'The Best', artist: 'Tina Turner', file: 'Tina Turner - The Best (Official Music Video).mp3', accent: '#38bdf8' },
    { title: 'Tokyo Drift', artist: 'Teriyaki Boyz', file: 'Tokyo Drift (Fast & Furious).mp3', accent: '#4c1d95' },
    { title: 'Sexbomb', artist: 'Tom Jones', file: 'Tom Jones - Sexbomb (Lyrics).mp3', accent: '#2563eb' },
    { title: 'Sexbomb', artist: 'Tom Jones, Mousse T.', file: 'Tom Jones, Mousse T. - Sexbomb (Official Video).mp3', accent: '#ef4444' },
    { title: 'Hold The Line', artist: 'Toto', file: 'Toto - Hold The Line (Official Video).mp3', accent: '#34d399' },
    { title: 'Lasciatemi Cantare', artist: 'Toto Cutugno', file: 'Toto Cutugno - Lasciatemi Cantare (1983).mp3', accent: '#14b8a6' },
    { title: 'Trainwreck Of Electro Swing', artist: 'A Hat In Time Remix', file: 'Trainwreck Of Electro Swing - A Hat In Time Remix.mp3', accent: '#ea580c' },
    { title: 'Trance Music for Racing Game', artist: 'Racing Music', file: 'Trance Music for Racing Game.mp3', accent: '#f59e0b' },
    { title: 'Tunak Tunak Tun', artist: 'Daler Mehndi', file: 'Tunak Tunak Tun  Daler Mehndi  Full Video  Superhit Punjabi Song.mp3', accent: '#22c55e' },
    { title: 'Stressed Out', artist: 'Twenty One Pilots', file: 'twenty one pilots Stressed Out [OFFICIAL VIDEO].mp3', accent: '#ec4899' },
    { title: 'U got that (WWII Edition)', artist: 'Meme', file: 'U got that (WWII Edition).mp3', accent: '#fbbf24' },
    { title: 'USSR National Anthem', artist: 'Soviet Anthem', file: 'USSR National Anthem Be glorious, our free Swampland!.mp3', accent: '#3b82f6' },
    { title: 'Riptide', artist: 'Vance Joy', file: 'Vance Joy - Riptide (Lyrics).mp3', accent: '#84cc16' },
    { title: 'Walter, StraĹĽnik SkokĂłw', artist: 'Polish Meme', file: 'Walter, StraĹĽnik SkokĂłw Narciarskich.mp3', accent: '#6366f1' },
    { title: "We Are Number One (L'Amour Toujours)", artist: 'Remix', file: "We Are Number One but it's a L'Amour Toujours remix.mp3", accent: '#dc2626' },
    { title: 'We Are Number One (NUMA NUMA)', artist: 'Remix', file: 'We Are Number One but NUMA NUMA YAY.mp3', accent: '#1f2937' },
    { title: 'We Are Number One (Call Me Maybe)', artist: 'Remix', file: 'We Are Number One so call me maybe.mp3', accent: '#0ea5e9' },
    { title: 'Last Christmas', artist: 'Wham!', file: 'Wham! - Last Christmas (Official Video).mp3', accent: '#7c3aed' },
    { title: 'When the DOOM music kicks in', artist: 'DOOM', file: 'When the DOOM music kicks in.mp3', accent: '#fb7185' },
    { title: 'I Wanna Dance With Somebody', artist: 'Whitney Houston', file: 'Whitney Houston - I Wanna Dance With Somebody (Official Video).mp3', accent: '#facc15' },
    { title: 'Winnie The Pooh dancing to Pitbull', artist: 'Meme', file: 'Winnie The Pooh dancing to Pitbull (full song).mp3', accent: '#22d3ee' },
    { title: 'See You Again', artist: 'Wiz Khalifa feat. Charlie Puth', file: 'Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack.mp3', accent: '#f97316' },
    { title: 'Wonder Boy', artist: 'Tenacious D', file: 'Wonder Boy.mp3', accent: '#60a5fa' },
    { title: 'Lincoln', artist: 'XS Project', file: 'XS Project - Lincoln.mp3', accent: '#f472b6' },
    { title: 'Uptown Rosen', artist: 'YTPMV', file: 'YTPMV Uptown Rosen.mp3', accent: '#a855f7' },
    { title: 'We No Speak Americano', artist: 'Yolanda Be Cool & DCUP', file: 'Yolanda Be Cool & DCUP - We No Speak Americano (Official Video).mp3', accent: '#38bdf8' },
    { title: 'DADDY (Parody)', artist: 'Adolf Hitler (DPMV)', file: "[DPMV] Adolf Hitler - DADDY (Parody of PSY's DADDY).mp3", accent: '#4c1d95' },
    { title: 'Eye of the Fegel', artist: 'Adolf Hitler (DPMV)', file: '[DPMV] Adolf Hitler - Eye of the Fegel (Eye of the Tiger Parody).mp3', accent: '#2563eb' },
    { title: 'Fegel Off', artist: 'Adolf Hitler (DPMV)', file: '[DPMV] Adolf Hitler - Fegel Off.mp3', accent: '#ef4444' },
    { title: "MEIN'S NOT HOT", artist: 'BIG SHITLER', file: "[DPMV] BIG SHITLER - MEIN'S NOT HOT.mp3", accent: '#34d399' },
    { title: 'Deutschland Funk', artist: 'DPMV', file: '[DPMV] Deutschland Funk.mp3', accent: '#14b8a6' },
    { title: 'OPPA GODDAMN STYLE', artist: 'PSYTP', file: '[PSYTP] OPPA GODDAMN STYLE.mp3', accent: '#ea580c' },
    { title: 'House In The Middle Of A Street', artist: 'Michael Rosen (YTPMV)', file: '[YTPMV] - Michael Rosen Has A House In The Middle Of A Street (Our House - Madness).mp3', accent: '#f59e0b' },
    { title: 'Uptown Rectal Cleansing PSA', artist: 'Bruno (YTP)', file: "[YTP] Bruno's Uptown Rectal Cleansing Sing-along PSA.mp3", accent: '#22c55e' },
    { title: 'Take On Me', artist: 'a-ha', file: 'a-ha - Take On Me (Official Video) [Remastered in 4K].mp3', accent: '#ec4899' },
    { title: 'Hound Dog', artist: 'Elvis Presley', file: 'elvis presley-hound dog.mp3', accent: '#fbbf24' },
    { title: 'Pizza Time', artist: 'Spider-Man', file: 'pizza time.mp3', accent: '#3b82f6' },
    { title: 'El Mismo Sol (Parodia)', artist: 'Andrzej Duda & KaczyĹ„ski', file: 'â™Ş Andrzej Duda & JarosĹ‚aw KaczyĹ„ski & Aniela Bogusz - El Mismo Sol (Alvaro Solder Parodia).mp3', accent: '#84cc16' },
    { title: 'SKIBIDI (Parodia)', artist: 'Andrzej Duda', file: 'â™Ş Andrzej Duda - SKIBIDI (Little Big Parodia) #skibidichallenge.mp3', accent: '#6366f1' },
    { title: 'All Star', artist: 'Donald Trump Sings', file: 'â™Ş Donald Trump Sings All Star by Smash Mouth.mp3', accent: '#dc2626' },
    { title: 'Shape of You (Parodia)', artist: 'Janusz Korwin-Mikke', file: 'â™Ş Janusz Korwin-Mikke - Shape of You (Ed Sheeran Parodia).mp3', accent: '#1f2937' },
    { title: 'MiÄ™towa herbata', artist: 'Robert MakĹ‚owicz', file: 'â™Ş Robert MakĹ‚owicz - MiÄ™towa herbata (Alvaro Soler ft. M. Lewczuk Parodia).mp3', accent: '#0ea5e9' }
  ];

  if (!trackLibrary.length) {
    return;
  }

  const state = {
    currentIndex: 0,
    shuffle: false,
    loop: 'off',
    isPlaying: false,
    queueOrder: trackLibrary.map((_, index) => index),
    favorites: new Set(),
    previousVolume: 0.8
  };

  const audio = new Audio();
  audio.preload = 'metadata';
  audio.volume = state.previousVolume;

  const elements = {
    heroTrackCount: document.getElementById('track-count'),
    heroShuffleStatus: document.getElementById('autoplay-status'),
    heroLoopStatus: document.getElementById('loop-status'),
    heroLastPlayed: document.getElementById('last-played'),
    cover: document.querySelector('[data-cover]'),
    barCover: document.querySelector('[data-bar-cover]'),
    title: document.querySelector('[data-title]'),
    artist: document.querySelector('[data-artist]'),
    album: document.querySelector('[data-album]'),
    barTitle: document.querySelector('[data-bar-title]'),
    barArtist: document.querySelector('[data-bar-artist]'),
    progressControls: document.querySelectorAll('[data-progress]'),
    currentTimeDisplays: document.querySelectorAll('[data-current-time]'),
    durationDisplays: document.querySelectorAll('[data-duration]'),
    playButtons: document.querySelectorAll('[data-action="play"]'),
    shuffleButtons: document.querySelectorAll('[data-action="shuffle"]'),
    prevButtons: document.querySelectorAll('[data-action="prev"]'),
    nextButtons: document.querySelectorAll('[data-action="next"]'),
    loopButtons: document.querySelectorAll('[data-action="loop"]'),
    randomButtons: document.querySelectorAll('[data-action="random"]'),
    likeButtons: document.querySelectorAll('[data-action="like"]'),
    muteButtons: document.querySelectorAll('[data-action="mute"]'),
    volumeControls: document.querySelectorAll('[data-volume]'),
    queueElement: document.querySelector('[data-queue]'),
    queueEmpty: document.querySelector('[data-empty]'),
    queueCount: document.querySelector('[data-queue-count]'),
    queueSearch: document.querySelector('[data-search]'),
    clearSearch: document.querySelector('[data-action="clear-search"]'),
    libraryGrid: document.querySelector('[data-library-grid]'),
    libraryEmpty: document.querySelector('[data-library-empty]'),
    librarySearch: document.querySelector('[data-library-search]'),
    loopIndicator: document.querySelector('[data-loop-indicator]'),
    libraryDrawer: document.querySelector('[data-library-drawer]'),
    libraryDrawerPanel: document.querySelector('[data-library-drawer-panel]'),
    libraryDrawerList: document.querySelector('[data-library-drawer-list]'),
    libraryDrawerSearch: document.querySelector('[data-library-drawer-search]'),
    libraryDrawerEmpty: document.querySelector('[data-library-drawer-empty]'),
    openLibraryButtons: document.querySelectorAll('[data-action="open-library"]'),
    closeLibraryButtons: document.querySelectorAll('[data-action="close-library"]')
  };

  let isDrawerOpen = false;
  let lastFocusedElement = null;

  function hexToRgb(hex) {
    const cleaned = hex.replace('#', '');
    const bigint = parseInt(cleaned, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  function rgbToHex({ r, g, b }) {
    return '#'
      + [r, g, b]
        .map((value) => {
          const v = Math.max(0, Math.min(255, Math.round(value)));
          return v.toString(16).padStart(2, '0');
        })
        .join('');
  }

  function mixColors(colorA, colorB, weight) {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);
    return rgbToHex({
      r: a.r + (b.r - a.r) * weight,
      g: a.g + (b.g - a.g) * weight,
      b: a.b + (b.b - a.b) * weight
    });
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  function matchesFilter(track, query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return true;
    }
    return (
      track.title.toLowerCase().includes(normalized)
      || track.artist.toLowerCase().includes(normalized)
      || (track.album && track.album.toLowerCase().includes(normalized))
    );
  }

  function formatCount(count) {
    if (count === 1) {
      return '1 utwĂłr';
    }
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      return `${count} utwory`;
    }
    return `${count} utworĂłw`;
  }

  function loadFavorites() {
    try {
      const stored = JSON.parse(localStorage.getItem(favoritesStorageKey) || '[]');
      if (Array.isArray(stored)) {
        stored.forEach((index) => {
          if (Number.isInteger(index) && trackLibrary[index]) {
            state.favorites.add(index);
          }
        });
      }
    } catch (error) {
      console.warn('Nie udaĹ‚o siÄ™ wczytaÄ‡ ulubionych utworĂłw', error);
    }
  }

  function saveFavorites() {
    const payload = Array.from(state.favorites.values());
    localStorage.setItem(favoritesStorageKey, JSON.stringify(payload));
  }

  function updateHero() {
    if (elements.heroTrackCount) {
      elements.heroTrackCount.textContent = trackLibrary.length.toString();
    }
    if (elements.heroShuffleStatus) {
      elements.heroShuffleStatus.textContent = state.shuffle ? 'Losowo wĹ‚Ä…czone' : 'Losowo wyĹ‚Ä…czone';
    }
    if (elements.heroLoopStatus) {
      const label = state.loop === 'all' ? 'Powtarzanie listy' : state.loop === 'one' ? 'Powtarzanie utworu' : 'Brak';
      elements.heroLoopStatus.textContent = label;
    }
  }

  function updateLoopIndicator() {
    const label = state.loop === 'all' ? 'Powtarzanie listy' : state.loop === 'one' ? 'Powtarzanie utworu' : 'Brak powtarzania';
    if (elements.loopIndicator) {
      elements.loopIndicator.textContent = `Tryb: ${label.toLowerCase()}`;
    }
    if (elements.heroLoopStatus) {
      elements.heroLoopStatus.textContent = state.loop === 'off' ? 'Brak' : label;
    }
    elements.loopButtons.forEach((button) => {
      button.classList.toggle('is-active', state.loop !== 'off');
      button.setAttribute('aria-pressed', state.loop !== 'off');
      button.textContent = state.loop === 'one' ? 'đź”‚' : 'đź”';
      button.setAttribute(
        'aria-label',
        state.loop === 'off' ? 'WĹ‚Ä…cz powtarzanie listy' : state.loop === 'all' ? 'PowtĂłrz tylko bieĹĽÄ…cy utwĂłr' : 'WyĹ‚Ä…cz powtarzanie'
      );
    });
  }

  function updateShuffleIndicator() {
    const label = state.shuffle ? 'Losowo wĹ‚Ä…czone' : 'Losowo wyĹ‚Ä…czone';
    if (elements.heroShuffleStatus) {
      elements.heroShuffleStatus.textContent = label;
    }
    elements.shuffleButtons.forEach((button) => {
      button.classList.toggle('is-active', state.shuffle);
      button.setAttribute('aria-pressed', String(state.shuffle));
    });
  }

  function applyAccent(track) {
    const accent = track.accent || '#6366f1';
    const accentLight = mixColors(accent, '#ffffff', 0.35);
    const accentDark = mixColors(accent, '#0f172a', 0.55);
    const gradient = `linear-gradient(145deg, ${accent}, ${accentLight} 45%, ${accentDark} 100%)`;
    if (elements.cover) {
      elements.cover.style.setProperty('--cover-background', gradient);
      elements.cover.dataset.initial = track.title.charAt(0).toUpperCase();
      elements.cover.dataset.hasImage = 'false';
      elements.cover.style.removeProperty('background-image');
      if (track.cover) {
        const url = track.cover;
        elements.cover.style.setProperty('--cover-background', `url('${url}') center/cover no-repeat`);
        elements.cover.dataset.hasImage = 'true';
      }
    }

    if (elements.barCover) {
      const barGradient = `linear-gradient(135deg, ${accent}, ${accentDark})`;
      elements.barCover.style.setProperty('--bar-background', barGradient);
      elements.barCover.dataset.initial = track.title.charAt(0).toUpperCase();
      elements.barCover.dataset.hasImage = 'false';
      elements.barCover.style.removeProperty('background-image');
      if (track.cover) {
        const url = track.cover;
        elements.barCover.style.setProperty('--bar-background', `url('${url}') center/cover no-repeat`);
        elements.barCover.dataset.hasImage = 'true';
      }
    }
  }

  function updateLikeButtons() {
    const isFavorite = state.favorites.has(state.currentIndex);
    elements.likeButtons.forEach((button) => {
      button.classList.toggle('is-active', isFavorite);
      button.setAttribute('aria-pressed', String(isFavorite));
      if (button.hasAttribute('data-bar-like')) {
        button.textContent = isFavorite ? 'â™Ą' : 'â™ˇ';
      } else if (button.classList.contains('tag-btn')) {
        button.textContent = isFavorite ? 'â… Ulubiony' : 'â™ˇ Ulubiony';
      }
    });
  }

  function highlightQueue() {
    if (!elements.queueElement) {
      return;
    }
    elements.queueElement.querySelectorAll('.queue-item').forEach((item) => {
      const index = Number(item.dataset.trackIndex);
      item.classList.toggle('is-active', index === state.currentIndex);
    });
  }

  function highlightDrawer() {
    if (!elements.libraryDrawerList) {
      return;
    }
    elements.libraryDrawerList.querySelectorAll('.drawer-track').forEach((row) => {
      const index = Number(row.dataset.trackIndex);
      const track = trackLibrary[index];
      if (!track) {
        return;
      }
      const isActive = index === state.currentIndex;
      const isFavorite = state.favorites.has(index);
      row.classList.toggle('is-active', isActive);
      row.classList.toggle('is-favorite', isFavorite);
      const favoriteButton = row.querySelector('.drawer-track__favorite');
      if (favoriteButton) {
        favoriteButton.textContent = isFavorite ? 'â™Ą' : 'â™ˇ';
        favoriteButton.setAttribute('aria-pressed', String(isFavorite));
        favoriteButton.setAttribute(
          'aria-label',
          isFavorite ? `UsuĹ„ ${track.title} z ulubionych` : `Dodaj ${track.title} do ulubionych`
        );
      }
    });
  }

  function highlightLibrary() {
    if (!elements.libraryGrid) {
      highlightDrawer();
      return;
    }
    const isFavorite = (index) => state.favorites.has(index);
    elements.libraryGrid.querySelectorAll('.library-card').forEach((card) => {
      const index = Number(card.dataset.trackIndex);
      card.classList.toggle('is-active', index === state.currentIndex);
      card.classList.toggle('is-favorite', isFavorite(index));
    });
    highlightDrawer();
  }

  function buildQueue(filter = '') {
    if (!elements.queueElement) {
      return;
    }
    const normalized = filter.trim().toLowerCase();
    let indices = trackLibrary.map((_, index) => index);
    if (normalized) {
      indices = indices.filter((index) => matchesFilter(trackLibrary[index], normalized));
      if (!indices.includes(state.currentIndex)) {
        indices.unshift(state.currentIndex);
      }
    }
    indices = Array.from(new Set(indices));
    state.queueOrder = indices;

    elements.queueElement.innerHTML = '';
    indices.forEach((index) => {
      const track = trackLibrary[index];
      const item = document.createElement('li');
      item.className = 'queue-item';
      item.dataset.trackIndex = String(index);
      item.tabIndex = 0;
      item.setAttribute('role', 'option');
      if (normalized && !matchesFilter(track, normalized)) {
        item.classList.add('is-muted');
      }
      const title = document.createElement('span');
      title.className = 'queue-track';
      title.textContent = track.title;
      const artist = document.createElement('span');
      artist.className = 'queue-artist';
      artist.textContent = track.artist;
      item.append(title, artist);
      elements.queueElement.append(item);
    });

    const hasResults = indices.length > 0;
    if (elements.queueEmpty) {
      elements.queueEmpty.hidden = hasResults;
    }
    if (elements.queueCount) {
      elements.queueCount.textContent = formatCount(indices.length);
    }
    highlightQueue();
  }

  function buildLibrary(filter = '') {
    if (!elements.libraryGrid) {
      return;
    }
    const normalized = filter.trim().toLowerCase();
    const cards = trackLibrary
      .map((track, index) => ({ track, index }))
      .filter(({ track }) => matchesFilter(track, normalized));

    elements.libraryGrid.innerHTML = '';

    cards.forEach(({ track, index }) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'library-card';
      card.dataset.trackIndex = String(index);
      const accent = track.accent || '#6366f1';
      const accentLight = mixColors(accent, '#ffffff', 0.2);
      const accentDark = mixColors(accent, '#0f172a', 0.55);
      card.style.setProperty('--library-background', `linear-gradient(155deg, ${accent}, ${accentLight} 48%, ${accentDark} 100%)`);
      card.style.setProperty('--library-border', mixColors(accent, '#ffffff', 0.25));

      const badge = document.createElement('span');
      badge.className = 'library-badge';
      badge.textContent = track.album || 'Single';

      const title = document.createElement('h4');
      title.textContent = track.title;

      const artist = document.createElement('span');
      artist.textContent = track.artist;

      card.append(badge, title, artist);
      elements.libraryGrid.append(card);
    });

    const hasResults = cards.length > 0;
    if (elements.libraryEmpty) {
      elements.libraryEmpty.hidden = hasResults;
    }
    highlightLibrary();
  }

  function buildLibraryDrawer(filter = '') {
    if (!elements.libraryDrawerList) {
      return;
    }
    const normalized = filter.trim().toLowerCase();
    const tracks = trackLibrary
      .map((track, index) => ({ track, index }))
      .filter(({ track }) => matchesFilter(track, normalized));

    elements.libraryDrawerList.innerHTML = '';

    tracks.forEach(({ track, index }) => {
      const item = document.createElement('li');
      item.className = 'drawer-track';
      item.dataset.trackIndex = String(index);

      const mainButton = document.createElement('button');
      mainButton.type = 'button';
      mainButton.className = 'drawer-track__main';
      mainButton.dataset.drawerAction = 'play';
      mainButton.setAttribute('aria-label', `OdtwĂłrz ${track.title} â€“ ${track.artist}`);

      const number = document.createElement('span');
      number.className = 'drawer-track__number';
      number.textContent = String(index + 1).padStart(2, '0');

      const meta = document.createElement('div');
      meta.className = 'drawer-track__meta';

      const title = document.createElement('span');
      title.className = 'drawer-track__title';
      title.textContent = track.title;

      const subtitle = document.createElement('span');
      subtitle.className = 'drawer-track__subtitle';
      subtitle.textContent = track.album ? `${track.artist} â€˘ ${track.album}` : track.artist;

      meta.append(title, subtitle);
      mainButton.append(number, meta);

      const favoriteButton = document.createElement('button');
      favoriteButton.type = 'button';
      favoriteButton.className = 'drawer-track__favorite';
      favoriteButton.dataset.drawerAction = 'favorite';
      favoriteButton.setAttribute('aria-pressed', 'false');
      favoriteButton.setAttribute('aria-label', `Dodaj ${track.title} do ulubionych`);
      favoriteButton.textContent = 'â™ˇ';

      item.append(mainButton, favoriteButton);
      elements.libraryDrawerList.append(item);
    });

    const hasResults = tracks.length > 0;
    if (elements.libraryDrawerEmpty) {
      elements.libraryDrawerEmpty.hidden = hasResults;
    }
    highlightDrawer();
  }

  function openLibraryDrawer() {
    if (!elements.libraryDrawer) {
      return;
    }
    if (!elements.libraryDrawer.classList.contains('is-open')) {
      lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    const currentFilter = elements.libraryDrawerSearch ? elements.libraryDrawerSearch.value : '';
    buildLibraryDrawer(currentFilter);
    elements.libraryDrawer.classList.add('is-open');
    elements.libraryDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    isDrawerOpen = true;
    if (elements.libraryDrawerSearch) {
      const focusTarget = elements.libraryDrawerSearch;
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          focusTarget.focus();
        });
      } else {
        focusTarget.focus();
      }
    }
  }

  function closeLibraryDrawer(options = {}) {
    if (!elements.libraryDrawer) {
      return;
    }
    if (!elements.libraryDrawer.classList.contains('is-open')) {
      return;
    }
    elements.libraryDrawer.classList.remove('is-open');
    elements.libraryDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    isDrawerOpen = false;
    const { restoreFocus = true } = options;
    if (restoreFocus && lastFocusedElement) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
  }

  function handleDocumentKeydown(event) {
    if (event.key === 'Escape' && isDrawerOpen) {
      event.preventDefault();
      closeLibraryDrawer();
    }
  }

  function syncProgressDisplays() {
    const duration = audio.duration;
    const current = audio.currentTime;
    const value = duration ? Math.min(1000, Math.max(0, Math.floor((current / duration) * 1000))) : 0;
    elements.progressControls.forEach((input) => {
      if (document.activeElement !== input) {
        input.value = String(value);
      }
    });
    elements.currentTimeDisplays.forEach((display) => {
      display.textContent = formatTime(current);
    });
    elements.durationDisplays.forEach((display) => {
      display.textContent = formatTime(duration);
    });
  }

  function resetProgressDisplays() {
    elements.progressControls.forEach((input) => {
      if (document.activeElement !== input) {
        input.value = '0';
      }
    });
    elements.currentTimeDisplays.forEach((display) => {
      display.textContent = '0:00';
    });
    elements.durationDisplays.forEach((display) => {
      display.textContent = '--:--';
    });
  }

  function setVolume(value) {
    const clamped = Math.min(100, Math.max(0, Number(value)));
    const level = clamped / 100;
    audio.volume = level;
    if (clamped > 0) {
      state.previousVolume = level;
    }
    elements.volumeControls.forEach((slider) => {
      slider.value = String(clamped);
    });
    elements.muteButtons.forEach((button) => {
      button.textContent = audio.volume === 0 ? 'đź”‡' : 'đź”Š';
    });
  }

  function toggleMute() {
    if (audio.volume === 0) {
      const restored = state.previousVolume > 0 ? state.previousVolume : 0.5;
      setVolume(restored * 100);
    } else {
      if (audio.volume > 0) {
        state.previousVolume = audio.volume;
      }
      setVolume(0);
    }
  }

  function play() {
    audio.play().catch((error) => {
      console.warn('Problem z odtworzeniem audio', error);
    });
  }

  function pause() {
    audio.pause();
  }

  function togglePlay() {
    if (audio.paused) {
      play();
    } else {
      pause();
    }
  }

  function getQueueIndices() {
    return state.queueOrder.length ? state.queueOrder : trackLibrary.map((_, index) => index);
  }

  function getNextIndex() {
    const order = getQueueIndices();
    if (!order.length) {
      return state.currentIndex;
    }
    if (state.shuffle) {
      if (order.length === 1) {
        return order[0];
      }
      let next;
      do {
        next = order[Math.floor(Math.random() * order.length)];
      } while (next === state.currentIndex);
      return next;
    }
    const position = order.indexOf(state.currentIndex);
    if (position === -1) {
      return order[0];
    }
    if (position + 1 < order.length) {
      return order[position + 1];
    }
    return state.loop === 'all' ? order[0] : null;
  }

  function getPreviousIndex() {
    const order = getQueueIndices();
    if (!order.length) {
      return state.currentIndex;
    }
    const position = order.indexOf(state.currentIndex);
    if (position > 0) {
      return order[position - 1];
    }
    if (state.loop !== 'off') {
      return order[order.length - 1];
    }
    return null;
  }

  function updateTitle(track) {
    if (elements.title) {
      elements.title.textContent = track.title;
    }
    if (elements.artist) {
      elements.artist.textContent = track.artist;
    }
    if (elements.album) {
      elements.album.textContent = track.album ? `${track.album} â€˘ ${track.artist}` : track.artist;
    }
    if (elements.barTitle) {
      elements.barTitle.textContent = track.title;
    }
    if (elements.barArtist) {
      elements.barArtist.textContent = track.artist;
    }
    if (elements.heroLastPlayed) {
      elements.heroLastPlayed.textContent = track.title;
    }
    document.title = `${track.title} â€“ Max Playground`;
  }

  function loadTrack(index, options = {}) {
    const track = trackLibrary[index];
    if (!track) {
      return;
    }
    state.currentIndex = index;
    const source = `${basePath}${track.file}`;
    const wasPlaying = options.autoplay ?? state.isPlaying;
    resetProgressDisplays();
    audio.src = source;
    audio.currentTime = options.startTime || 0;
    applyAccent(track);
    updateTitle(track);
    highlightQueue();
    highlightLibrary();
    updateLikeButtons();
    if (wasPlaying) {
      play();
    } else {
      pause();
      syncProgressDisplays();
    }
  }

  function nextTrack(manual = false) {
    const nextIndex = getNextIndex();
    if (nextIndex === null || nextIndex === undefined) {
      pause();
      audio.currentTime = 0;
      syncProgressDisplays();
      return;
    }
    loadTrack(nextIndex, { autoplay: true });
    if (manual && elements.queueSearch && elements.queueSearch.value.trim()) {
      buildQueue(elements.queueSearch.value);
    }
  }

  function previousTrack() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      syncProgressDisplays();
      return;
    }
    const prevIndex = getPreviousIndex();
    if (prevIndex === null || prevIndex === undefined) {
      audio.currentTime = 0;
      syncProgressDisplays();
      return;
    }
    loadTrack(prevIndex, { autoplay: true });
  }

  function toggleShuffle() {
    state.shuffle = !state.shuffle;
    updateShuffleIndicator();
  }

  function cycleLoopMode() {
    state.loop = state.loop === 'off' ? 'all' : state.loop === 'all' ? 'one' : 'off';
    updateLoopIndicator();
  }

  function toggleFavorite(target = state.currentIndex) {
    let index = target;
    if (typeof target === 'object') {
      index = state.currentIndex;
    }
    const parsed = Number(index);
    if (!Number.isInteger(parsed) || !trackLibrary[parsed]) {
      return;
    }
    if (state.favorites.has(parsed)) {
      state.favorites.delete(parsed);
    } else {
      state.favorites.add(parsed);
    }
    if (parsed === state.currentIndex) {
      updateLikeButtons();
    }
    highlightLibrary();
    highlightDrawer();
    saveFavorites();
  }

  function playRandomTrack() {
    const pool = trackLibrary.map((_, index) => index);
    if (!pool.length) {
      return;
    }
    let candidate = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) {
      while (candidate === state.currentIndex) {
        candidate = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    loadTrack(candidate, { autoplay: true });
  }

  function attachEventListeners() {
    elements.playButtons.forEach((button) => button.addEventListener('click', togglePlay));
    elements.prevButtons.forEach((button) => button.addEventListener('click', previousTrack));
    elements.nextButtons.forEach((button) => button.addEventListener('click', () => nextTrack(true)));
    elements.shuffleButtons.forEach((button) => button.addEventListener('click', () => {
      toggleShuffle();
      updateHero();
    }));
    elements.loopButtons.forEach((button) => button.addEventListener('click', () => {
      cycleLoopMode();
      updateHero();
    }));
    elements.randomButtons.forEach((button) => button?.addEventListener('click', playRandomTrack));
    elements.likeButtons.forEach((button) => button.addEventListener('click', toggleFavorite));
    elements.muteButtons.forEach((button) => button.addEventListener('click', toggleMute));
    elements.volumeControls.forEach((slider) => slider.addEventListener('input', (event) => setVolume(event.target.value)));
    elements.progressControls.forEach((slider) =>
      slider.addEventListener('input', (event) => {
        if (!Number.isFinite(audio.duration) || audio.duration === 0) {
          return;
        }
        const percent = Number(event.target.value) / 1000;
        audio.currentTime = percent * audio.duration;
        syncProgressDisplays();
      })
    );
    if (elements.queueElement) {
      elements.queueElement.addEventListener('click', (event) => {
        const item = event.target.closest('.queue-item');
        if (!item) {
          return;
        }
        const index = Number(item.dataset.trackIndex);
        loadTrack(index, { autoplay: true });
      });
      elements.queueElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          const item = event.target.closest('.queue-item');
          if (item) {
            event.preventDefault();
            const index = Number(item.dataset.trackIndex);
            loadTrack(index, { autoplay: true });
          }
        }
      });
    }
    if (elements.libraryGrid) {
      elements.libraryGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.library-card');
        if (!card) {
          return;
        }
        const index = Number(card.dataset.trackIndex);
        loadTrack(index, { autoplay: true });
      });
    }
    if (elements.queueSearch) {
      elements.queueSearch.addEventListener('input', (event) => {
        buildQueue(event.target.value);
      });
    }
    if (elements.clearSearch) {
      elements.clearSearch.addEventListener('click', () => {
        if (elements.queueSearch) {
          elements.queueSearch.value = '';
        }
        buildQueue('');
      });
    }
    if (elements.librarySearch) {
      elements.librarySearch.addEventListener('input', (event) => {
        buildLibrary(event.target.value);
      });
    }
    if (elements.openLibraryButtons?.length) {
      elements.openLibraryButtons.forEach((button) =>
        button.addEventListener('click', () => {
          const currentFilter = elements.libraryDrawerSearch ? elements.libraryDrawerSearch.value : '';
          buildLibraryDrawer(currentFilter);
          openLibraryDrawer();
        })
      );
    }
    if (elements.closeLibraryButtons?.length) {
      elements.closeLibraryButtons.forEach((button) => button.addEventListener('click', () => closeLibraryDrawer()));
    }
    if (elements.libraryDrawer) {
      elements.libraryDrawer.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        if (action === 'close-library') {
          closeLibraryDrawer();
        }
      });
    }
    if (elements.libraryDrawerSearch) {
      elements.libraryDrawerSearch.addEventListener('input', (event) => {
        buildLibraryDrawer(event.target.value);
      });
    }
    if (elements.libraryDrawerList) {
      elements.libraryDrawerList.addEventListener('click', (event) => {
        const control = event.target.closest('[data-drawer-action]');
        if (!control) {
          return;
        }
        const row = control.closest('.drawer-track');
        if (!row) {
          return;
        }
        const index = Number(row.dataset.trackIndex);
        if (!Number.isInteger(index) || !trackLibrary[index]) {
          return;
        }
        const action = control.dataset.drawerAction;
        if (action === 'play') {
          loadTrack(index, { autoplay: true });
          const shouldClose =
            typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
          if (shouldClose) {
            closeLibraryDrawer({ restoreFocus: false });
          }
        } else if (action === 'favorite') {
          event.preventDefault();
          toggleFavorite(index);
        }
      });
    }
    document.addEventListener('keydown', handleDocumentKeydown);
  }

  function handleAudioEvents() {
    audio.addEventListener('play', () => {
      state.isPlaying = true;
      elements.playButtons.forEach((button) => {
        button.textContent = 'âŹ¸';
        button.setAttribute('aria-label', 'Wstrzymaj odtwarzanie');
      });
    });
    audio.addEventListener('pause', () => {
      state.isPlaying = false;
      elements.playButtons.forEach((button) => {
        button.textContent = 'â–¶';
        button.setAttribute('aria-label', 'WznĂłw odtwarzanie');
      });
    });
    audio.addEventListener('timeupdate', syncProgressDisplays);
    audio.addEventListener('loadedmetadata', syncProgressDisplays);
    audio.addEventListener('ended', () => {
      if (state.loop === 'one') {
        audio.currentTime = 0;
        play();
        return;
      }
      nextTrack();
    });
  }

  function initialise() {
    loadFavorites();
    updateHero();
    updateShuffleIndicator();
    updateLoopIndicator();
    buildQueue('');
    buildLibrary('');
    buildLibraryDrawer('');
    attachEventListeners();
    handleAudioEvents();
    if (elements.volumeControls.length) {
      setVolume(state.previousVolume * 100);
    }
    loadTrack(state.currentIndex, { autoplay: false });
    syncProgressDisplays();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();

