(function (global) {
  const moviesData = {
            TopGun: [{
                title: "Top Gun",
                image: "https://filman.cc/public/static/poster/big/30091.jpg",
                year: "1986",
                genre: "Akcja Romans Sensacyjny",
                link: "https://upstream.to/embed-1ferv58rjpm7.html"
            }, {
                title: "Top Gun: Maverick",
                image: "https://filman.cc/public/static/poster/big/56188.jpg",
                year: "2022",
                genre: "Akcja",
                link: "https://sbchill.com/embed-2zh26ul71s0o.html"
            }],
            _28Dni_Tygodni_Pozniej: [{
                title: "28 dni później / 28 Days Later...",
                image: "https://filman.cc/public/static/poster/big/8161.jpg",
                year: "2002",
                genre: "Horror",
                link: "https://ebd.cda.pl/740x475/931632386"
            }, {
                title: "28 tygodni później / 28 Weeks Later",
                image: "https://filman.cc/public/static/poster/big/22714.jpg",
                year: "2007",
                genre: "Horror",
                link: "https://ebd.cda.pl/740x475/6559220f9"
            }],
            _2012: [{
                title: "2012",
                image: "https://fwcdn.pl/fpo/39/13/433913/7695238.3.jpg",
                year: "2009",
                genre: "Sci-fi Katastroficzny",
                link: "https://tummulerviolableness.com/e/ecwl2wid2zfr"
            }],
            BękartyWojny: [{
                title: "Bękarty wojny",
                image: "https://fwcdn.pl/fpo/77/47/137747/7276639.3.jpg",
                year: "2009",
                genre: "Wojenny",
                link: "https://tummulerviolableness.com/e/lr0om7waukcm"
            }],
            CzłowiekZBlizną: [{
                title: "Człowiek z blizną",
                image: "https://fwcdn.pl/fpo/48/33/4833/6935904.3.jpg",
                year: "1983",
                genre: "Dramat Gangsterski",
                link: "https://tummulerviolableness.com/e/ugyy55exwf4b"
            }],
            Doomsday: [{
                title: "Doomsday",
                image: "https://m.media-amazon.com/images/I/81cT24c+EEL._RI_.jpg",
                year: "2008",
                genre: "Akcja Sci-Fi",
                link: "https://vidoza.net/embed-fydvb1zb14ms.html"
            }],
            GodzinySzczytu: [{
                title: "Godziny Szczytu",
                image: "https://fwcdn.pl/fpo/00/59/59/6922212.3.jpg",
                year: "1998",
                genre: "Akcja Komedia Kryminalna",
                link: "https://ebd.cda.pl/740x475/8369916c5"
            }, {
                title: "Godziny Szczytu 2",
                image: "https://fwcdn.pl/fpo/06/25/30625/7518081.3.jpg",
                year: "2001",
                genre: "Akcja Komedia Kryminalna",
                link: "https://tummulerviolableness.com/e/ir10bt6mc0od"
            }, {
                title: "Godziny Szczytu 3",
                image: "https://fwcdn.pl/fpo/17/52/101752/7183742.3.jpg",
                year: "1992",
                genre: "Akcja Komedia Kryminalna",
                link: "https://tummulerviolableness.com/e/fhky0ff7eg8p"
            }],
            XXX_Trylogia: [{
                title: "xXx",
                image: "https://filman.cc/public/static/poster/big/788.jpg",
                year: "2002",
                genre: "Akcja",
                link: "https://ebd.cda.pl/740x475/9799776b8"
            }, {
                title: "xXx 2: Następny poziom",
                image: "https://filman.cc/public/static/poster/big/1066.jpg",
                year: "2005",
                genre: "Akcja",
                link: "https://streamtape.com/e/RW9dqQ4qJKcdvQd/xXx_2-_Następny_poziom___xXx-_State_of_the_Union_(2005).mp4"
            }, {
                title: "xXx 3: Następny poziom",
                image: "https://filman.cc/public/static/poster/big/794.jpg",
                year: "2017",
                genre: "Akcja",
                link: "https://upstream.to/embed-kg582gkc8owt.html"
            }],
            ZielonaMila: [{
                title: "Zielona Mila",
                image: "https://fwcdn.pl/fpo/08/62/862/7517878.3.jpg",
                year: "1999",
                genre: "Dramat",
                link: "https://www.cda.pl/video/1558172203"
            }],
            SzeregowiecRyan: [{
                title: "Szeregowiec Ryan",
                image: "https://filman.cc/public/static/poster/big/5160.jpg",
                year: "1998",
                genre: "Wojenny",
                link: "https://upstream.to/embed-08tf47alon8c.html"
            }],
            ZabójczaBroń: [{
                title: "Zabójcza broń",
                image: "https://fwcdn.pl/fpo/13/08/1308/7059259.3.jpg",
                year: "1987",
                genre: "Komedia Kryminalna",
                link: "https://streamtape.com/e/WpGxDePWddfblP0"
            }, {
                title: "Zabójcza broń 2",
                image: "https://fwcdn.pl/fpo/13/09/1309/7059260.3.jpg",
                year: "1989",
                genre: "Komedia Kryminalna",
                link: "https://streamtape.com/e/ZD3dz3ev7oHq8oD"
            }, {
                title: "Zabójcza broń 3",
                image: "https://fwcdn.pl/fpo/13/10/1310/7749098.3.jpg",
                year: "1992",
                genre: "Komedia Kryminalna",
                link: "https://vidoza.net/embed-hnfue51vuyzt.html"
            }, {
                title: "Zabójcza broń 4",
                image: "https://fwcdn.pl/fpo/02/03/203/7059263.3.jpg",
                year: "1998",
                genre: "Komedia Kryminalna",
                link: "https://streamtape.com/e/6XAQwMAkxks9BVq"
            }],
            Uncharted: [{
                title: "Uncharted",
                image: "https://filman.cc/public/static/poster/big/55523.jpg",
                year: "2022",
                genre: "Akcja, Przygodowy",
                link: "https://vidoza.net/embed-myof11ouvc55.html"
            }],
            TowerHeistZemstaCieciów: [{
                title: "Tower Heist Zemsta cieciów",
                image: "https://fwcdn.pl/fpo/82/07/288207/7401836.3.jpg",
                year: "2011",
                genre: "Akcja,Komedia kryminalna",
                link: "https://tummulerviolableness.com/e/lr0om7waukcm"
            }],
            Taxi: [{
                    title: "Taxi",
                    image: "https://fwcdn.pl/fpo/07/27/727/6900934.3.jpg",
                    year: "1998",
                    genre: "Komedia Kryminalna",
                    link: "https://tummulerviolableness.com/e/33donik8qfqf"
                }, {
                    title: "Taxi 2",
                    image: "https://fwcdn.pl/fpo/00/69/10069/7519121.3.jpg",
                    year: "2001",
                    genre: "Komedia Kryminalna",
                    link: "https://streamtape.com/e/8Dy1aKKYKZfjAd"
                }, {
                    title: "Taxi 3",
                    image: "https://fwcdn.pl/fpo/41/98/34198/7518096.3.jpg",
                    year: "2003",
                    genre: "Komedia Kryminalna",
                    link: "https://tummulerviolableness.com/e/z7ij8x1bq8yn"
                }, {
                    title: "Taxi 4",
                    image: "https://fwcdn.pl/fpo/87/99/338799/7530407.3.jpg",
                    year: "2007",
                    genre: "Komedia Kryminalna",
                    link: "https://streamtape.com/e/yAJ762p60Wf1pw3"
                }, {
                    title: "Taxi 5",
                    image: "https://filman.cc/public/static/poster/big/1696.jpg",
                    year: "2018",
                    genre: "Komedia Kryminalna",
                    link: "https://vtube.network/embed-53yz5btc7j0i.html"
                },

            ],
            SzybcyIWściekli: [{
                title: "Szybcy i Wściekli",
                image: "https://filman.cc/public/static/poster/big/29.jpg",
                year: "2001",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-pn6efruftbn6.html"
            }, {
                title: "Za Szybcy i Wściekli",
                image: "https://filman.cc/public/static/poster/big/37.jpg",
                year: "2003",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-skrvj87xbjee.html"
            }, {
                title: "Szybko i wściekle",
                image: "https://filman.cc/public/static/poster/big/27.jpg",
                year: "2009",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-17fqcy3gvhp2.html"
            }, {
                title: "Szybcy i Wściekli V",
                image: "https://filman.cc/public/static/poster/big/20.jpg",
                year: "2011",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-o9pxhhpk8mpu.html"
            }, {
                title: "Szybcy i Wściekli 6",
                image: "https://filman.cc/public/static/poster/big/23.jpg",
                year: "2013",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-f2lo9v9jmbpk.html"
            }, {
                title: "Szybcy i Wściekli: Tokyo Drift",
                image: "https://filman.cc/public/static/poster/big/26.jpg",
                year: "2006",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-9ac14h5wad3p.html"
            }, {
                title: "Szybcy i Wściekli 7",
                image: "https://filman.cc/public/static/poster/big/44.jpg",
                year: "2015",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-79p0o882uky4.html"
            }, {
                title: "Szybcy i Wściekli 8",
                image: "https://filman.cc/public/static/poster/big/43.jpg",
                year: "2017",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://ebd.cda.pl/740x475/65669009e?wersja=720p&t=1"
            }, {
                title: "Szybcy i wściekli: Hobbs i Shaw",
                image: "https://filman.cc/public/static/poster/big/10468.jpg",
                year: "2019",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://streamtape.com/e/o2zRJPg2JaHJewK/Szybcy_i_w%C5%9Bciekli-_Hobbs_i_Shaw___Fast_%26amp%3B_Furious_presents-_Hobbs_%26amp%3B_Shaw_%282019%29_.mp4"
            }, {
                title: "Szybcy i Wściekli 9",
                image: "https://filman.cc/public/static/poster/big/53139.jpg",
                year: "2021",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-5we9to52tv0v.html"
            }],
            OjciecChrzestny: [{
                title: "Ojciec chrzestny",
                image: "https://fwcdn.pl/fpo/10/89/1089/7196615.3.jpg",
                year: "1972",
                genre: "Dramat Gangsterski",
                link: "https://streamtape.com/e/jpqgQaX7KJhz0J2"
            }, {
                title: "Ojciec chrzestny 2",
                image: "https://fwcdn.pl/fpo/10/90/1090/7196616.3.jpg",
                year: "1974",
                genre: "Dramat Gangsterski",
                link: "https://streamtape.com/e/MoDjW77KxXUm7GZ"
            }, {
                title: "Ojciec chrzestny 3",
                image: "https://fwcdn.pl/fpo/10/91/1091/7196617.3.jpg",
                year: "1990",
                genre: "Dramat Gangsterski",
                link: "https://ebd.cda.pl/740x475/66544132c"
            }],
            Reacher: [{
                title: "[s01e01] Welcome to Margrave",
                image: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
                year: "2022",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-rr9n87ugxe7x.html"
            }, {
                title: "[s01e02] First Dance",
                image: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
                year: "2022",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-t7aj5xnw5g4x.html"
            }, {
                title: "[s01e03] Spoonful",
                image: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
                year: "2022",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-l4wvfh63c6qw.html"
            }, {
                title: "[s01e04] In a Tree",
                image: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
                year: "2022",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-ysxq61uq8jfh.html"
            }, {
                title: "[s01e05] No Apologies",
                image: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
                year: "2022",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://vidoza.net/embed-9orpjj6tqukv.html"
            }, {
                title: "[s01e06] Papier",
                image: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
                year: "2022",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-fl87z9rfcr9a.html"
            }, {
                title: "[s01e07] Reacher Said Nothing",
                image: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
                year: "2022",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-wrtlvxj3tcl0.html"
            }, {
                title: "[s01e08] Pie",
                image: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
                year: "2022",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-td0e9u1v5oex.html"
            }],
            Niezniszczalni: [{
                title: "Niezniszczalni / The Expendables",
                image: "https://filman.cc/public/static/poster/big/31.jpg",
                year: "2010",
                genre: "Akcja",
                link: "https://vidoza.net/embed-hkbmwoze5cnd.html"
            }, {
                title: "Niezniszczalni 2 / The Expendables 2",
                image: "https://filman.cc/public/static/poster/big/5619.jpg",
                year: "2012",
                genre: "Akcja",
                link: "https://upstream.to/embed-dedncyvcuvf6.html"
            }, {
                title: "Niezniszczalni 3 / The Expendables 3",
                image: "https://filman.cc/public/static/poster/big/549.jpg",
                year: "2014",
                genre: "Akcja",
                link: "https://upstream.to/embed-l4159pqbpk1l.html"
            }],
            NaZachodzieBezZmian: [{
                title: "Na Zachodzie bez zmian / Im Westen nichts Neues",
                image: "https://filman.cc/public/static/poster/big/57331.jpg",
                year: "2022",
                genre: "Dramat Wojenny",
                link: "https://streamhide.to/e/4ey821lmcm8p"
            }],
            JohnWick: [{
                title: "John Wick 1 Charapter One",
                image: "https://filman.cc/public/static/poster/big/497.jpg",
                year: "2014",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-8wzr9g6sej4j.html"
            }, {
                title: "John Wick 2 / John Wick: Chapter Two",
                image: "https://filman.cc/public/static/poster/big/57.jpg",
                year: "2017",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://upstream.to/embed-mwl0jkkmew4l.html"
            }, {
                title: "John Wick 3 / John Wick: Chapter 3 - Parabellum",
                image: "https://filman.cc/public/static/poster/big/8617.jpg",
                year: "2019",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://dood.yt/e/cw91xhr2q65d"
            }, {
                title: "John Wick 4 (ENG Napisy-PL)",
                image: "https://filman.cc/public/static/poster/big/58714.jpg",
                year: "2023",
                genre: "Akcja, Kryminał, Thriller",
                link: "https://voe.sx/e/sgy24h8p6xlo"
            }],
            JasFasola: [{
                title: "Jaś Fasola: Nadciąga totalny kataklizm / Bean",
                image: "https://assets.upflix.pl/media/plakat/1997/bean__300_427.jpg",
                year: "1997",
                genre: "Komedia",
                link: "https://ebd.cda.pl/740x475/1419273be"
            }, {
                title: "Wakacje Jasia Fasoli / Mr. Bean's Holiday",
                image: "https://filman.cc/public/static/poster/big/4927.jpg",
                year: "2007",
                genre: "Familijny, Komedia",
                link: "https://dood.yt/e/iczo8t416hl9"
            }],
            HotShots: [{
                title: "Hot Shots!",
                image: "https://filman.cc/public/static/poster/big/7780.jpg",
                year: "1991",
                genre: "Akcja, Komedia",
                link: "https://ebd.cda.pl/740x475/15359849b"
            }, {
                title: "Hot Shots 2",
                image: "https://filman.cc/public/static/poster/big/7781.jpg",
                year: "2022",
                genre: "Akcja",
                link: "https://sbchill.com/embed-2zh26ul71s0o.html"
            }],
            DruzynaA: [{
                title: "Drużyna A",
                image: "https://fwcdn.pl/fpo/02/90/190290/7331069.3.jpg",
                year: "2010",
                genre: "Komedia, Akcja",
                link: "https://upstream.to/embed-nsjjikyw58nx.html"
            }],


        };

  const seriesMeta = {
    TopGun: {
      order: 1,
      title: "Top Gun",
      description: "Legendarny duet pilotów łączący nostalgię z nowoczesną dawką adrenaliny.",
      mood: "Lotnicza akcja",
      highlight: "Rozpocznij od Top Gun: Maverick i poczuj klimat kokpitu.",
      tags: ["akcja", "lotnictwo", "klasyk"],
    },
    SzybcyIWściekli: {
      order: 2,
      title: "Szybcy i Wściekli",
      description: "Rodzina, pościgi i nitro – ta seria podkręci każdy wieczór.",
      mood: "Szybkie tempo",
      highlight: "Zacznij od pierwszej części i szykuj przekąski na całą noc.",
      tags: ["akcja", "samochody", "rodzina"],
    },
    JohnWick: {
      order: 3,
      title: "John Wick",
      description: "Elegancka, brutalna historia zemsty z mistrzowską choreografią walk.",
      mood: "Neo-noir",
      highlight: "Przygotuj się na balet walki – John Wick nie bierze jeńców.",
      tags: ["akcja", "neo-noir", "thriller"],
    },
    Taxi: {
      order: 4,
      title: "Taxi",
      description: "Francuska jazda bez trzymanki. Komediowy klasyk o szalonym taksówkarzu.",
      mood: "Komediowy sprint",
      highlight: "Każdy kurs to nowa dawka śmiechu i pościgów.",
      tags: ["komedia", "akcja", "retro"],
    },
    GodzinySzczytu: {
      order: 5,
      title: "Godziny szczytu",
      description: "Buddy cop z humorem i akrobatyką Jackie Chana.",
      mood: "Buddy cop",
      highlight: "Lee i Carter gwarantują niekończące się one-linery.",
      tags: ["komedia", "buddy cop", "akcja"],
    },
    ZabójczaBroń: {
      order: 6,
      title: "Zabójcza broń",
      description: "Ikoniczny duet policjantów walczący z przestępczością Los Angeles.",
      mood: "Klasyczne kino akcji",
      highlight: "Riggs i Murtaugh udowadniają, że akcja nie zna wieku.",
      tags: ["klasyk", "buddy cop", "akcja"],
    },
    JasFasola: {
      order: 7,
      title: "Jaś Fasola",
      description: "Slapstickowy humor idealny na rodzinny seans.",
      mood: "Rodzinny seans",
      highlight: "Mr. Bean zapewni salwy śmiechu niezależnie od wieku.",
      tags: ["komedia", "rodzina", "nostalgia"],
    },
    ZielonaMila: {
      order: 8,
      title: "Zielona Mila",
      description: "Poruszająca opowieść z nutą magii i refleksji.",
      mood: "Wzruszający dramat",
      highlight: "Zarezerwuj czas na spokojny, emocjonalny seans.",
      tags: ["dramat", "klasyk", "emocje"],
    },
    OjciecChrzestny: {
      order: 9,
      title: "Ojciec chrzestny",
      description: "Gangsterska saga rodziny Corleone w najlepszym wydaniu.",
      mood: "Kultowy klasyk",
      highlight: "Witaj w rodzinie – to kino obowiązkowe.",
      tags: ["dramat", "gangsterski", "klasyk"],
    },
    BękartyWojny: {
      order: 10,
      title: "Bękarty wojny",
      description: "Tarantino w alternatywnej historii II wojny światowej.",
      mood: "Tarantiński styl",
      highlight: "Błyskotliwe dialogi i zaskakujące zwroty gwarantowane.",
      tags: ["wojenny", "tarantino", "czarny humor"],
    },
    Reacher: {
      order: 11,
      title: "Reacher",
      description: "Serialowe śledztwa oparte na prozie Lee Childa.",
      mood: "Śledczy klimat",
      highlight: "Każdy odcinek to nowe miasto i nowa zagadka.",
      tags: ["serial", "kryminał", "akcja"],
    },
    TowerHeistZemstaCieciów: {
      order: 12,
      title: "Tower Heist",
      description: "Komediowy napad na penthouse pewnego finansisty.",
      mood: "Kryminalny humor",
      highlight: "Plan doskonały wymaga perfekcyjnej ekipy – masz ją tutaj.",
      tags: ["komedia", "akcja", "napad"],
    },
    HotShots: {
      order: 13,
      title: "Hot Shots",
      description: "Parodia kina akcji puszczająca oko do Top Gun i Rambo.",
      mood: "Totalny odlot",
      highlight: "Charlie Sheen w kokpicie to przepis na dobrą zabawę.",
      tags: ["parodia", "komedia", "akcja"],
    },
    _28Dni_Tygodni_Pozniej: {
      order: 14,
      title: "28 dni / tygodni później",
      description: "Brytyjska saga o epidemii, która pokazuje chaos i walkę o przetrwanie.",
      mood: "Postapokaliptyczne napięcie",
      highlight: "Rozpocznij od pierwszej części i zobacz, jak świat pogrąża się w chaosie.",
      tags: ["horror", "postapo", "brytyjski"],
    },
    _2012: {
      order: 15,
      title: "2012",
      description: "Katastroficzne widowisko, które stawia ludzkość przed końcem świata.",
      mood: "Katastroficzny rozmach",
      highlight: "Efekty specjalne na wielkim ekranie robią wrażenie.",
      tags: ["katastroficzny", "sci-fi", "efekty"],
    },
    Doomsday: {
      order: 16,
      title: "Doomsday",
      description: "Mroczne połączenie science fiction, akcji i survivalu w odizolowanej strefie.",
      mood: "Postapokaliptyczna akcja",
      highlight: "Łączy klimat Mad Maxa z średniowiecznymi intrygami.",
      tags: ["postapo", "akcja", "survival"],
    },
    Uncharted: {
      order: 17,
      title: "Uncharted",
      description: "Filmowa adaptacja przygodowej serii gier pełna skoków po dachach i zagadek.",
      mood: "Przygodowa akcja",
      highlight: "Skacz po dachach razem z Nathanem Drakiem.",
      tags: ["przygodowy", "akcja", "gra"],
    },
    Niezniszczalni: {
      order: 18,
      title: "Niezniszczalni",
      description: "Gwiazdy kina akcji łączą siły, by dostarczyć nieprzerwany festiwal wybuchów.",
      mood: "Adrenalina 80/90",
      highlight: "Zbierz legendarną ekipę i przygotuj się na grad pocisków.",
      tags: ["akcja", "ekipa", "nostalgia"],
    },
    NaZachodzieBezZmian: {
      order: 19,
      title: "Na Zachodzie bez zmian",
      description: "Wojenne widowisko pokazujące brutalny realizm frontu I wojny światowej.",
      mood: "Wojenny dramat",
      highlight: "Przeżyj front oczami młodych rekrutów i zobacz, jak wojna ich zmienia.",
      tags: ["dramat", "wojenny", "historyczny"],
    },
    SzeregowiecRyan: {
      order: 20,
      title: "Szeregowiec Ryan",
      description: "Spielbergowska opowieść o braterstwie i poświęceniu podczas II wojny światowej.",
      mood: "Historyczna epika",
      highlight: "Przeżyj lądowanie w Normandii w jednej z najmocniejszych scen wojennych.",
      tags: ["wojenny", "dramat", "spielberg"],
    },
    XXX_Trylogia: {
      order: 21,
      title: "xXx – Trylogia",
      description: "Ekstremalny agent Xander Cage przenosi sporty ekstremalne na poziom misji specjalnych.",
      mood: "Agent z adrenaliną",
      highlight: "Zobacz, jak Xander Cage zamienia każdy trick w tajną operację.",
      tags: ["akcja", "agent", "thriller"],
    },
    CzłowiekZBlizną: {
      order: 22,
      title: "Człowiek z blizną",
      description: "Kultowa historia Tony'ego Montany, który podbija Miami w rytmie kokainowego imperium.",
      mood: "Gangsterska saga",
      highlight: "Powiedz światu „przywitaj się z moim małym przyjacielem” i zanurz się w klasyce.",
      tags: ["gangsterski", "klasyk", "dramat"],
    },
    DruzynaA: {
      order: 23,
      title: "Drużyna A",
      description: "Oddział najemników niesłusznie oskarżony o zbrodnię wraca, by oczyścić swoje nazwiska.",
      mood: "Lekka komedia akcji",
      highlight: "Zobacz, jak Hannibal i spółka realizują plan z uśmiechem na twarzy.",
      tags: ["akcja", "ekipa", "komedia"],
    },
  };

  const formatSeriesName = (id) => {
    return id
      .replace(/_/g, " ")
      .replace(/(\d+)([A-Z])/g, "$1 $2")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .replace(/(\d+)/g, " $1")
      .replace(/DniTygodni/g, "Dni / Tygodni")
      .replace(/\b(\w)/g, (match) => match.toUpperCase())
      .trim();
  };

  const collectionsMeta = Object.fromEntries(
    Object.entries(seriesMeta).map(([id, meta]) => {
      const collectionData = moviesData[id] ?? [];
      const cover = meta.cover ?? collectionData[0]?.image ?? "";
      const title = meta.title ?? formatSeriesName(id);
      return [id, { ...meta, cover, title }];
    })
  );

  const resolveSeriesName = (id) => collectionsMeta[id]?.title ?? formatSeriesName(id);

  global.movieCollectionsData = moviesData;
  global.movieCollectionsMeta = collectionsMeta;
  global.formatMovieSeriesName = resolveSeriesName;
})(typeof window !== "undefined" ? window : globalThis);
